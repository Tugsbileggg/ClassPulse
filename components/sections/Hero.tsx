import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { DashboardMockup } from "@/components/ui/DashboardMockup";
import { LOGIN_HREF, REGISTER_HREF } from "@/lib/site";

const TRUST_POINTS = [
  "Энгийн вэб камер хангалттай",
  "Видео сервер рүү илгээгдэхгүй",
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

      <Container className="grid items-center gap-14 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pt-20 lg:pb-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1 text-sm font-medium text-brand-800 shadow-sm">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Багш нарт зориулсан AI туслах
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            Ангийнхаа оролцоог <span className="text-brand-600">нэг харцаар</span> мэдээрэй
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-pretty text-slate-600 sm:text-xl">
            ClassPulse нь ангийн камерын дүрсийг хиймэл оюун ухаанаар боловсруулж, хэн хичээлдээ анхаарлаа
            хандуулж, хэн сатаарч байгааг танд тухай бүрд нь мэдэгдэнэ. Та заах ажилдаа төвлөрөөрэй — бусдыг
            нь ClassPulse анзаарна.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaLink href={REGISTER_HREF} size="lg" withArrow>
              Бүртгүүлэх
            </CtaLink>
            <p className="text-sm text-slate-600">
              Бүртгэлтэй юу?{" "}
              <a href={LOGIN_HREF} className="font-semibold text-brand-700 underline-offset-4 hover:underline">
                Нэвтрэх
              </a>
            </p>
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

        <DashboardMockup />
      </Container>
    </section>
  );
}
