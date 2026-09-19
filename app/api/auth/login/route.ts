import { burnPasswordCheck, createSession, verifyPassword } from "@/lib/auth";
import { errorJson, isSameOrigin, json, readJsonObject } from "@/lib/api";
import { getDB } from "@/lib/db";
import { normalizeLogin, validateLogin } from "@/lib/validation";

const INVALID = "И-мэйл эсвэл нууц үг буруу байна.";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return errorJson("Хүсэлтийг зөвшөөрөөгүй.", 403);

  const body = await readJsonObject(request);
  if (!body) return errorJson("Хүсэлтийн формат буруу байна.", 400);

  const input = normalizeLogin(body);
  const errors = validateLogin(input);
  if (Object.keys(errors).length > 0) return errorJson("Мэдээллээ шалгана уу.", 422, errors);

  try {
    const db = await getDB();
    const user = await db
      .prepare("SELECT id, password_hash FROM users WHERE email = ?1")
      .bind(input.email)
      .first<{ id: number; password_hash: string }>();

    if (!user) {
      await burnPasswordCheck(input.password);
      return errorJson(INVALID, 401);
    }
    if (!(await verifyPassword(input.password, user.password_hash))) {
      return errorJson(INVALID, 401);
    }

    await createSession(user.id);
  } catch (error) {
    console.error("login failed", error);
    return errorJson("Түр зуурын алдаа гарлаа. Хэсэг хугацааны дараа дахин оролдоно уу.", 500);
  }

  return json({ ok: true });
}
