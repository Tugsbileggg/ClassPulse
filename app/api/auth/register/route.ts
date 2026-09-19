import { createSession, hashPassword } from "@/lib/auth";
import { errorJson, isSameOrigin, json, readJsonObject } from "@/lib/api";
import { getDB } from "@/lib/db";
import { normalizeRegister, validateRegister } from "@/lib/validation";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return errorJson("Хүсэлтийг зөвшөөрөөгүй.", 403);

  const body = await readJsonObject(request);
  if (!body) return errorJson("Хүсэлтийн формат буруу байна.", 400);

  const input = normalizeRegister(body);
  const errors = validateRegister(input);
  if (Object.keys(errors).length > 0) return errorJson("Мэдээллээ шалгана уу.", 422, errors);

  try {
    const db = await getDB();
    const passwordHash = await hashPassword(input.password);
    const user = await db
      .prepare(
        `INSERT INTO users (name, email, school, password_hash) VALUES (?1, ?2, ?3, ?4)
         ON CONFLICT(email) DO NOTHING
         RETURNING id`,
      )
      .bind(input.name, input.email, input.school || null, passwordHash)
      .first<{ id: number }>();

    if (!user) {
      return errorJson("Энэ и-мэйлээр бүртгэл үүссэн байна.", 409, {
        email: "Энэ и-мэйл хаягаар бүртгэл үүссэн байна. Нэвтэрнэ үү.",
      });
    }

    await createSession(user.id);
  } catch (error) {
    console.error("register failed", error);
    return errorJson("Түр зуурын алдаа гарлаа. Хэсэг хугацааны дараа дахин оролдоно уу.", 500);
  }

  return json({ ok: true }, 201);
}
