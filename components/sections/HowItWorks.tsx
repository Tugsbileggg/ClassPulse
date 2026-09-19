import type { CSSProperties } from "react";
import { BellRing, LayoutGrid, Presentation, Webcam } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    icon: Webcam,
    title: "Камераа холбоно",
    text: "Ангийг бүхэлд нь харах энгийн вэб камерыг ангийн компьютерт холбоно. Тусгай, үнэтэй төхөөрөмж шаардлагагүй.",
  },
  {
    icon: LayoutGrid,
    title: "Суудлын зураглал тохируулна",
    text: "Камерын дүрс дээр суудал бүрийг тэмдэглээд, тэнд суудаг сурагчийн нэрийг онооно. Нэг удаа, 10 орчим минут л зарцуулна.",
  },
  {
    icon: Presentation,
    title: "Хичээлээ заана, AI ажиглана",
    text: "Та хичээлээ ердийнхөөрөө заана. ClassPulse сурагч бүрийн идэвхийг хөтөч дотроо тасралтгүй дүгнэнэ.",
  },
  {
    icon: BellRing,
    title: "Мэдэгдэл, тайлан авна",
    text: "Анхаарал шаардсан агшинд мэдэгдэл хүлээн авч, өдрийн төгсгөлд сурагч бүрийн оролцооны тайлантай танилцана.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="Хэрхэн ажилладаг"
          title="Дөрвөн энгийн алхмаар эхэлнэ"
          description="Техникийн тусгай мэдлэг шаардахгүй. Бүртгүүлээд нэвтэрмэгц камераа холбож, суудлын зураглалаа хэдхэн минутад тохируулна."
        />

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 lg:block"
          />
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                data-reveal
                style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                  <Icon className="size-6" aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-700 ring-2 ring-brand-100">
                    {index + 1}
                  </span>
                </span>
                <div className="lg:mt-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    <span className="sr-only">{index + 1}-р алхам: </span>
                    {title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
