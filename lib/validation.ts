/**
 * Бүртгэл, нэвтрэлтийн формын validation — client (форм) болон server (route handler)
 * хоёулаа яг ижил дүрмээр шалгахын тулд нэг газар байрлуулсан.
 */

export const LIMITS = {
  name: 80,
  email: 254,
  school: 120,
  passwordMin: 8,
  passwordMax: 128,
} as const;

export type RegisterInput = {
  name: string;
  email: string;
  school: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/** Бүх auth API-ийн хариуны хэлбэр. */
export type ApiResult = { ok: true } | { ok: false; message?: string; errors?: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

// Нууц үгийг trim хийхгүй — хоосон зай ч нууц үгийн нэг хэсэг байж болно.
function raw(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function normalizeRegister(input: Record<string, unknown>): RegisterInput {
  return {
    name: text(input.name).replace(/\s+/g, " "),
    email: text(input.email).toLowerCase(),
    school: text(input.school).replace(/\s+/g, " "),
    password: raw(input.password),
  };
}

export function normalizeLogin(input: Record<string, unknown>): LoginInput {
  return { email: text(input.email).toLowerCase(), password: raw(input.password) };
}

function tooLong(max: number) {
  return `Хэт урт байна — ${max} тэмдэгтээс ихгүй байх ёстой.`;
}

function emailError(email: string) {
  if (!email) return "И-мэйл хаягаа оруулна уу.";
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) return "И-мэйл хаяг буруу байна. Жишээ нь: bagsh@school.mn";
}

export function validateRegisterField(field: keyof RegisterInput, input: RegisterInput): string | undefined {
  switch (field) {
    case "name":
      if (!input.name) return "Нэрээ оруулна уу.";
      if (input.name.length < 2) return "Нэрээ бүтнээр нь оруулна уу.";
      if (input.name.length > LIMITS.name) return tooLong(LIMITS.name);
      return;
    case "email":
      return emailError(input.email);
    case "school":
      if (input.school.length > LIMITS.school) return tooLong(LIMITS.school);
      return;
    case "password":
      if (!input.password) return "Нууц үгээ оруулна уу.";
      if (input.password.length < LIMITS.passwordMin)
        return `Нууц үг хамгийн багадаа ${LIMITS.passwordMin} тэмдэгттэй байна.`;
      if (input.password.length > LIMITS.passwordMax) return tooLong(LIMITS.passwordMax);
      return;
  }
}

export function validateLoginField(field: keyof LoginInput, input: LoginInput): string | undefined {
  if (field === "email") return emailError(input.email);
  if (!input.password) return "Нууц үгээ оруулна уу.";
  if (input.password.length > LIMITS.passwordMax) return tooLong(LIMITS.passwordMax);
}

export const REGISTER_FIELDS = ["name", "email", "school", "password"] as const;
export const LOGIN_FIELDS = ["email", "password"] as const;

export function validateRegister(input: RegisterInput): FieldErrors<RegisterInput> {
  const errors: FieldErrors<RegisterInput> = {};
  for (const field of REGISTER_FIELDS) {
    const message = validateRegisterField(field, input);
    if (message) errors[field] = message;
  }
  return errors;
}

export function validateLogin(input: LoginInput): FieldErrors<LoginInput> {
  const errors: FieldErrors<LoginInput> = {};
  for (const field of LOGIN_FIELDS) {
    const message = validateLoginField(field, input);
    if (message) errors[field] = message;
  }
  return errors;
}
