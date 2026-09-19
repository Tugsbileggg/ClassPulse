import { destroySession } from "@/lib/auth";
import { errorJson, isSameOrigin, json } from "@/lib/api";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return errorJson("Хүсэлтийг зөвшөөрөөгүй.", 403);

  await destroySession();
  return json({ ok: true });
}
