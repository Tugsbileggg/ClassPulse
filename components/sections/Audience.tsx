import type { CSSProperties } from "react";
import { Building2, Check, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: "Ангийн багш",
    text: "Самбар руу эргэсэн үедээ ч ангиа хянаж, унтаж эсвэл утсаа оролдож буй сурагчид цаг алдалгүй анхаарал хандуулна.",
    points: [
      "Хичээлээ тасалдуулалгүйгээр ангиа хянана",
      "Сатаарсан сурагчид зөөлөн, цаг тухайд нь хандана",
      "Хичээлийн аль хэсэгт анги идэвх алдсаныг тэмдэглэлээс харна",
    ],
    accent: "bg-brand-600",
  },
  {
    icon: Building2,
    title: "Сургуулийн удирдлага",
    text: "Одоо байгаа камер, компьютерээ ашиглан багш нартаа ангиа хянахад нь туслах хэрэгслийг шинэ тоног төхөөрөмжгүйгээр нэвтрүүлнэ.",
    points: [
      "Нэмэлт сервер, тусгай камер шаардлагагүй",
      "Сурагчдын видео сургуулиас гадагш гарахгүй",
      "Эцэг эхийн зөвшөөрлийн журмыг ClassPulse-тэй хамтран тогтооно",
    ],
    accent: "bg-emerald-600",
  },
];

export function Audience() {
  return (
    <section aria-labelledby="audience-title" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading id="audience-title" eyebrow="Хэнд зориулсан" title="Ангийн багш болон сургуулийн удирдлагад" />

        <ul className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {AUDIENCES.map(({ icon: Icon, title, text, points, accent }, index) => (
            <li
              key={title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.03] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className={`flex size-12 items-center justify-center rounded-xl text-white ${accent}`}>
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              </div>
              <p className="mt-4 leading-relaxed text-slate-600">{text}</p>
              <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-slate-700">
                    <Check className="mt-1 size-4 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
