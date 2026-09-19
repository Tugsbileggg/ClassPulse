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

type Context = { params: Promise<{ id: string }> };

async function authorize(request: Request, context: Context) {
  if (!isSameOrigin(request)) return { error: errorJson("Хүсэлтийг зөвшөөрөөгүй.", 403) };

  const user = await getCurrentUser();
  if (!user) return { error: errorJson("Дахин нэвтэрнэ үү.", 401) };

  const id = Number((await context.params).id);
  if (!Number.isInteger(id) || id <= 0) return { error: errorJson("Анги олдсонгүй.", 404) };

  return { user, id };
}

export async function PUT(request: Request, context: Context) {
  const auth = await authorize(request, context);
  if ("error" in auth) return auth.error;

  const body = await readJsonObject(request);
  if (!body) return errorJson("Хүсэлтийн формат буруу байна.", 400);

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const nameError = classroomNameError(name);
  if (nameError) return errorJson(nameError, 422, { name: nameError });

  const seats = sanitizeSeats(body.seats);
  if (!seats) return errorJson("Суудлын мэдээлэл буруу байна.", 422);

  const db = await getDB();
  const row = await db
    .prepare(
      `UPDATE classrooms
       SET name = ?1, aspect_ratio = COALESCE(?2, aspect_ratio), seats = ?3,
           updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
       WHERE id = ?4 AND user_id = ?5
       RETURNING ${CLASSROOM_COLUMNS}`,
    )
    .bind(name, sanitizeAspectRatio(body.aspectRatio), JSON.stringify(seats), auth.id, auth.user.id)
    .first<ClassroomRow>();

  if (!row) return errorJson("Анги олдсонгүй.", 404);
  return json({ ok: true, classroom: rowToClassroom(row) });
}

export async function DELETE(request: Request, context: Context) {
  const auth = await authorize(request, context);
  if ("error" in auth) return auth.error;

  const db = await getDB();
  const result = await db
    .prepare("DELETE FROM classrooms WHERE id = ?1 AND user_id = ?2")
    .bind(auth.id, auth.user.id)
    .run();

  if (result.meta.changes === 0) return errorJson("Анги олдсонгүй.", 404);
  return json({ ok: true });
}
