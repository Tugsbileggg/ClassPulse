import { getCurrentUser } from "@/lib/auth";
import { errorJson, isSameOrigin, json, readJsonObject } from "@/lib/api";
import { getDB } from "@/lib/db";
import {
  CLASSROOM_COLUMNS,
  classroomNameError,
  rowToClassroom,
  sanitizeAspectRatio,
  sanitizeSeats,
  type ClassroomRow,
} from "@/lib/seats";

const MAX_CLASSROOMS = 20;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return errorJson("Хүсэлтийг зөвшөөрөөгүй.", 403);

  const user = await getCurrentUser();
  if (!user) return errorJson("Дахин нэвтэрнэ үү.", 401);

  const body = await readJsonObject(request);
  if (!body) return errorJson("Хүсэлтийн формат буруу байна.", 400);

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const nameError = classroomNameError(name);
  if (nameError) return errorJson(nameError, 422, { name: nameError });

  const seats = sanitizeSeats(body.seats ?? []);
  if (!seats) return errorJson("Суудлын мэдээлэл буруу байна.", 422);

  const db = await getDB();
  const { count } = (await db
    .prepare("SELECT COUNT(*) AS count FROM classrooms WHERE user_id = ?1")
    .bind(user.id)
    .first<{ count: number }>()) ?? { count: 0 };
  if (count >= MAX_CLASSROOMS) return errorJson(`Нэг хэрэглэгч ${MAX_CLASSROOMS}-оос олон анги үүсгэх боломжгүй.`, 422);

  const row = await db
    .prepare(
      `INSERT INTO classrooms (user_id, name, aspect_ratio, seats) VALUES (?1, ?2, ?3, ?4)
       RETURNING ${CLASSROOM_COLUMNS}`,
    )
    .bind(user.id, name, sanitizeAspectRatio(body.aspectRatio), JSON.stringify(seats))
    .first<ClassroomRow>();

  if (!row) return errorJson("Анги үүсгэж чадсангүй.", 500);
  return json({ ok: true, classroom: rowToClassroom(row) }, 201);
}
