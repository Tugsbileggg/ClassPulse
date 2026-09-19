const MAX_BODY_BYTES = 64_000;

export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export function errorJson(message: string, status: number, errors?: Record<string, string>) {
  return json({ ok: false, message, ...(errors ? { errors } : {}) }, status);
}

/**
 * Өөр сайтаас илгээсэн хүсэлтийг (CSRF) татгалзана. Хөтөч `Origin` header-ийг
 * заавал илгээдэг тул тэр нь энэ сайтын host-той таарах ёстой.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** JSON body-г уншина. Хэмжээ хэтэрсэн эсвэл формат буруу бол `null`. */
export async function readJsonObject(request: Request): Promise<Record<string, unknown> | null> {
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return null;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return null;
    const value: unknown = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
