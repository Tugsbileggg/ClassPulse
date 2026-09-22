// Open Graph зураг (app/opengraph-image.png) үүсгэх нэг удаагийн скрипт.
// Ажиллуулах: node scripts/generate-og-image.mjs
// `sharp` нь Next.js-ийн хамт суудаг. Фонт нь системийн "Segoe UI" (Windows) эсвэл
// кирилл дэмждэг өөр sans-serif фонт байна.
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const W = 1200;
const H = 630;
const FONT = "'Segoe UI', 'Noto Sans', 'DejaVu Sans', sans-serif";

// Програмын цонх доторх ангийн хялбаршуулсан дүрс (x0, y0 — дүрсийн зүүн дээд булан).
const FEED = { x: 712, y: 150, w: 420, h: 236 };
const ROWS = [
  { y: 0.42, s: 0.55 },
  { y: 0.66, s: 0.75 },
  { y: 0.95, s: 1 },
];
const SHIRTS = ["#93bbfb", "#c0d6fd", "#6197f7", "#cbd5e1", "#a5b4fc", "#bae6fd"];

function student(cx, deskY, s, i, pose) {
  const shirt = SHIRTS[(i * 5) % SHIRTS.length];
  if (pose === "sleep") {
    return `<rect x="${cx - 18 * s}" y="${deskY - 18 * s}" width="${36 * s}" height="${22 * s}" rx="${11 * s}" fill="#6d8fd8"/>
      <ellipse cx="${cx}" cy="${deskY - 10 * s}" rx="${11 * s}" ry="${9 * s}" fill="#2b2118"/>`;
  }
  const headY = deskY - (pose === "phone" ? 32 : 36) * s;
  return `<rect x="${cx - 18 * s}" y="${deskY - 26 * s}" width="${36 * s}" height="${30 * s}" rx="${13 * s}" fill="${shirt}"/>
    <circle cx="${cx}" cy="${headY}" r="${11 * s}" fill="#2b2118"/>
    <ellipse cx="${cx}" cy="${headY + 2 * s}" rx="${9.5 * s}" ry="${9 * s}" fill="#eabf98"/>
    ${pose === "phone" ? `<rect x="${cx - 4 * s}" y="${deskY - 11 * s}" width="${8 * s}" height="${11 * s}" rx="${1.5 * s}" fill="#0f172a"/><rect x="${cx - 3 * s}" y="${deskY - 10 * s}" width="${6 * s}" height="${8.5 * s}" fill="#7dd3fc"/>` : ""}`;
}

function scene() {
  let out = "";
  let i = 0;
  const boxes = [];
  ROWS.forEach((row, r) => {
    const deskY = FEED.y + FEED.h * row.y - 8 * row.s;
    [0, 1, 2].forEach((d) => {
      const deskX = FEED.x + FEED.w / 2 + (d - 1) * 135 * row.s;
      [-1, 1].forEach((side) => {
        const cx = deskX + side * 24 * row.s;
        const pose = r === 0 && d === 0 && side === -1 ? "phone" : r === 1 && d === 2 && side === 1 ? "sleep" : "normal";
        out += student(cx, deskY, row.s, i++, pose);
        if (pose !== "normal") boxes.push({ cx, deskY, s: row.s, pose });
      });
      out += `<rect x="${deskX - 50 * row.s}" y="${deskY}" width="${100 * row.s}" height="${14 * row.s}" rx="${2 * row.s}" fill="#b28b62"/>`;
    });
  });

  for (const b of boxes) {
    const phone = b.pose === "phone";
    const x = b.cx - 22 * b.s;
    const y = b.deskY - (phone ? 50 : 24) * b.s;
    const w = 44 * b.s;
    const h = (phone ? 54 : 30) * b.s;
    const color = phone ? "#e11d48" : "#fbbf24";
    const label = phone ? "Утас" : "Нойрмоглож байна";
    const lw = phone ? 58 : 142;
    const lx = phone ? x - 2 : x + w + 2 - lw;
    out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-width="3"/>
      <rect x="${lx}" y="${y - 26}" width="${lw}" height="22" rx="5" fill="${color}"/>
      <text x="${lx + lw / 2}" y="${y - 10}" text-anchor="middle" font-family="${FONT}" font-size="14" font-weight="700" fill="${phone ? "#fff" : "#0f172a"}">${label}</text>`;
  }
  return out;
}

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#eff5ff"/>
      <stop offset="1" stop-color="#ffffff"/>
    </linearGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#c0d6fd"/>
    </pattern>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#1f3582" flood-opacity="0.14"/>
    </filter>
    <clipPath id="feed"><rect x="${FEED.x}" y="${FEED.y}" width="${FEED.w}" height="${FEED.h}"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.55"/>

  <!-- Лого -->
  <rect x="72" y="68" width="56" height="56" rx="14" fill="#2657e6"/>
  <path d="M117 96h-7l-5 15-11-30-5 15h-8" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="144" y="109" font-family="${FONT}" font-size="38" font-weight="800" fill="#0f172a">Class<tspan fill="#2657e6">Pulse</tspan> <tspan font-weight="600" fill="#475569">AI</tspan></text>

  <!-- Гарчиг -->
  <text font-family="${FONT}" font-size="50" font-weight="800" fill="#0f172a">
    <tspan x="72" y="226">Унтаж, утсаа</tspan>
    <tspan x="72" y="290">оролдож буй сурагчийг</tspan>
    <tspan x="72" y="354" fill="#2657e6">AI шууд анзаарна</tspan>
  </text>
  <text x="72" y="424" font-family="${FONT}" font-size="26" fill="#475569">Компьютер дээрээ ажилладаг AI туслах —</text>
  <text x="72" y="460" font-family="${FONT}" font-size="26" fill="#475569">видео хаашаа ч илгээгдэхгүй, нүүр танихгүй.</text>

  <rect x="72" y="504" width="300" height="46" rx="23" fill="#2657e6"/>
  <path d="M100 516v14m-6-6 6 6 6-6m-12 10h12" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="122" y="534" font-family="${FONT}" font-size="21" font-weight="700" fill="#ffffff">AI загвар тун удахгүй</text>

  <!-- Програмын цонх -->
  <g filter="url(#shadow)">
    <rect x="${FEED.x}" y="96" width="${FEED.w}" height="354" rx="20" fill="#ffffff" stroke="#e2e8f0"/>
  </g>
  <circle cx="${FEED.x + 26}" cy="123" r="6" fill="#cbd5e1"/>
  <circle cx="${FEED.x + 44}" cy="123" r="6" fill="#cbd5e1"/>
  <circle cx="${FEED.x + 62}" cy="123" r="6" fill="#cbd5e1"/>
  <text x="${FEED.x + 82}" y="130" font-family="${FONT}" font-size="19" font-weight="700" fill="#1e293b">ClassPulse AI</text>
  <rect x="${FEED.x + FEED.w - 142}" y="108" width="126" height="30" rx="15" fill="#ecfdf5"/>
  <circle cx="${FEED.x + FEED.w - 124}" cy="123" r="5" fill="#10b981"/>
  <text x="${FEED.x + FEED.w - 112}" y="129" font-family="${FONT}" font-size="15" font-weight="700" fill="#047857">Хянаж байна</text>

  <g clip-path="url(#feed)">
    <rect x="${FEED.x}" y="${FEED.y}" width="${FEED.w}" height="${FEED.h}" fill="#dbe3ee"/>
    <rect x="${FEED.x}" y="${FEED.y}" width="${FEED.w}" height="${FEED.h * 0.3}" fill="#eef2f7"/>
    ${scene()}
  </g>

  <circle cx="${FEED.x + 26}" cy="${FEED.y + FEED.h + 32}" r="6" fill="#f43f5e"/>
  <text x="${FEED.x + 40}" y="${FEED.y + FEED.h + 38}" font-family="${FONT}" font-size="16" fill="#475569">Утас 1</text>
  <circle cx="${FEED.x + 118}" cy="${FEED.y + FEED.h + 32}" r="6" fill="#f59e0b"/>
  <text x="${FEED.x + 132}" y="${FEED.y + FEED.h + 38}" font-family="${FONT}" font-size="16" fill="#475569">Нойрмоглолт 1</text>

  <!-- Мэдэгдэл -->
  <g filter="url(#shadow)">
    <rect x="640" y="476" width="492" height="84" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
  </g>
  <rect x="658" y="494" width="46" height="46" rx="10" fill="#fff1f2"/>
  <rect x="673" y="504" width="16" height="26" rx="3" fill="none" stroke="#e11d48" stroke-width="2.6"/>
  <text x="720" y="510" font-family="${FONT}" font-size="14" fill="#64748b">ClassPulse AI · дөнгөж сая</text>
  <text x="720" y="538" font-family="${FONT}" font-size="18" font-weight="700" fill="#0f172a">Арын эгнээнд сурагч утсаа оролдож байна</text>
</svg>`;

const out = fileURLToPath(new URL("../app/opengraph-image.png", import.meta.url));
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log("✓", out);
