import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

export const inputBase =
  "block w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-sm shadow-slate-900/[0.03] transition-[border-color,box-shadow] placeholder:text-slate-400 focus:outline-none focus:ring-4";
const inputOk = "border-slate-300 hover:border-slate-400 focus:border-brand-500 focus:ring-brand-100";
const inputInvalid = "border-rose-500 focus:border-rose-500 focus:ring-rose-100";

export type ControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  className: string;
};

interface FormFieldProps {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: ControlProps) => ReactNode;
}

/** Label, тайлбар, алдааны мессежийг input-тэй aria-аар холбодог нийтлэг талбар. */
export function FormField({ id, label, optional, hint, error, className = "", children }: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
        {label}
        {optional ? <span className="font-normal text-slate-500"> (заавал биш)</span> : null}
      </label>
      {hint ? (
        <p id={hintId} className="mt-0.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
      <div className="mt-1.5">
        {children({
          id,
          "aria-invalid": Boolean(error),
          "aria-describedby": describedBy,
          className: `${inputBase} ${error ? inputInvalid : inputOk}`,
        })}
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-rose-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
