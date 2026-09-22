import type { CSSProperties } from "react";
import { BellRing, MonitorPlay, Moon, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: Moon,
    title: "Нойрмоглолт илрүүлэх",
    text: "Толгойгоо унжуулах, ширээн дээр хэвтэх зэрэг байдлыг таньж, удаан үргэлжилбэл нойрмоглож буй гэж тэмдэглэнэ.",
    accent: "bg-amber-50 text-amber-700",
  },
  {
    icon: Smartphone,
    title: "Утас ашиглалт илрүүлэх",
    text: "Гартаа утас барьж, доошоо удаан харж буй сурагчийг ялгаж, ангийн аль хэсэгт байгааг дүрс дээр заана.",
    accent: "bg-rose-50 text-rose-600",
  },
  {
    icon: BellRing,
    title: "Багшид шууд мэдэгдэл",
    text: "Илрүүлмэгц компьютерийн дэлгэцийн буланд мэдэгдэл гарч, тухайн сурагчийг камерын дүрс дээр өнгөт хүрээгээр тэмдэглэнэ.",
    accent: "bg-brand-50 text-brand-700",
  },
  {
    icon: MonitorPlay,
    title: "Ямар ч камертай ажиллана",
    text: "Вэб камер эсвэл сургуулийн хяналтын камер — дэлгэцэн дээр гарч буй дүрсийг л уншина. Нэмэлт төхөөрөмж, сервер шаардлагагүй.",
    accent: "bg-emerald-50 text-emerald-700",
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-16 bg-slate-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="Боломжууд"
          title="Хоёр зүйлийг анзаарч, танд цаг алдалгүй хэлнэ"
          description="ClassPulse AI ангийг таны оронд ажиглаж, сурагч унтах эсвэл утсаа оролдох үед танд дохио өгнө. Харин юу хийхээ үргэлж багш өөрөө шийднэ."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
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
