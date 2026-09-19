"use client";

import { useCallback, useEffect, useId, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CircleAlert, LoaderCircle } from "lucide-react";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { FormField } from "@/components/ui/FormField";
import {
  LIMITS,
  LOGIN_FIELDS,
  REGISTER_FIELDS,
  normalizeLogin,
  normalizeRegister,
  validateLoginField,
  validateRegisterField,
  type ApiResult,
  type RegisterInput,
} from "@/lib/validation";

export type AuthMode = "login" | "register";
type Values = RegisterInput;
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { name: "", email: "", school: "", password: "" };

const TABS: { mode: AuthMode; label: string }[] = [
  { mode: "login", label: "Нэвтрэх" },
  { mode: "register", label: "Бүртгүүлэх" },
];

interface AuthFormProps {
  initialMode?: AuthMode;
  /**
   * Landing хуудсанд: `#login` / `#register` холбоос дарахад таб солигдох,
   * аль хэдийн нэвтэрсэн бол самбар руу орох холбоос харуулах.
   */
  onLandingPage?: boolean;
}

export function AuthForm({ initialMode = "login", onLandingPage = false }: AuthFormProps) {
  const uid = useId();
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [pending, setPending] = useState(false);
  const [signedInAs, setSignedInAs] = useState<string | null>(null);

  const isRegister = mode === "register";
  const fields: readonly Field[] = isRegister ? REGISTER_FIELDS : LOGIN_FIELDS;
  const fieldId = (field: string) => `${uid}-${field}`;

  const switchMode = useCallback((next: AuthMode) => {
    setMode(next);
    setErrors({});
    setFormError("");
    setDuplicate(false);
  }, []);

  useEffect(() => {
    if (!onLandingPage) return;

    const fromHash = () => {
      if (window.location.hash === "#register") switchMode("register");
      else if (window.location.hash === "#login") switchMode("login");
    };
    // Ижил hash-тай холбоосыг дахин дарахад hashchange гарахгүй тул click-ийг бас сонсоно.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href="#register"], a[href="#login"]');
      if (link) switchMode(link.getAttribute("href") === "#register" ? "register" : "login");
    };

    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);

    const controller = new AbortController();
    fetch("/api/auth/session", { signal: controller.signal })
      .then((response) => response.json() as Promise<{ user: { name: string } | null }>)
      .then((data) => setSignedInAs(data.user?.name ?? null))
      .catch(() => {});

    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
      controller.abort();
    };
  }, [onLandingPage, switchMode]);

  const validateField = (field: Field, next: Values) =>
    isRegister
      ? validateRegisterField(field, normalizeRegister(next))
      : validateLoginField(field as "email" | "password", normalizeLogin(next));

  const onChange = (field: Field) => (value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) setErrors((current) => ({ ...current, [field]: validateField(field, next) }));
  };

  const onBlur = (field: Field) => () => {
    // Хоосон талбараас гарахад шууд алдаа харуулахгүй — илгээх үед шалгана.
    if (!values[field].trim()) return;
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }));
  };

  const focusFirstError = (fieldErrors: Errors) => {
    const first = fields.find((field) => fieldErrors[field]);
    if (first) document.getElementById(fieldId(first))?.focus();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const fieldErrors: Errors = {};
    for (const field of fields) {
      const message = validateField(field, values);
      if (message) fieldErrors[field] = message;
    }
    setFormError("");
    setDuplicate(false);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      focusFirstError(fieldErrors);
      return;
    }

    setPending(true);
    try {
      const payload = isRegister ? normalizeRegister(values) : normalizeLogin(values);
      const response = await fetch(isRegister ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as ApiResult | null;

      if (response.ok && data?.ok) {
        // Товчийг идэвхгүй хэвээр үлдээж, шинэ сесстэйгээр самбарыг серверээс авна.
        router.replace("/dashboard");
        router.refresh();
        return;
      }

      setPending(false);
      if (data && !data.ok && data.errors && Object.keys(data.errors).length > 0) {
        setErrors(data.errors as Errors);
        setDuplicate(response.status === 409);
        focusFirstError(data.errors as Errors);
        return;
      }
      setFormError(
        (data && !data.ok && data.message) || "Түр зуурын алдаа гарлаа. Хэсэг хугацааны дараа дахин оролдоно уу.",
      );
    } catch {
      setPending(false);
      setFormError("Сүлжээний алдаа гарлаа. Интернэт холболтоо шалгаад дахин оролдоно уу.");
    }
  }

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = mode === "login" ? "register" : "login";
    switchMode(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  if (signedInAs) {
    return (
      <div className="py-6 text-center">
        <p className="text-lg font-bold text-slate-900">Сайн байна уу, {signedInAs}!</p>
        <p className="mt-2 text-slate-600">Та аль хэдийн нэвтэрсэн байна.</p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm shadow-brand-600/25 hover:bg-brand-700"
        >
          Самбар руу орох
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div role="tablist" aria-label="Нэвтрэх эсвэл бүртгүүлэх" className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
        {TABS.map((tab) => {
          const selected = tab.mode === mode;
          return (
            <button
              key={tab.mode}
              id={`${uid}-tab-${tab.mode}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => switchMode(tab.mode)}
              onKeyDown={onTabKeyDown}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                selected ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <form
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${mode}`}
        onSubmit={onSubmit}
        noValidate
        className="mt-6 space-y-5"
      >
        {isRegister ? (
          <FormField id={fieldId("name")} label="Нэр" error={errors.name}>
            {(props) => (
              <input
                {...props}
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={LIMITS.name}
                placeholder="Б. Сарангэрэл"
                value={values.name}
                onChange={(event) => onChange("name")(event.target.value)}
                onBlur={onBlur("name")}
              />
            )}
          </FormField>
        ) : null}

        <FormField id={fieldId("email")} label="И-мэйл" error={errors.email}>
          {(props) => (
            <input
              {...props}
              name="email"
              type="email"
              inputMode="email"
              autoComplete={isRegister ? "email" : "username"}
              autoCapitalize="none"
              spellCheck={false}
              required
              maxLength={LIMITS.email}
              placeholder="bagsh@school.mn"
              value={values.email}
              onChange={(event) => onChange("email")(event.target.value)}
              onBlur={onBlur("email")}
            />
          )}
        </FormField>

        {isRegister ? (
          <FormField id={fieldId("school")} label="Сургууль" optional error={errors.school}>
            {(props) => (
              <input
                {...props}
                name="school"
                type="text"
                autoComplete="organization"
                maxLength={LIMITS.school}
                placeholder="23-р сургууль"
                value={values.school}
                onChange={(event) => onChange("school")(event.target.value)}
                onBlur={onBlur("school")}
              />
            )}
          </FormField>
        ) : null}

        <FormField
          id={fieldId("password")}
          label="Нууц үг"
          hint={isRegister ? `Хамгийн багадаа ${LIMITS.passwordMin} тэмдэгт` : undefined}
          error={errors.password}
        >
          {(props) => (
            <PasswordInput
              {...props}
              name="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
              maxLength={LIMITS.passwordMax}
              value={values.password}
              onChange={(event) => onChange("password")(event.target.value)}
              onBlur={onBlur("password")}
            />
          )}
        </FormField>

        <div aria-live="assertive" className="empty:hidden">
          {formError ? (
            <p className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm font-medium text-rose-800">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {formError}
            </p>
          ) : null}
        </div>

        {duplicate ? (
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="w-full rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-100"
          >
            Энэ и-мэйлээр нэвтрэх
          </button>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm shadow-brand-600/25 transition-colors hover:bg-brand-700 active:bg-brand-800 disabled:cursor-wait disabled:opacity-80"
        >
          {pending ? (
            <>
              <LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden="true" />
              {isRegister ? "Бүртгэж байна…" : "Нэвтэрч байна…"}
            </>
          ) : isRegister ? (
            "Бүртгүүлэх"
          ) : (
            "Нэвтрэх"
          )}
        </button>

        <p className="text-center text-sm text-slate-600">
          {isRegister ? "Бүртгэлтэй юу?" : "Бүртгэлгүй юу?"}{" "}
          <button
            type="button"
            onClick={() => switchMode(isRegister ? "login" : "register")}
            className="font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            {isRegister ? "Нэвтрэх" : "Бүртгүүлэх"}
          </button>
        </p>
      </form>
    </div>
  );
}
