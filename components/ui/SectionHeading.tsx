import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div data-reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`text-sm font-semibold tracking-wide ${dark ? "text-brand-300" : "text-brand-700"}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-lg leading-relaxed text-pretty ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
