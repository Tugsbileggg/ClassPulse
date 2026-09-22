import { Activity, Check, Clock, Download, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DOWNLOAD, downloadReady } from "@/lib/download";

const HIGHLIGHTS = [
  "Нэг удаа суулгаад л ашиглана",
  "Одоо байгаа камертай тань ажиллана",
  "Туршилтын хугацаанд үнэгүй",
];

export function DownloadSection() {
  const meta = [DOWNLOAD.platform, DOWNLOAD.version && `Хувилбар ${DOWNLOAD.version}`, DOWNLOAD.size]
    .filter(Boolean)
    .join(" · ");

  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-brand-50 to-white py-20 sm:py-24"
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            id="download-title"
            align="left"
            eyebrow="Татаж авах"
            title="ClassPulse AI-г компьютертоо суулгаарай"
            description="Нэг удаа суулгаад л ангийнхаа камерын дүрсийг хянаж эхэлнэ. AI загвар таны компьютер дээр ажилладаг тул видео интернэтээр дамжихгүй."
          />

          <ul data-reveal className="mt-8 space-y-3.5">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/[0.07] sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
              <Activity className="size-7" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-slate-900">ClassPulse AI</h3>
              <p className="text-sm text-slate-600">{meta}</p>
            </div>
          </div>

          {downloadReady ? (
            <a
              href={DOWNLOAD.url}
              download
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm shadow-brand-600/25 transition-colors hover:bg-brand-700 active:bg-brand-800"
            >
              <Download
                className="size-5 transition-transform motion-safe:group-hover:translate-y-0.5"
                aria-hidden="true"
              />
              AI загвар татах
            </a>
          ) : (
            <>
              <button
                type="button"
                disabled
                className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-6 py-3.5 text-base font-semibold text-slate-600"
              >
                <Clock className="size-5" aria-hidden="true" />
                Тун удахгүй
              </button>
              <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                <Info className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                AI загварыг одоо эцэслэн бэлтгэж байна. Бэлэн болмогц энэ товч идэвхжиж, шууд татаж авах боломжтой
                болно.
              </p>
            </>
          )}

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h4 className="text-sm font-semibold text-slate-900">Системийн шаардлага</h4>
            <ul className="mt-3 space-y-2.5">
              {DOWNLOAD.requirements.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
