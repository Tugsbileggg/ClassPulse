export const SITE = {
  name: "ClassPulse",
  // Production домэйн. Өөр домэйн ашиглавал энд солино (Open Graph URL-д ашиглагдана).
  url: "https://classpulse.mn",
  email: "hello@classpulse.mn",
  title: "ClassPulse AI — Унтаж, утсаа оролдож буй сурагчийг анзаарна",
  description:
    "ClassPulse AI-г компьютертоо татаж ажиллуулахад дэлгэцэн дээрх ангийн камерын дүрсийг шинжилж, унтаж эсвэл утсаа оролдож буй сурагчийг илрүүлмэгц багшид шууд мэдэгдэнэ. Бүх боловсруулалт таны компьютер дээр — видео хаашаа ч илгээгдэхгүй, нүүр танихгүй.",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Боломжууд" },
  { href: "#how-it-works", label: "Хэрхэн ажилладаг" },
  { href: "#notifications", label: "Мэдэгдэл" },
  { href: "#privacy", label: "Нууцлал" },
  { href: "#faq", label: "Түгээмэл асуулт" },
] as const;

export const DOWNLOAD_HREF = "#download";
