import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { LOGIN_HREF } from "@/lib/site";

interface CtaLinkProps {
  href?: string;
  children?: ReactNode;
  size?: "md" | "lg";
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
}

export function CtaLink({
  href = LOGIN_HREF,
  children = "Нэвтрэх",
  size = "md",
  withArrow = false,
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
      {children}
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}
