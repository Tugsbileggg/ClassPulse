// Open Graph зураг (app/opengraph-image.png) үүсгэх нэг удаагийн скрипт.
// Ажиллуулах: node scripts/generate-og-image.mjs
// `sharp` нь Next.js-ийн хамт суудаг. Фонт нь системийн "Segoe UI" (Windows) эсвэл
// кирилл дэмждэг өөр sans-serif фонт байна.
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const W = 1200;
const H = 630;
const FONT = "'Segoe UI', 'Noto Sans', 'DejaVu Sans', sans-serif";

const seatColors = [
  ["#34d399", "#34d399", "#34d399", "#34d399", "#34d399", "#fbbf24"],
  ["#34d399", "#34d399", "#a78bfa", "#34d399", "#34d399", "#34d399"],
  ["#34d399", "#f43f5e", "#34d399", "#34d399", "#34d399", "empty"],
  ["#fbbf24", "#34d399", "#34d399", "#34d399", "#34d399", "#34d399"],
  ["#34d399", "#34d399", "empty", "#34d399", "#34d399", "#34d399"],
];

function seats(x0, y0) {
  const seatW = 38;
  const seatH = 20;
  const gap = 6;
  const deskGap = 20;
  let out = "";
  seatColors.forEach((row, r) => {
    row.forEach((color, i) => {
      const desk = Math.floor(i / 2);
      const x = x0 + i * (seatW + gap) + desk * deskGap;
      const y = y0 + r * (seatH + 14);
      out +=
        color === "empty"
          ? `<rect x="${x}" y="${y}" width="${seatW}" height="${seatH}" rx="5" fill="#fff" stroke="#cbd5e1" stroke-dasharray="4 3"/>`
          : `<rect x="${x}" y="${y}" width="${seatW}" height="${seatH}" rx="5" fill="${color}"/>`;
    });
  });
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
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.55"/>

  <!-- Лого -->
  <rect x="72" y="68" width="56" height="56" rx="14" fill="#2657e6"/>
  <path d="M117 96h-7l-5 15-11-30-5 15h-8" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="144" y="109" font-family="${FONT}" font-size="38" font-weight="800" fill="#0f172a">Class<tspan fill="#2657e6">Pulse</tspan></text>

  <!-- Гарчиг -->
  <text font-family="${FONT}" font-size="54" font-weight="800" fill="#0f172a">
    <tspan x="72" y="236">Ангийнхаа оролцоог</tspan>
    <tspan x="72" y="304" fill="#2657e6">нэг харцаар</tspan>
    <tspan x="72" y="372">мэдээрэй</tspan>
  </text>
  <text x="72" y="444" font-family="${FONT}" font-size="27" fill="#475569">Багш нарт зориулсан AI туслах —</text>
  <text x="72" y="482" font-family="${FONT}" font-size="27" fill="#475569">видео сервер рүү явдаггүй, нүүр танихгүй.</text>

  <rect x="72" y="522" width="334" height="44" rx="22" fill="#ffffff" stroke="#dce8fe"/>
  <circle cx="98" cy="544" r="6" fill="#10b981"/>
  <text x="114" y="552" font-family="${FONT}" font-size="21" font-weight="600" fill="#1f39a5">Бүртгүүлээд шууд эхлээрэй</text>

  <!-- Самбарын карт -->
  <g filter="url(#shadow)">
    <rect x="712" y="96" width="420" height="440" rx="24" fill="#ffffff" stroke="#e2e8f0"/>
  </g>
  <text x="744" y="148" font-family="${FONT}" font-size="22" font-weight="700" fill="#1e293b">7Б анги · Математик</text>
  <rect x="990" y="124" width="112" height="34" rx="17" fill="#ecfdf5"/>
  <circle cx="1010" cy="141" r="5" fill="#10b981"/>
  <text x="1024" y="148" font-family="${FONT}" font-size="18" font-weight="700" fill="#047857">Шууд</text>

  <text x="744" y="206" font-family="${FONT}" font-size="17" fill="#64748b">Ангийн оролцоо</text>
  <text x="744" y="252" font-family="${FONT}" font-size="46" font-weight="800" fill="#0f172a">86%</text>
  <text x="900" y="206" font-family="${FONT}" font-size="17" fill="#64748b">Суудалдаа</text>
  <text x="900" y="252" font-family="${FONT}" font-size="46" font-weight="800" fill="#0f172a">28<tspan font-size="24" fill="#64748b">/30</tspan></text>

  <rect x="744" y="282" width="356" height="24" rx="6" fill="#e2e8f0"/>
  <text x="922" y="299" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="#475569" letter-spacing="2">АНГИЙН САМБАР</text>
  ${seats(773, 330)}
</svg>`;

const out = fileURLToPath(new URL("../app/opengraph-image.png", import.meta.url));
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log("✓", out);
