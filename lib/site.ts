export const SITE = {
  name: "ClassPulse",
  // Production домэйн. Өөр домэйн ашиглавал энд солино (Open Graph URL-д ашиглагдана).
  url: "https://classpulse.mn",
  email: "hello@classpulse.mn",
  title: "ClassPulse — Ангийнхаа оролцоог нэг харцаар",
  description:
    "ClassPulse нь ангийн камерын дүрсийг хиймэл оюун ухаанаар боловсруулж, сурагч бүрийн хичээлийн оролцоог багшид шууд мэдэгдэж, өдрийн тайлан гаргадаг. Видео сервер рүү илгээгдэхгүй, нүүр танихгүй.",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Боломжууд" },
  { href: "#how-it-works", label: "Хэрхэн ажилладаг" },
  { href: "#privacy", label: "Нууцлал" },
  { href: "#faq", label: "Түгээмэл асуулт" },
] as const;

// Landing хуудасны нэвтрэх хэсэг рүү чиглэх холбоосууд (AuthForm табаа үүгээр солино).
export const LOGIN_HREF = "#login";
export const REGISTER_HREF = "#register";
