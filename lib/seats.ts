/**
 * Суудлын зураглал. Координатууд нь камерын дүрсийн өргөн, өндөрт харьцуулсан 0–1 утга
 * тул камерын нягтрал, дэлгэцийн хэмжээ өөрчлөгдсөн ч зураглал хэвээр таарна.
 */

export type Seat = {
  id: string;
  label: string;
  student: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Classroom = {
  id: number;
  name: string;
  aspectRatio: number | null;
  seats: Seat[];
  updatedAt: string;
};

export const SEAT_LIMITS = {
  maxSeats: 80,
  label: 40,
  student: 80,
  classroomName: 60,
  /** Хамгийн жижиг суудлын хэмжээ (дүрсийн 2%). */
  minSize: 0.02,
} as const;

const round = (value: number) => Math.round(value * 10_000) / 10_000;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function classroomNameError(name: string): string | undefined {
  if (!name) return "Ангийн нэрийг оруулна уу.";
  if (name.length > SEAT_LIMITS.classroomName)
    return `Ангийн нэр ${SEAT_LIMITS.classroomName} тэмдэгтээс ихгүй байх ёстой.`;
}

/** Серверт ирсэн суудлын өгөгдлийг шалгаж цэвэрлэнэ. Буруу бол `null`. */
export function sanitizeSeats(value: unknown): Seat[] | null {
  if (!Array.isArray(value) || value.length > SEAT_LIMITS.maxSeats) return null;

  const seats: Seat[] = [];
  const ids = new Set<string>();

  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const { id, label, student, x, y, w, h } = item as Record<string, unknown>;

    if (typeof id !== "string" || !/^[\w-]{1,40}$/.test(id) || ids.has(id)) return null;
    if (typeof label !== "string" || typeof student !== "string") return null;
    if (![x, y, w, h].every((n) => typeof n === "number" && Number.isFinite(n))) return null;

    const box = { x: clamp01(x as number), y: clamp01(y as number), w: w as number, h: h as number };
    if (box.w < SEAT_LIMITS.minSize || box.h < SEAT_LIMITS.minSize) return null;
    if (box.x + box.w > 1.001 || box.y + box.h > 1.001) return null;

    ids.add(id);
    seats.push({
      id,
      label: label.trim().slice(0, SEAT_LIMITS.label),
      student: student.trim().slice(0, SEAT_LIMITS.student),
      x: round(box.x),
      y: round(box.y),
      w: round(Math.min(box.w, 1 - box.x)),
      h: round(Math.min(box.h, 1 - box.y)),
    });
  }

  return seats;
}

export function sanitizeAspectRatio(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value >= 0.3 && value <= 4 ? round(value) : null;
}

type ClassroomRow = {
  id: number;
  name: string;
  aspect_ratio: number | null;
  seats: string;
  updated_at: string;
};

export function rowToClassroom(row: ClassroomRow): Classroom {
  let seats: Seat[] = [];
  try {
    seats = sanitizeSeats(JSON.parse(row.seats)) ?? [];
  } catch {
    seats = [];
  }
  return { id: row.id, name: row.name, aspectRatio: row.aspect_ratio, seats, updatedAt: row.updated_at };
}

export const CLASSROOM_COLUMNS = "id, name, aspect_ratio, seats, updated_at";
export type { ClassroomRow };
