import type { CSSProperties } from "react";
import { Check, HeartHandshake, MonitorSmartphone, ScanFace, Handshake, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PRINCIPLES = [
  {
    icon: MonitorSmartphone,
    title: "Видео сервер рүү явдаггүй",
    text: "Камерын дүрс зөвхөн ангийн компьютерийн хөтөч дотор боловсруулагдана. Видео, зураг хаашаа ч илгээгдэхгүй, хадгалагдахгүй.",
  },
  {
    icon: ScanFace,
    title: "Нүүр танихгүй",
    text: "Бид нүүр таних технологи ашигладаггүй. Сурагчийг царайгаар нь биш, багшийн тохируулсан суудлын зураглалаар ялгана.",
  },
  {
    icon: HeartHandshake,
    title: "Шийтгэл биш, дэмжлэг",
    text: "Зорилго маань сурагчийг загнаж, шийтгэх биш. Хэнд нэмэлт анхаарал, тусламж хэрэгтэйг багшид цаг тухайд нь харуулах явдал юм.",
  },
  {
    icon: Handshake,
    title: "Сургуультай хамтран, зөвшөөрөлтэйгөөр",
    text: "Ангид ашиглаж эхлэхээс өмнө эцэг эх, асран хамгаалагчдад мэдэгдэж, зөвшөөрөл авах журмыг сургуулийн удирдлагатай хамтран боловсруулна.",
  },
];

const STORED = ["Сурагч бүрийн оролцооны хувь", "Мэдэгдлийн цаг, төрөл", "Суудлын зураглал (суудал → сурагчийн нэр)"];
const NEVER_STORED = ["Видео бичлэг", "Сурагчийн зураг, дүрс", "Нүүрний өгөгдөл, биометр мэдээлэл"];

export function Privacy() {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-title"
      className="relative scroll-mt-16 overflow-hidden bg-brand-950 py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 size-[32rem] rounded-full bg-brand-600/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-40 size-[28rem] rounded-full bg-emerald-500/10 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          id="privacy-title"
          tone="dark"
          eyebrow="Нууцлал ба ёс зүй"
          title="Сурагчдын нууцлал бидний хувьд хамгийн түрүүнд"
          description="ClassPulse-ийг хүүхдийн хувийн мэдээллийг хамгаалах зарчим дээр суурилж бүтээсэн. Бид юу хийдэг, юу хийдэггүйгээ ил тод хэлье."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <ul className="grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as CSSProperties}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-200 ring-1 ring-brand-300/20">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-300">{text}</p>
              </li>
            ))}
          </ul>

          <div data-reveal className="self-start rounded-2xl bg-white p-6 text-slate-900 shadow-2xl shadow-black/20 sm:p-7">
            <h3 className="text-lg font-bold">Ямар мэдээлэл үлддэг вэ?</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Хичээлийн дараа сервер дээр зөвхөн нэгтгэсэн тоон мэдээлэл хадгалагдана.
            </p>

            <h4 className="mt-6 text-sm font-semibold text-emerald-800">Хадгалагдана</h4>
            <ul className="mt-2 space-y-2">
              {STORED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-sm font-semibold text-rose-800">Хэзээ ч хадгалагдахгүй</h4>
            <ul className="mt-2 space-y-2">
              {NEVER_STORED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                    <X className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
              Оролцооны мэдээллийг зөвхөн тухайн ангийн багш болон сургуулийн эрх бүхий ажилтан харна. Гуравдагч
              этгээдэд дамжуулахгүй.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
