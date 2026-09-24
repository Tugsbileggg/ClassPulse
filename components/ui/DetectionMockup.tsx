import { Moon, Smartphone } from "lucide-react";
import Image from "next/image";
import cameraDetection from "@/public/images/hero-camera-detection.webp";
import sleepDetail from "@/public/images/hero-detail-sleep.webp";
import phoneDetail from "@/public/images/hero-detail-phone.webp";

const DETAILS = [
  {
    src: sleepDetail,
    tone: "amber" as const,
    icon: Moon,
    label: "Нойрмоглож байна",
    alt: "Ойртуулсан зураг: сурагч ширээндээ толгойгоо тавьж унтаж байгааг AI илрүүлэв",
  },
  {
    src: phoneDetail,
    tone: "rose" as const,
    icon: Smartphone,
    label: "Утсаар тоглож",
    alt: "Ойртуулсан зураг: сурагч хичээлийн үеэр гар утсаа ашиглаж байгааг AI илрүүлэв",
  },
];

/** Hero хэсгийн жишээ зураг — камерын дүрс болон AI-н илрүүлсэн хоёр агшны ойртуулсан зураг. */
export function DetectionMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl select-none lg:max-w-none">
      {/* lg дээр Hero-ийн өнгөт самбар энэ гэрэлтэлтийг орлоно. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-200/60 via-brand-50 to-emerald-100/70 blur-2xl lg:hidden"
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-brand-900/10">
        <Image
          src={cameraDetection}
          alt="Ангийн камерын дүрс дээр ClassPulse AI утсаа оролдож буй болон нойрмоглож буй сурагчдыг өнгөт хүрээгээр тэмдэглэсэн нь"
          className="h-auto w-full"
          placeholder="blur"
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {DETAILS.map(({ src, tone, icon: Icon, label, alt }) => {
          const ring = tone === "rose" ? "ring-rose-500/40" : "ring-amber-400/40";
          const chip = tone === "rose" ? "bg-rose-600 text-white" : "bg-amber-400 text-slate-900";
          return (
            <div
              key={label}
              className={`overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-lg shadow-slate-900/10 ring-2 ${ring}`}
            >
              <div className="relative">
                <Image src={src} alt={alt} className="h-auto w-full" sizes="(min-width: 1024px) 19vw, 44vw" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-2">
                <span className={`flex size-5 shrink-0 items-center justify-center rounded-full ${chip}`}>
                  <Icon className="size-3" aria-hidden="true" />
                </span>
                <span className="truncate text-xs font-semibold whitespace-nowrap text-slate-800 sm:text-sm">
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
