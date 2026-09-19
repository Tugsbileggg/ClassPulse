import { cache } from "react";
import { cookies } from "next/headers";
import { getDB } from "@/lib/db";

export const SESSION_COOKIE = "cp_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 хоног
// Cloudflare Workers дээр PBKDF2-ийн давталтын дээд хязгаар 100 000.
const PBKDF2_ITERATIONS = 100_000;

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  school: string | null;
};

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function sha256Hex(value: string): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256);
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2-sha256$${PBKDF2_ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, iterations, salt, hash] = stored.split("$");
  if (scheme !== "pbkdf2-sha256" || !salt || !hash) return false;

  const expected = fromBase64Url(hash);
  const actual = await pbkdf2(password, fromBase64Url(salt), Number(iterations));
  if (actual.length !== expected.length) return false;

  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
  return diff === 0;
}

// Бүртгэлгүй и-мэйлээр нэвтрэх үед ч хугацааг ижил байлгах (хэрэглэгч байгаа эсэхийг
// хариуны хугацаагаар таах боломжгүй болгох) зорилготой хуурмаг hash.
const DUMMY_HASH = "pbkdf2-sha256$100000$c2FsdHNhbHRzYWx0c2FsdA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

export async function burnPasswordCheck(password: string) {
  await verifyPassword(password, DUMMY_HASH);
}

export async function createSession(userId: number) {
  const db = await getDB();
  const token = toBase64Url(crypto.getRandomValues(new Uint8Array(32)));
  const expiresAt = Date.now() + SESSION_TTL_MS;

  await db.batch([
    db.prepare("DELETE FROM sessions WHERE user_id = ?1 AND expires_at < ?2").bind(userId, Date.now()),
    db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?1, ?2, ?3)").bind(
      await sha256Hex(token),
      userId,
      expiresAt,
    ),
  ]);

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getDB();
    await db.prepare("DELETE FROM sessions WHERE id = ?1").bind(await sha256Hex(token)).run();
  }
  jar.delete(SESSION_COOKIE);
}

/** Одоогийн хүсэлтийн нэвтэрсэн хэрэглэгч. Нэг хүсэлт дотор нэг л удаа DB-ээс уншина. */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = await getDB();
  const user = await db
    .prepare(
      `SELECT u.id, u.name, u.email, u.school
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.id = ?1 AND s.expires_at > ?2`,
    )
    .bind(await sha256Hex(token), Date.now())
    .first<SessionUser>();

  return user ?? null;
});
