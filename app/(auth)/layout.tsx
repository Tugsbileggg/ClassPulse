import type { ReactNode } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-gradient-to-b from-brand-50 to-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-0 h-96 [background-image:radial-gradient(var(--color-brand-200)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-60"
      />
      <header className="relative px-4 py-5 sm:px-8">
        <Link href="/" className="inline-block rounded-lg" aria-label="ClassPulse — нүүр хуудас">
          <Logo />
        </Link>
      </header>

      <main className="relative flex flex-1 items-start justify-center px-4 pt-6 pb-16 sm:items-center sm:pt-0">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/[0.07] sm:p-8">
            {children}
          </div>
          <p className="mt-6 flex items-start justify-center gap-2 text-center text-sm text-slate-600">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
            Камерын дүрс зөвхөн таны хөтөч дотор харагдана — хаашаа ч илгээгдэхгүй.
          </p>
        </div>
      </main>
    </div>
  );
}
