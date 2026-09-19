import type { ReactNode } from "react";

const WIDTHS = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
} as const;

interface ContainerProps {
  children: ReactNode;
  size?: keyof typeof WIDTHS;
  className?: string;
}

export function Container({ children, size = "default", className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${WIDTHS[size]} ${className}`}>{children}</div>;
}
