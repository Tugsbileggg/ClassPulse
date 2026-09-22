import type { ReactNode } from "react";
import { Bell, Cpu, Moon, Smartphone } from "lucide-react";

/* ------------------------------------------------------------------------
 * Ангийн камерын дүрсийн хялбаршуулсан зураг (урдаас харсан, 3 эгнээ ширээ).
 * Координат нь 640×360 viewBox дотор; илрүүлэлтийн хүрээг % болгож HTML-ээр давхарлана.
 * ---------------------------------------------------------------------- */

const W = 640;
const H = 360;

type Pose = "normal" | "sleep" | "phone";

const ROWS = [
  { deskY: 168, s: 0.58 },
  { deskY: 238, s: 0.78 },
  { deskY: 328, s: 1 },
];

const SKIN = ["#f1c9a5", "#e3b089", "#d49b71", "#eabf98"];
const HAIR = ["#2b2118", "#3a2a1f", "#1f1a17", "#4a3526"];
const SHIRT = ["#93bbfb", "#c0d6fd", "#6197f7", "#cbd5e1", "#a5b4fc", "#bae6fd"];
const SLEEPER_SHIRT = "#6d8fd8";

// [эгнээ, ширээ, суудал] → байдал
const POSES: Record<string, Pose> = {
  "0-0-0": "phone",
  "1-2-1": "sleep",
};

type Student = { id: string; x: number; deskY: number; s: number; pose: Pose; i: number };

const STUDENTS: Student[] = ROWS.flatMap((row, r) =>
  [0, 1, 2].flatMap((d) => {
    const deskX = W / 2 + (d - 1) * 200 * row.s;
    return [0, 1].map((seat) => {
      const id = `${r}-${d}-${seat}`;
      const i = r * 6 + d * 2 + seat;
      return { id, x: deskX + (seat === 0 ? -36 : 36) * row.s, deskY: row.deskY, s: row.s, pose: POSES[id] ?? "normal", i };
    });
  }),
);

function StudentBody({ x, deskY, s, pose, i }: Student) {
  const skin = SKIN[i % SKIN.length];
  const hair = HAIR[(i * 3) % HAIR.length];
  const shirt = SHIRT[(i * 5) % SHIRT.length];

  if (pose === "sleep") {
    return <rect x={x - 27 * s} y={deskY - 27 * s} width={54 * s} height={33 * s} rx={18 * s} fill={SLEEPER_SHIRT} />;
  }

  const headY = pose === "phone" ? deskY - 48 * s : deskY - 54 * s;
  return (
    <g>
      <rect x={x - 27 * s} y={deskY - 38 * s} width={54 * s} height={44 * s} rx={20 * s} fill={shirt} />
      <path
        d={`M${x - 8 * s},${deskY - 37 * s} L${x},${deskY - 28 * s} L${x + 8 * s},${deskY - 37 * s} Z`}
        fill="#ffffff"
        opacity={0.9}
      />
      <circle cx={x} cy={headY} r={16.5 * s} fill={hair} />
      <ellipse cx={x} cy={headY + 3 * s} rx={14 * s} ry={13.5 * s} fill={skin} />
      {pose === "phone" ? (
        <g stroke="#1e293b" strokeWidth={1.6 * s} strokeLinecap="round">
          <line x1={x - 7 * s} y1={headY + 5 * s} x2={x - 3 * s} y2={headY + 5 * s} />
          <line x1={x + 3 * s} y1={headY + 5 * s} x2={x + 7 * s} y2={headY + 5 * s} />
        </g>
      ) : (
        <g fill="#1e293b">
          <circle cx={x - 5 * s} cy={headY + 2 * s} r={1.5 * s} />
          <circle cx={x + 5 * s} cy={headY + 2 * s} r={1.5 * s} />
        </g>
      )}
    </g>
  );
}

function StudentFront({ x, deskY, s, pose, i }: Student) {
  const skin = SKIN[i % SKIN.length];
  const hair = HAIR[(i * 3) % HAIR.length];

  if (pose === "sleep") {
    return (
      <g>
        <rect x={x - 28 * s} y={deskY - 10 * s} width={56 * s} height={13 * s} rx={6.5 * s} fill={SLEEPER_SHIRT} />
        <ellipse cx={x - 21 * s} cy={deskY - 3.5 * s} rx={5 * s} ry={4 * s} fill={skin} />
        <ellipse cx={x + 21 * s} cy={deskY - 3.5 * s} rx={5 * s} ry={4 * s} fill={skin} />
        <ellipse cx={x + 1 * s} cy={deskY - 15 * s} rx={16 * s} ry={13 * s} fill={hair} />
        <ellipse cx={x - 4 * s} cy={deskY - 21 * s} rx={6 * s} ry={3 * s} fill="#ffffff" opacity={0.12} />
      </g>
    );
  }
  if (pose === "phone") {
    return (
      <g>
        <circle cx={x} cy={deskY - 9 * s} r={15 * s} fill="#7dd3fc" opacity={0.3} />
        <rect x={x - 5.5 * s} y={deskY - 17 * s} width={11 * s} height={17 * s} rx={2 * s} fill="#0f172a" />
        <rect x={x - 4 * s} y={deskY - 15.5 * s} width={8 * s} height={13 * s} rx={1.2 * s} fill="#7dd3fc" />
        <circle cx={x - 7 * s} cy={deskY - 5 * s} r={4.3 * s} fill={skin} />
        <circle cx={x + 7 * s} cy={deskY - 5 * s} r={4.3 * s} fill={skin} />
      </g>
    );
  }
  return (
    <g fill={skin}>
      <ellipse cx={x - 12 * s} cy={deskY + 1 * s} rx={6 * s} ry={4 * s} />
      <ellipse cx={x + 12 * s} cy={deskY + 1 * s} rx={6 * s} ry={4 * s} />
    </g>
  );
}

function Desk({ x, deskY, s }: { x: number; deskY: number; s: number }) {
  return (
    <g>
      <rect x={x - 75 * s} y={deskY} width={150 * s} height={7 * s} rx={2 * s} fill="#c9a67d" />
      <rect x={x - 71 * s} y={deskY + 7 * s} width={142 * s} height={19 * s} fill="#b28b62" />
    </g>
  );
}

function ClassroomScene() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <linearGradient id="cp-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbe3ee" />
          <stop offset="1" stopColor="#c7d2e0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="#eef2f7" />
      {[40, 260, 480].map((wx) => (
        <g key={wx}>
          <rect x={wx} y={22} width={120} height={72} rx={3} fill="#cfe0f7" stroke="#b6c6dc" strokeWidth={3} />
          <line x1={wx + 60} y1={22} x2={wx + 60} y2={94} stroke="#b6c6dc" strokeWidth={3} />
        </g>
      ))}
      <rect y={122} width={W} height={H - 122} fill="url(#cp-floor)" />
      <rect y={118} width={W} height={5} fill="#cbd5e1" />

      {ROWS.map((row, r) => {
        const students = STUDENTS.filter((st) => st.id.startsWith(`${r}-`));
        return (
          <g key={r}>
            {students.map((st) => (
              <StudentBody key={st.id} {...st} />
            ))}
            {[0, 1, 2].map((d) => (
              <Desk key={d} x={W / 2 + (d - 1) * 200 * row.s} deskY={row.deskY} s={row.s} />
            ))}
            {students.map((st) => (
              <StudentFront key={st.id} {...st} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------------ */

function boxFor(id: string) {
  const st = STUDENTS.find((item) => item.id === id)!;
  const { x, deskY, s, pose } = st;
  const box =
    pose === "sleep"
      ? { x1: x - 34 * s, y1: deskY - 32 * s, x2: x + 34 * s, y2: deskY + 6 * s }
      : { x1: x - 31 * s, y1: deskY - 72 * s, x2: x + 31 * s, y2: deskY + 6 * s };
  return {
    alignRight: box.x1 > W / 2,
    left: `${(box.x1 / W) * 100}%`,
    top: `${(box.y1 / H) * 100}%`,
    width: `${((box.x2 - box.x1) / W) * 100}%`,
    height: `${((box.y2 - box.y1) / H) * 100}%`,
  };
}

function Detection({ studentId, tone, children }: { studentId: string; tone: "rose" | "amber"; children: ReactNode }) {
  const color = tone === "rose" ? "border-rose-500 bg-rose-500/10" : "border-amber-400 bg-amber-400/10";
  const chip = tone === "rose" ? "bg-rose-600 text-white" : "bg-amber-400 text-slate-900";
  const { alignRight, ...position } = boxFor(studentId);
  return (
    <div className={`absolute rounded-md border-2 ${color}`} style={position}>
      <span
        className={`absolute bottom-full ${alignRight ? "right-[-2px]" : "left-[-2px]"} mb-1 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] leading-none font-bold whitespace-nowrap shadow-sm sm:text-[11px] ${chip}`}
      >
        {children}
      </span>
    </div>
  );
}

/** Hero хэсгийн ClassPulse AI програмын жишээ зураг — бүхэлдээ SVG/Tailwind-аар зурсан. */
export function DetectionMockup() {
  return (
    <div
      role="img"
      aria-label="ClassPulse AI програмын жишээ: ангийн камерын дүрс дээр AI нэг сурагчийг утсаа оролдож буй, нөгөөг нь нойрмоглож буйг илрүүлж өнгөт хүрээгээр тэмдэглэсэн. Дэлгэцийн буланд «Арын эгнээнд нэг сурагч утсаа оролдож байна» гэсэн мэдэгдэл гарсан."
      className="relative mx-auto w-full max-w-xl select-none sm:pb-16 lg:max-w-none"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-200/60 via-brand-50 to-emerald-100/70 blur-2xl"
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-brand-900/10">
        {/* Програмын толгой */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-slate-300" />
              <span className="size-2.5 rounded-full bg-slate-300" />
              <span className="size-2.5 rounded-full bg-slate-300" />
            </span>
            <span className="truncate text-sm font-semibold text-slate-800">ClassPulse AI</span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Хянаж байна
          </span>
        </div>

        {/* Камерын дүрс */}
        <div className="relative aspect-video overflow-hidden bg-slate-200">
          <ClassroomScene />
          <div aria-hidden="true" className="cp-scan pointer-events-none absolute inset-x-0 top-0 h-1/3" />

          <Detection studentId="0-0-0" tone="rose">
            <Smartphone className="size-3" aria-hidden="true" />
            Утас · 9 сек
          </Detection>
          <Detection studentId="1-2-1" tone="amber">
            <Moon className="size-3" aria-hidden="true" />
            Нойрмоглож байна · 24 сек
          </Detection>

          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-rose-500" />
            Камер 1 · Шууд
          </span>
          <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-slate-950/70 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur sm:text-[11px]">
            <Cpu className="size-3" aria-hidden="true" />
            Локал боловсруулалт
          </span>
        </div>

        {/* Төлөвийн мөр */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5 text-xs text-slate-600">
          <span>
            Хянаж буй хэсэг: <span className="font-semibold text-slate-800">Хяналтын камер — 7Б анги</span>
          </span>
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-full bg-rose-500" /> Утас 1
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-2 rounded-full bg-amber-400" /> Нойрмоглолт 1
            </span>
          </span>
        </div>
      </div>

      {/* Дэлгэцийн мэдэгдэл */}
      <div className="relative mx-3 -mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:absolute sm:bottom-0 sm:-left-6 sm:mx-0 sm:mt-0 sm:w-80 lg:-left-10">
        <div className="flex gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
            <Smartphone className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <Bell className="size-3" aria-hidden="true" />
              ClassPulse AI · дөнгөж сая
            </p>
            <p className="mt-0.5 text-sm leading-snug font-semibold text-slate-900">
              Арын эгнээнд нэг сурагч утсаа оролдож байна
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">Камерын дүрс дээр улаан хүрээгээр тэмдэглэв</p>
          </div>
        </div>
      </div>
    </div>
  );
}
