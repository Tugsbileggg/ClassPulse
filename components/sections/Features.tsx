import type { CSSProperties } from "react";
import { Armchair, BellRing, ChartColumn, Eye, LayoutGrid, Moon, ShieldCheck, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: BellRing,
    title: "Шууд мэдэгдэл",
    text: "Сурагч унтаж, утсаа оролдож эсвэл удаан хугацаанд сатаарвал танд тэр даруй мэдэгдэнэ. Мэдэгдэл бүр аль эгнээ, аль суудал болохыг тодорхой заана.",
    accent: "bg-rose-50 text-rose-600",
  },
  {
    icon: ChartColumn,
    title: "Өдрийн оролцооны тайлан",
    text: "Өдрийн төгсгөлд сурагч тус бүрийн оролцооны хувийг нэг дор харна. Хэнд нэмэлт анхаарал хэрэгтэйг мэдрэмжээр биш, тоо баримтаар мэдэнэ.",
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: LayoutGrid,
    title: "Суудлын зураглал",
    text: "Ангийн суудлын байрлалыг нэг удаа тохируулахад хангалттай. Систем сурагчийг царайгаар нь биш, суудаг байраар нь ялгаж танина.",
    accent: "bg-brand-50 text-brand-700",
  },
  {
    icon: ShieldCheck,
    title: "Нууцлалд төвлөрсөн",
    text: "Бүх боловсруулалт ангийн компьютерийн хөтөч дотор явагдана. Видео бичлэг, зураг сервер рүү илгээгдэхгүй, хаана ч хадгалагдахгүй.",
    accent: "bg-violet-50 text-violet-700",
  },
];

const SIGNALS = [
  { icon: Armchair, label: "Суудалдаа байгаа эсэх" },
  { icon: Moon, label: "Нойрмоглож, толгой унжсан эсэх" },
  { icon: Eye, label: "Самбар руу харж буй эсэх" },
  { icon: Smartphone, label: "Утсаа оролдож буй эсэх" },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-16 bg-slate-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="Боломжууд"
          title="Хичээлийн үеэр ч, дараа нь ч танд туслана"
          description="ClassPulse ангийг таны оронд ажиглаж, анхаарал шаардсан агшинд танд хэлнэ. Харин шийдвэр гаргах нь үргэлж багшийн эрх хэвээр үлдэнэ."
        />

        <div data-reveal className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-center text-sm font-semibold text-slate-700">ClassPulse сурагч бүрийн хувьд юуг анзаардаг вэ?</p>
          <ul className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-4">
            {SIGNALS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700">
                <Icon className="size-5 shrink-0 text-brand-600" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, text, accent }, index) => (
            <li
              key={title}
              data-reveal
              style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as CSSProperties}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.03] sm:p-8"
            >
              <span className={`flex size-12 items-center justify-center rounded-xl ${accent}`}>
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
