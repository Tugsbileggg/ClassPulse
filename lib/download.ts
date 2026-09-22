/**
 * AI загвар татах товчны тохиргоо.
 *
 * Загвар deploy хийгдмэгц суулгах файлын холбоосыг `url`-д (эсвэл build хийх үед
 * `NEXT_PUBLIC_MODEL_DOWNLOAD_URL` орчны хувьсагчид) өгнө. Хоосон үед товч
 * «Тун удахгүй» төлөвт харагдана.
 */
export const DOWNLOAD = {
  url: process.env.NEXT_PUBLIC_MODEL_DOWNLOAD_URL ?? "",
  /** Жишээ нь "1.0.0". Хоосон бол харуулахгүй. */
  version: "",
  /** Жишээ нь "420 MB". Хоосон бол харуулахгүй. */
  size: "",
  platform: "Windows 10 / 11 (64-bit)",
  requirements: [
    "Windows 10 эсвэл 11 (64-bit)",
    "8 GB RAM буюу түүнээс дээш",
    "Ангийн камерын дүрс: вэб камер эсвэл хяналтын камерын програм",
    "Интернэт зөвхөн загварыг татахад хэрэгтэй",
  ],
} as const;

export const downloadReady = DOWNLOAD.url.length > 0;
