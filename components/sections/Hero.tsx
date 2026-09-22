import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { DetectionMockup } from "@/components/ui/DetectionMockup";
import { downloadReady } from "@/lib/download";

const TRUST_POINTS = [
  "Таны компьютер дээр ажиллана",
  "Видео хаашаа ч илгээгдэхгүй",
  "Нүүр таних технологигүй",
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-gradient-to-b from-brand-50 via-brand-50/40 to-white"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[36rem] [background-image:radial-gradient(var(--color-brand-200)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)] opacity-60"
      />

      <Container className="grid items-center gap-14 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pt-20 lg:pb-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1 text-sm font-medium text-brand-800 shadow-sm">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {downloadReady ? "Windows-д зориулсан AI загвар гарлаа" : "AI загвар тун удахгүй гарна"}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-[3.1rem] lg:leading-[1.1]"
          >
            Унтаж, утсаа оролдож буй сурагчийг <span className="text-brand-600">AI шууд анзаарна</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-pretty text-slate-600 sm:text-xl">
            ClassPulse AI-г компьютертоо татаж ажиллуулаад ангийнхаа камерын дүрсийг дэлгэцэн дээрээ нээхэд л
            хангалттай. AI дүрсийг тасралтгүй шинжилж, унтаж эсвэл утсаа оролдож буй сурагчийг илрүүлмэгц танд
            мэдэгдэнэ.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaLink size="lg" />
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-base font-semibold text-brand-700 hover:bg-brand-50 sm:justify-start"
            >
              Хэрхэн ажилладаг вэ?
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <DetectionMockup />
      </Container>
    </section>
  );
}
