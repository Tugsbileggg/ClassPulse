import { Activity, Check, ChevronDown, Download, Info, Lock, Minus, Square, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppleLogo } from "@/components/ui/AppleLogo";
import { WindowsLogo } from "@/components/ui/WindowsLogo";
import { COMMON_REQUIREMENTS, DOWNLOADS, downloadMeta, type DownloadTarget } from "@/lib/download";

const HIGHLIGHTS = [
  "Нэг удаа суулгаад л ашиглана",
  "Одоо байгаа камертай тань ажиллана",
  "Туршилтын хугацаанд үнэгүй",
];

const INSTALL_STEPS = [
  { label: "AI загварыг татлаа", done: true },
  { label: "Компьютерт суулгалаа", done: true },
  { label: "Хянах хэсгээ сонгох", done: false },
];

function OsLogo({ os, className }: { os: DownloadTarget["os"]; className?: string }) {
  return os === "windows" ? <WindowsLogo className={className} /> : <AppleLogo className={className} />;
}

function AppIcon() {
  return (
    <span className="relative flex size-16 items-center justify-center overflow-hidden rounded-[1.1rem] bg-gradient-to-b from-brand-400 to-brand-600 text-white shadow-xl shadow-black/30 ring-1 ring-white/20">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      <Activity className="relative size-8" strokeWidth={2.5} aria-hidden="true" />
    </span>
  );
}

/** Суулгалт дууссан үеийн програмын цонх — banner-ын баруун ирмэгээр тасарч харагдана. */
function InstallerMockup() {
  return (
    <div
      role="img"
      aria-label="ClassPulse AI-г суулгах цонхны жишээ: AI загварыг татаж, компьютерт суулгасан. Дараагийн алхам нь хянах хэсгээ сонгох."
      className="relative hidden select-none lg:block"
    >
      <div className="absolute top-1/2 left-0 w-[calc(100%+5rem)] -translate-y-1/2 overflow-hidden rounded-l-2xl border border-white/15 bg-white text-slate-900 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 pl-4">
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span className="flex size-4 items-center justify-center rounded bg-brand-600 text-white">
              <Activity className="size-3" strokeWidth={3} />
            </span>
            ClassPulse AI — Суулгалт
          </span>
          <span className="flex text-slate-500">
            <span className="flex size-9 items-center justify-center">
              <Minus className="size-3.5" />
            </span>
            <span className="flex size-9 items-center justify-center">
              <Square className="size-3" />
            </span>
            <span className="flex size-9 items-center justify-center">
              <X className="size-3.5" />
            </span>
          </span>
        </div>

        <div className="p-6 pr-26">
          <p className="text-lg font-bold">Суулгалт дууслаа</p>
          <p className="mt-1 text-sm text-slate-600">Одоо ангийнхаа камерын дүрсийг хянаж эхлэхэд бэлэн.</p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500" />
          </div>

          <ol className="mt-5 space-y-2.5">
            {INSTALL_STEPS.map(({ label, done }) => (
              <li
                key={label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                  done ? "text-slate-700" : "bg-brand-50 text-brand-800 ring-1 ring-brand-100"
                }`}
              >
                {done ? (
                  <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                ) : (
                  <span className="flex size-5 items-center justify-center rounded-full border-2 border-brand-500">
                    <span className="size-1.5 rounded-full bg-brand-500" />
                  </span>
                )}
                {label}
              </li>
            ))}
          </ol>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <Lock className="size-3.5" />
              Видео таны компьютерээс гарахгүй
            </span>
            <span className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Эхлүүлэх</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DownloadSection() {
  return (
    <section id="download" aria-labelledby="download-title" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <Container>
        <div className="relative isolate overflow-clip rounded-[2rem] bg-brand-950 px-6 py-12 text-white shadow-2xl shadow-brand-950/20 sm:px-10 sm:py-14 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 lg:py-0 lg:pr-0 lg:pl-14">
          <div aria-hidden="true" className="absolute -top-40 -left-32 -z-10 size-[30rem] rounded-full bg-brand-600/35 blur-3xl" />
          <div
            aria-hidden="true"
            className="absolute -right-24 -bottom-48 -z-10 size-[28rem] rounded-full bg-emerald-500/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
          />

          <div className="lg:py-14">
            <div data-reveal>
              <AppIcon />
            </div>

            <div className="mt-7">
              <SectionHeading
                id="download-title"
                align="left"
                tone="dark"
                eyebrow="Татаж авах"
                title={
                  <>
                    <span className="whitespace-nowrap">ClassPulse AI-г</span> компьютертоо суулгаарай
                  </>
                }
                description="Нэг удаа суулгаад л ангийнхаа камерын дүрсийг хянаж эхэлнэ. AI загвар таны компьютер дээр ажилладаг тул видео интернэтээр дамжихгүй."
              />
            </div>

            <div data-reveal className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {DOWNLOADS.map(({ os, label, url, platform }) => (
                  <a
                    key={os}
                    href={url}
                    download
                    aria-label={`${label} (${platform})`}
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-brand-900 shadow-lg shadow-black/20 transition-colors hover:bg-brand-50 active:bg-brand-100 sm:w-64"
                  >
                    <OsLogo os={os} className="size-4" />
                    {label}
                    <Download
                      className="size-4 opacity-60 transition-transform motion-safe:group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>

              <p className="mt-3 text-sm text-slate-400">{downloadMeta}</p>

              <p className="mt-4 flex max-w-md items-start gap-2 text-sm leading-relaxed text-slate-300">
                <Info className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
                Zip-ийг задлаад доторх «Заавар.txt»-ийн дагуу суулгана. Анх суулгахад AI сан, загварыг интернэтээс
                татна (10–20 минут).
              </p>

              <ul className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                    <span className="flex size-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <details className="group mt-8 border-t border-white/10 pt-5">
                <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-md text-sm font-semibold text-white transition-colors hover:text-brand-200">
                  Системийн шаардлага
                  <ChevronDown
                    className="size-4 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 sm:gap-x-6">
                  {DOWNLOADS.map(({ os, platform, requirements }) => (
                    <div key={os}>
                      <p className="flex items-center gap-2 text-sm font-semibold text-white">
                        <OsLogo os={os} className="size-3.5" />
                        {platform}
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {[...requirements, ...COMMON_REQUIREMENTS].map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-emerald-400"
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>

          <InstallerMockup />
        </div>
      </Container>
    </section>
  );
}
