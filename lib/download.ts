/**
 * AI загвар татах товчнуудын тохиргоо.
 *
 * Zip файлуудыг camera-track репогийн `scripts/build_classpulse.py --out public/downloads`
 * үүсгэнэ. Zip-д зөвхөн програм ба суулгах скрипт байгаа тул жижиг: Python, AI сангууд,
 * YOLO26 загварыг анх суулгах үед интернэтээс татна.
 */
export type DownloadTarget = {
  os: "windows" | "macos";
  label: string;
  url: string;
  platform: string;
  requirements: readonly string[];
};

export const DOWNLOAD_VERSION = "0.1.0";

export const DOWNLOADS: readonly DownloadTarget[] = [
  {
    os: "windows",
    label: "Windows-д татах",
    url: "/downloads/ClassPulse-AI-Windows.zip",
    platform: "Windows 10 / 11 (64-bit)",
    requirements: ["Windows 10 эсвэл 11 (64-bit)", "8 GB RAM буюу түүнээс дээш"],
  },
  {
    os: "macos",
    label: "Mac-д татах",
    url: "/downloads/ClassPulse-AI-macOS.zip",
    platform: "macOS 14+ (Apple Silicon)",
    requirements: ["Apple Silicon (M1–M4) Mac, macOS 14 эсвэл шинэ", "8 GB RAM буюу түүнээс дээш"],
  },
];

export const COMMON_REQUIREMENTS = [
  "Ойролцоогоор 3 GB сул зай",
  "Ангийн камерын дүрс: вэб камер эсвэл хяналтын камерын програм",
  "Интернэт зөвхөн анх суулгахад хэрэгтэй",
];

/** Татах товчны доорх жижиг бичиг. */
export const downloadMeta = `Windows · macOS · Туршилтын хувилбар ${DOWNLOAD_VERSION}`;
