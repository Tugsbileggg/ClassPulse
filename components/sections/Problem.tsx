import type { CSSProperties } from "react";
import { ClipboardX, Hourglass, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PROBLEMS = [
  {
    icon: Users,
    title: "Бүгдийг анзаарах боломжгүй",
    text: "Самбар дээр бичиж, асуултад хариулж байх зуур арын эгнээнд хэн утсаа оролдож, хэн нойрмоглож байгааг нэгэн зэрэг хянах аргагүй.",
  },
  {
    icon: ClipboardX,
    title: "Хичээлийн дараа өгөгдөл үлддэггүй",
    text: "Сурагч хичээлд хэр оролцсоныг зөвхөн ой санамж, мэдрэмждээ тулгуурлан дүгнэдэг. Эцэг эхтэй ярилцахад ч бодит тоо баримт дутагдана.",
  },
  {
    icon: Hourglass,
    title: "Хоцорсон хойно нь мэддэг",
    text: "Сурагч хичээлээсээ хөндийрч эхэлснийг ихэнхдээ шалгалтын дүн гарсны дараа л мэддэг. Тэр үед туслахад аль хэдийн оройтсон байдаг.",
  },
];

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="problem-title"
          eyebrow="Багшид тулгардаг бэрхшээл"
          title="Нэг багш, 30 гаруй сурагч, 40 минутын хичээл"
          description="Хичээл заахын зэрэгцээ ангийн бүх сурагчийг нэг дор ажиглах боломжгүй. Энэ бол багшийн буруу биш — хүний анхаарлын жам ёсны хязгаар."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
