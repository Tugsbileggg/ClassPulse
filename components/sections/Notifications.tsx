import type { CSSProperties } from "react";
import { AppWindow, Bell, ClipboardList, Moon, ScanSearch, Smartphone, Timer, Volume2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CHANNELS = [
  {
    icon: AppWindow,
    title: "Дэлгэцийн мэдэгдэл",
    text: "Компьютерийн дэлгэцийн буланд жижиг цонх гарч, юу илэрсэн, ангийн аль хэсэгт болохыг харуулна.",
  },
  {
    icon: ScanSearch,
    title: "Дүрс дээр тэмдэглэнэ",
    text: "Камерын дүрс дээр тухайн сурагчийг өнгөт хүрээгээр тэмдэглэнэ: шар — нойрмоглолт, улаан — утас.",
  },
  {
    icon: Volume2,
    title: "Намуухан дуут дохио",
    text: "Хичээлд саад болохгүй зөөлөн дохио өгнө. Шалгалт, бие даалтын үеэр нэг товчоор чимээгүй болгоно.",
  },
  {
    icon: ClipboardList,
    title: "Хичээлийн тэмдэглэл",
    text: "Хичээлийн төгсгөлд хэдэн цагт юу илэрснийг товч жагсаалтаар харна. Зураг, видео хадгалахгүй.",
  },
];

const LOG = [
  { time: "09:12", type: "phone", label: "Утас", place: "Урд эгнээ, баруун тал" },
  { time: "09:26", type: "sleep", label: "Нойрмоглолт", place: "Дунд эгнээ, баруун тал" },
  { time: "09:34", type: "phone", label: "Утас", place: "Арын эгнээ, зүүн тал" },
] as const;

export function Notifications() {
  return (
    <section
      id="notifications"
      aria-labelledby="notifications-title"
      className="scroll-mt-16 bg-slate-50 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="notifications-title"
          eyebrow="Мэдэгдэл"
          title="Илрүүлмэгц танд хэрхэн мэдэгдэх вэ?"
          description="ClassPulse AI хичээлд саад болохгүйгээр, зөвхөн хэрэгтэй үед л дохио өгнө. Мэдэгдлийн хэлбэрийг өөртөө тохируулан сонгоно."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-12">
          <div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {CHANNELS.map(({ icon: Icon, title, text }, index) => (
                <li
                  key={title}
                  data-reveal
                  style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as CSSProperties}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-5 flex gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm">
                <Timer className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Хэрэгтэй үед л дохио өгнө</h3>
                <p className="mt-1.5 leading-relaxed text-slate-600">
                  Цаг харах, ном эргүүлэх зэрэг богино хөдөлгөөнийг мэдэгдэл болгохгүй. Үйлдэл хэдэн секунд
                  үргэлжилсэн тохиолдолд л танд хэлж, нэг сурагчийн талаар дахин дахин мэдэгдэхгүй.
                </p>
              </div>
            </div>
          </div>

          <div
            data-reveal
            role="img"
            aria-label="Мэдэгдлийн жишээ: «Дунд эгнээнд нэг сурагч нойрмоглож байна» гэсэн дэлгэцийн мэдэгдэл, мөн хичээлийн тэмдэглэлд 3 мэдэгдэл — 09:12 утас, 09:26 нойрмоглолт, 09:34 утас."
            className="space-y-4"
          >
            <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-lg shadow-slate-900/5">
              <div className="flex gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Moon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                    <Bell className="size-3" aria-hidden="true" />
                    ClassPulse AI · дөнгөж сая
                  </p>
                  <p className="mt-0.5 text-sm leading-snug font-semibold text-slate-900">
                    Дунд эгнээнд нэг сурагч нойрмоглож байна
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500">24 секунд үргэлжилсэн · Шар хүрээгээр тэмдэглэв</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-brand-900/[0.06]">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <ClipboardList className="size-4 text-brand-600" aria-hidden="true" />
                  <p className="text-sm font-bold text-slate-900">Хичээлийн тэмдэглэл</p>
                </div>
                <p className="text-xs text-slate-500">7Б анги · 09:00–09:40</p>
              </div>
              <ol className="divide-y divide-slate-100">
                {LOG.map((entry) => (
                  <li key={entry.time} className="flex items-center gap-3 px-4 py-3">
                    <span className="w-11 shrink-0 text-sm font-semibold text-slate-900 tabular-nums">{entry.time}</span>
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${
                        entry.type === "phone" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {entry.type === "phone" ? (
                        <Smartphone className="size-4" aria-hidden="true" />
                      ) : (
                        <Moon className="size-4" aria-hidden="true" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-800">{entry.label}</span>
                      <span className="block truncate text-xs text-slate-500">{entry.place}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-600">
                3 мэдэгдэл · Зураг, видео хадгалаагүй — зөвхөн цаг, төрөл
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
