"use client";

import type { ReactNode, RefObject } from "react";
import { CameraOff, LoaderCircle, RefreshCw, ShieldAlert, Unplug, VideoOff, Webcam } from "lucide-react";
import type { CameraStatus } from "@/components/dashboard/useCamera";

type PromptContent = {
  icon: typeof Webcam;
  tone: "brand" | "rose" | "amber";
  title: string;
  text: string;
  action?: string;
};

const PROMPTS: Record<Exclude<CameraStatus, "live">, PromptContent> = {
  idle: {
    icon: Webcam,
    tone: "brand",
    title: "Камераа холбоно уу",
    text: "Ангийг бүхэлд нь харах камераа компьютерт холбоод доорх товчийг дарна уу. Хөтөч камер ашиглах зөвшөөрөл асууна.",
    action: "Камерт хандах зөвшөөрөл өгөх",
  },
  requesting: {
    icon: LoaderCircle,
    tone: "brand",
    title: "Зөвшөөрөл хүлээж байна…",
    text: "Хөтчийн гаргасан цонхноос «Зөвшөөрөх» (Allow) товчийг дарна уу.",
  },
  denied: {
    icon: ShieldAlert,
    tone: "rose",
    title: "Камерт хандах зөвшөөрөл олгогдоогүй",
    text: "Хаягийн мөрний зүүн талын түгжээ (эсвэл камер) дүрс дээр дарж камерыг «Зөвшөөрөх» болгоод дахин оролдоно уу.",
    action: "Дахин оролдох",
  },
  notfound: {
    icon: CameraOff,
    tone: "amber",
    title: "Камер олдсонгүй",
    text: "Камер компьютерт зөв холбогдсон эсэхийг шалгаад дахин оролдоно уу.",
    action: "Дахин оролдох",
  },
  busy: {
    icon: VideoOff,
    tone: "amber",
    title: "Камерыг өөр програм ашиглаж байна",
    text: "Zoom, Teams зэрэг камер ашиглаж буй програм эсвэл хөтчийн өөр табыг хаагаад дахин оролдоно уу.",
    action: "Дахин оролдох",
  },
  ended: {
    icon: Unplug,
    tone: "amber",
    title: "Камерын холболт тасарлаа",
    text: "Камер салгагдсан эсвэл унтарсан байна. Холболтоо шалгаад дахин асаана уу.",
    action: "Камер дахин асаах",
  },
  insecure: {
    icon: ShieldAlert,
    tone: "rose",
    title: "Аюулгүй холболт шаардлагатай",
    text: "Хөтөч камерыг зөвхөн HTTPS (эсвэл localhost) хаягаар нээсэн сайтад ашиглахыг зөвшөөрдөг.",
  },
  unsupported: {
    icon: CameraOff,
    tone: "rose",
    title: "Энэ хөтөч камер дэмжихгүй байна",
    text: "Chrome, Edge, Firefox эсвэл Safari-ийн сүүлийн хувилбарыг ашиглана уу.",
  },
  error: {
    icon: CameraOff,
    tone: "rose",
    title: "Камерыг асааж чадсангүй",
    text: "Түр зуурын алдаа гарлаа. Хуудсаа дахин ачаалаад оролдоно уу.",
    action: "Дахин оролдох",
  },
};

const TONES = {
  brand: "bg-brand-50 text-brand-600",
  rose: "bg-rose-50 text-rose-600",
  amber: "bg-amber-50 text-amber-600",
};

interface CameraStageProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  status: CameraStatus;
  size: { width: number; height: number } | null;
  onStart: () => void;
  aspectRatio: number;
  /** Суудлын зураглалын давхарга. */
  children: ReactNode;
}

export function CameraStage({ videoRef, status, size, onStart, aspectRatio, children }: CameraStageProps) {
  const live = status === "live";
  const prompt = status === "live" ? null : PROMPTS[status];
  const PromptIcon = prompt?.icon;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${
        live ? "bg-slate-950" : "min-h-80 border-2 border-dashed border-slate-300 bg-slate-50"
      }`}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        aria-label="Камерын шууд дүрс"
        className={`absolute inset-0 size-full object-fill ${live ? "" : "opacity-0"}`}
      />

      {!live ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:linear-gradient(var(--color-slate-200)_1px,transparent_1px),linear-gradient(90deg,var(--color-slate-200)_1px,transparent_1px)] [background-size:32px_32px] opacity-60"
        />
      ) : null}

      {children}

      {live ? (
        <>
          <span className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-2.5 py-1 text-xs font-bold tracking-wide text-white backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-rose-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-rose-500" />
            </span>
            ШУУД
          </span>
          {size ? (
            <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-slate-200 tabular-nums backdrop-blur">
              {size.width}×{size.height}
            </span>
          ) : null}
        </>
      ) : null}

      {prompt ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
          <div
            role="status"
            className="pointer-events-auto w-full max-w-sm rounded-2xl border border-slate-200 bg-white/95 p-6 text-center shadow-xl shadow-slate-900/10 backdrop-blur"
          >
            <span className={`mx-auto flex size-12 items-center justify-center rounded-xl ${TONES[prompt.tone]}`}>
              {PromptIcon ? (
                <PromptIcon
                  className={`size-6 ${status === "requesting" ? "motion-safe:animate-spin" : ""}`}
                  aria-hidden="true"
                />
              ) : null}
            </span>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{prompt.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{prompt.text}</p>
            {prompt.action ? (
              <button
                type="button"
                onClick={onStart}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700"
              >
                {status === "idle" ? (
                  <Webcam className="size-4" aria-hidden="true" />
                ) : (
                  <RefreshCw className="size-4" aria-hidden="true" />
                )}
                {prompt.action}
              </button>
            ) : null}
            {status === "idle" ? (
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Дүрс зөвхөн энэ хөтөч дотор харагдана — сервер рүү илгээгдэхгүй, бичигдэхгүй.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
