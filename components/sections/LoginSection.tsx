import type { CSSProperties } from "react";
import { LayoutGrid, LogIn, Webcam } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const NEXT_STEPS = [
  { icon: LogIn, title: "Бүртгүүлж нэвтэрнэ", text: "Нэр, и-мэйл, нууц үгээ оруулахад л хангалттай." },
  { icon: Webcam, title: "Камераа холбоно", text: "Хөтөч камер ашиглах зөвшөөрөл асуухад «Зөвшөөрөх»-ийг дарна." },
  { icon: LayoutGrid, title: "Суудлаа тохируулна", text: "Шууд дүрс дээр суудал бүрийг зурж, сурагчийн нэрийг онооно." },
];

export function LoginSection() {
  return (
    <section
      id="login"
      aria-labelledby="login-title"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-brand-50 to-white py-20 sm:py-24"
    >
      {/* `#register` холбоос энэ хэсэг рүү гүйлгэж, бүртгэлийн табыг нээнэ. */}
      <span id="register" aria-hidden="true" className="absolute top-0 scroll-mt-16" />

      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="lg:pt-6">
          <SectionHeading
            id="login-title"
            align="left"
            eyebrow="Нэвтрэх"
            title="Ангийнхаа камерыг холбоод эхлээрэй"
            description="Бүртгүүлээд нэвтэрмэгц ClassPulse таны камерын дүрсийг шууд харуулж, суудлын зураглалыг тохируулахад тусална. Видео зөвхөн таны хөтөч дотор үлдэнэ."
          />

          <ol className="mt-10 space-y-6">
            {NEXT_STEPS.map(({ icon: Icon, title, text }, index) => (
              <li
                key={title}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
                className="flex gap-4"
              >
                <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm ring-1 ring-brand-100">
                  <Icon className="size-5" aria-hidden="true" />
                  <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{title}</h3>
                  <p className="mt-1 leading-relaxed text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/[0.07] sm:p-8">
          <AuthForm onLandingPage />
        </div>
      </Container>
    </section>
  );
}
