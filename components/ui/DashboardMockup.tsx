import { Bell, Smartphone, TrendingUp } from "lucide-react";

type Seat = "active" | "distracted" | "sleepy" | "phone" | "empty";

const SEAT_STYLES: Record<Seat, string> = {
  active: "bg-emerald-400",
  distracted: "bg-amber-400",
  sleepy: "bg-violet-400",
  phone: "bg-rose-500 ring-2 ring-rose-300 ring-offset-1 motion-safe:animate-pulse",
  empty: "border border-dashed border-slate-300 bg-white",
};

const LEGEND_DOT: Record<Seat, string> = {
  ...SEAT_STYLES,
  phone: "bg-rose-500",
};

const LEGEND: { seat: Seat; label: string }[] = [
  { seat: "active", label: "Идэвхтэй" },
  { seat: "distracted", label: "Сатаарсан" },
  { seat: "sleepy", label: "Нойрмог" },
  { seat: "phone", label: "Утас" },
  { seat: "empty", label: "Хоосон" },
];

// 5 эгнээ × 3 ширээ × 2 суудал = 30 суудал
const ROWS: Seat[][][] = [
  [["active", "active"], ["active", "active"], ["active", "distracted"]],
  [["active", "active"], ["sleepy", "active"], ["active", "active"]],
  [["active", "phone"], ["active", "active"], ["active", "empty"]],
  [["distracted", "active"], ["active", "active"], ["active", "active"]],
  [["active", "active"], ["empty", "active"], ["active", "active"]],
];

const STUDENTS = [
  { name: "Б. Анужин", value: 97 },
  { name: "Т. Тэмүүлэн", value: 93 },
  { name: "Э. Номин", value: 88 },
  { name: "С. Мөнх-Эрдэнэ", value: 72 },
  { name: "Г. Билгүүн", value: 54 },
];

function barColor(value: number) {
  if (value >= 80) return "bg-emerald-500";
  if (value >= 60) return "bg-amber-400";
  return "bg-rose-400";
}

/** Hero хэсгийн багшийн самбарын жишээ зураг — бүхэлдээ HTML/Tailwind-аар зурсан. */
export function DashboardMockup() {
  return (
    <div
      role="img"
      aria-label="ClassPulse багшийн хяналтын самбарын жишээ: 7Б ангийн оролцоо 86 хувь, 30 сурагчаас 28 нь суудалдаа байна, суудлын зураглал болон сурагч бүрийн оролцооны хувь харагдаж байна. Шууд мэдэгдэл: 3-р эгнээнд сурагч утсаа оролдож байна."
      className="relative mx-auto w-full max-w-xl select-none sm:pb-20 lg:max-w-none"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-200/60 via-brand-50 to-emerald-100/70 blur-2xl"
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-brand-900/10">
        {/* Цонхны толгой */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-slate-300" />
              <span className="size-2.5 rounded-full bg-slate-300" />
              <span className="size-2.5 rounded-full bg-slate-300" />
            </span>
            <span className="truncate text-sm font-semibold text-slate-800">7Б анги · Математик</span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Шууд · 10:24
          </span>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-5">
          {/* Үзүүлэлтүүд */}
          <div className="grid grid-cols-3 gap-2 sm:col-span-5 sm:gap-3">
            <div className="rounded-xl border border-slate-100 p-3">
              <p className="text-[11px] font-medium text-slate-500">Ангийн оролцоо</p>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-slate-900 sm:text-2xl">86%</span>
                <span className="hidden items-center text-[11px] font-semibold text-emerald-700 sm:inline-flex">
                  <TrendingUp className="mr-0.5 size-3" aria-hidden="true" />
                  +4%
                </span>
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 p-3">
              <p className="text-[11px] font-medium text-slate-500">Суудалдаа</p>
              <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                28<span className="text-sm font-semibold text-slate-500">/30</span>
              </p>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3">
              <p className="text-[11px] font-medium text-rose-700">Мэдэгдэл</p>
              <p className="mt-1 text-xl font-bold text-rose-700 sm:text-2xl">3</p>
            </div>
          </div>

          {/* Суудлын зураглал */}
          <div className="rounded-xl bg-slate-50 p-3 sm:col-span-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-700">Суудлын зураглал</p>
              <p className="text-[11px] text-slate-500">30 суудал</p>
            </div>
            <div className="mt-2.5 rounded-md bg-slate-200/80 py-1 text-center text-[10px] font-semibold tracking-wider text-slate-600">
              АНГИЙН САМБАР
            </div>
            <div className="mt-3 space-y-1.5">
              {ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center gap-2">
                  <span className="w-3 text-right text-[10px] font-semibold text-slate-500">{rowIndex + 1}</span>
                  <div className="grid flex-1 grid-cols-3 gap-2">
                    {row.map((desk, deskIndex) => (
                      <div key={deskIndex} className="grid grid-cols-2 gap-1 rounded-md bg-white p-1 shadow-sm shadow-slate-900/5">
                        {desk.map((seat, seatIndex) => (
                          <span key={seatIndex} className={`h-3.5 rounded-[4px] sm:h-4 ${SEAT_STYLES[seat]}`} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {LEGEND.map((item) => (
                <li key={item.seat} className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600">
                  <span className={`size-2 rounded-[3px] ${LEGEND_DOT[item.seat]}`} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Сурагчдын оролцоо */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-700">Оролцоо · өнөөдөр</p>
            </div>
            <ul className="mt-2.5 space-y-2.5">
              {STUDENTS.map((student) => (
                <li key={student.name}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="truncate font-medium text-slate-700">{student.name}</span>
                    <span className="font-semibold text-slate-900 tabular-nums">{student.value}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${barColor(student.value)}`} style={{ width: `${student.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Шууд мэдэгдлийн карт */}
      <div className="relative mx-3 -mt-3 rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:absolute sm:bottom-0 sm:-left-6 sm:mx-0 sm:mt-0 sm:w-80 lg:-left-10">
        <div className="flex gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
            <Smartphone className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
              <Bell className="size-3" aria-hidden="true" />
              Мэдэгдэл · дөнгөж сая
            </p>
            <p className="mt-0.5 text-sm font-semibold leading-snug text-slate-900">
              3-р эгнээнд сурагч утсаа оролдож байна
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">3-р эгнээ, 2-р суудал · Г. Билгүүн</p>
          </div>
        </div>
      </div>
    </div>
  );
}
