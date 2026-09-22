import { ArrowRight, Check, ScanEye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { DetectionMockup } from "@/components/ui/DetectionMockup";
import { WindowsLogo } from "@/components/ui/WindowsLogo";
import { downloadMeta, downloadReady } from "@/lib/download";

const TRUST_POINTS = [
  "Таны компьютер дээр ажиллана",
  "Видео хаашаа ч илгээгдэхгүй",
  "Нүүр таних технологигүй",
];

const FRAME_CORNERS = [
  "-top-0.5 -left-0.5 rounded-tl-lg border-t-[3px] border-l-[3px]",
  "-top-0.5 -right-0.5 rounded-tr-lg border-t-[3px] border-r-[3px]",
  "-bottom-0.5 -left-0.5 rounded-bl-lg border-b-[3px] border-l-[3px]",
  "-bottom-0.5 -right-0.5 rounded-br-lg border-b-[3px] border-r-[3px]",
];

/**
 * Гарчгийн тодотгосон үгийг AI-н илрүүлэлтийн хүрээгээр хүрээлнэ (DetectionMockup дээрх хүрээтэй ижил хэл).
 * Шошгоны текст CSS `content`-оор гардаг тул h1-ийн текстэд орохгүй.
 */
function DetectedPhrase({ children }: { children: string }) {
  return (
    <span className="relative mt-2 inline-block rounded-lg bg-brand-500/[0.07] px-3 text-brand-600 ring-1 ring-brand-500/25 ring-inset">
      {children}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
        <span className="cp-scan absolute inset-x-0 top-0 h-1/3" />
      </span>
      {FRAME_CORNERS.map((corner) => (
        <span key={corner} aria-hidden="true" className={`absolute size-4 border-brand-600 ${corner}`} />
      ))}
      <span
        aria-hidden="true"
        className="absolute top-full right-0 mt-2 inline-flex items-center gap-1 rounded-md bg-brand-600 px-2 py-1 text-xs leading-none font-bold tracking-normal whitespace-nowrap text-white shadow-sm shadow-brand-600/30 after:content-['AI_илрүүлэлт']"
      >
        <ScanEye className="size-3.5" />
      </span>
    </span>
  );
}

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
            className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-[2.9rem] lg:leading-[1.1] xl:text-[3.1rem]"
          >
            Унтаж, утсаа оролдож буй сурагчийг <DetectedPhrase>AI шууд анзаарна</DetectedPhrase>
          </h1>

          <p className="mt-12 text-lg leading-relaxed text-pretty text-slate-600 sm:text-xl">
            ClassPulse AI-г компьютертоо татаж ажиллуулаад ангийнхаа камерын дүрсийг дэлгэцэн дээрээ нээхэд л
            хангалттай. AI дүрсийг тасралтгүй шинжилж, унтаж эсвэл утсаа оролдож буй сурагчийг илрүүлмэгц танд
            мэдэгдэнэ.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-2">
            <div className="flex flex-col">
              <CtaLink size="lg" />
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500 sm:justify-start">
                <WindowsLogo className="size-3.5 text-slate-400" />
                {downloadMeta}
              </p>
            </div>
            <a
              href="#how-it-works"
              className="group inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-base font-semibold whitespace-nowrap text-brand-700 hover:bg-brand-50 sm:justify-start"
            >
              Хэрхэн ажилладаг вэ?
              <ArrowRight
                className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 border-t border-slate-200/80 pt-6 sm:flex-row sm:flex-wrap sm:gap-x-6">
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

        <div className="relative isolate">
          {/* lg дээр програмын цонхыг баруун ирмэг хүртэл үргэлжлэх өнгөт самбар дээр тавина. */}
          <div
            aria-hidden="true"
            className="absolute -top-10 -bottom-4 left-[10%] -z-10 hidden overflow-hidden rounded-l-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 lg:block lg:right-[min(-2rem,calc(34rem-50vw))]"
          >
            <div className="absolute inset-0 [background-image:linear-gradient(rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute -top-24 -right-16 size-80 rounded-full bg-emerald-300/25 blur-3xl" />
          </div>
          <DetectionMockup />
        </div>
      </Container>
    </section>
  );
}
