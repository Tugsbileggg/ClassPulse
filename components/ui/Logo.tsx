import { Activity } from "lucide-react";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm shadow-brand-600/30">
        <Activity className="size-5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className={`text-lg font-extrabold tracking-tight ${tone === "dark" ? "text-white" : "text-slate-900"}`}>
        Class<span className={tone === "dark" ? "text-brand-300" : "text-brand-600"}>Pulse</span>
      </span>
    </span>
  );
}
