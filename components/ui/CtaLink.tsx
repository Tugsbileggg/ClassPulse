import type { ReactNode } from "react";
import { Download } from "lucide-react";
import { DOWNLOAD_HREF } from "@/lib/site";

interface CtaLinkProps {
  href?: string;
  children?: ReactNode;
  size?: "md" | "lg";
  className?: string;
  onClick?: () => void;
}

/** Үндсэн CTA — «AI загвар татах» хэсэг рүү чиглэнэ. */
export function CtaLink({
  href = DOWNLOAD_HREF,
  children = "AI загвар татах",
  size = "md",
  className = "",
  onClick,
}: CtaLinkProps) {
  const sizing = size === "lg" ? "px-6 py-3.5 text-base" : "px-4 py-2.5 text-sm";

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl whitespace-nowrap bg-brand-600 font-semibold text-white shadow-sm shadow-brand-600/25 transition-colors hover:bg-brand-700 active:bg-brand-800 ${sizing} ${className}`}
    >
      <Download
        className={`${size === "lg" ? "size-5" : "size-4"} transition-transform motion-safe:group-hover:translate-y-0.5`}
        aria-hidden="true"
      />
      {children}
    </a>
  );
}
