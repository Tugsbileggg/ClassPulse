# ClassPulse AI — Landing page

ClassPulse AI бол багшийн компьютер дээр ажилладаг AI програм. Дэлгэцэн дээр гарч буй ангийн камерын
дүрсийг (вэб камер эсвэл хяналтын камерын програм) шинжилж, **унтаж** эсвэл **утсаа оролдож** буй
сурагчийг илрүүлмэгц багшид мэдэгдэнэ. Энэ repo нь бүтээгдэхүүний **landing page** бөгөөд гол үйлдэл нь
«AI загвар татах» товч.

Технологи: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, Cloudflare Workers
(`@opennextjs/cloudflare`), `lucide-react`, Manrope фонт (кирилл + cyrillic-ext — Ө, Ү үсэгт шаардлагатай).
Өгөгдлийн сан, нэвтрэлт байхгүй — бүх хуудас static.

## AI загварын татах холбоосыг тохируулах

Бүх тохиргоо [`lib/download.ts`](lib/download.ts) дотор:

| Талбар         | Утга                                                                 |
| -------------- | -------------------------------------------------------------------- |
| `url`          | Суулгах файлын холбоос. Хоосон бол товч «Тун удахгүй» төлөвт харагдана |
| `version`      | Жишээ нь `1.0.0` (хоосон бол харуулахгүй)                            |
| `size`         | Жишээ нь `420 MB` (хоосон бол харуулахгүй)                           |
| `platform`     | Дэмжих үйлдлийн систем                                               |
| `requirements` | «Системийн шаардлага» жагсаалт                                       |

Холбоосыг кодоор биш орчны хувьсагчаар өгч болно (build хийх үед уншина):

```bash
NEXT_PUBLIC_MODEL_DOWNLOAD_URL=https://example.com/ClassPulseAI-Setup.exe npm run deploy
```

Холбоос өгөгдмөгц Hero-ийн тэмдэг «Windows-д зориулсан AI загвар гарлаа» болж, «Татаж авах» хэсгийн
товч шууд татдаг болно. Header болон Hero-ийн «AI загвар татах» товч үргэлж `#download` хэсэг рүү
чиглэнэ (системийн шаардлагыг харуулахын тулд).

## Бүтэц

```
app/
  layout.tsx            lang="mn", фонт, SEO metadata, Open Graph
  page.tsx              хэсгүүдийг дарааллаар нь угсарна
  globals.css           Tailwind theme, fade-in, скан анимаци, reduced-motion
  opengraph-image.png   OG зураг (scripts/generate-og-image.mjs)
components/
  sections/             Header, Hero, Problem, Features, HowItWorks, Notifications,
                        Privacy, Audience, DownloadSection, Faq, Footer
  ui/                   DetectionMockup (Hero-ийн жишээ зураг), CtaLink, Container, …
lib/
  download.ts           AI загвар татах товчны тохиргоо
  site.ts               домэйн, холбоо барих и-мэйл, навигаци
```

## Local дээр ажиллуулах

Node.js 20.9+ шаардлагатай.

```bash
npm install
npm run dev                # http://localhost:3000
```

Шалгах командууд: `npm run lint`, `npm run typecheck`, `npm run build`.
Бодит Workers runtime дээр туршиж үзэх: `npm run preview` (http://localhost:8787).

## Cloudflare руу deploy хийх

`@opennextjs/cloudflare` нь Cloudflare **Workers** рүү (static файлуудыг Workers Assets-аар) deploy хийдэг.
Dashboard дээр "Workers & Pages" хэсэгт харагдана.

```bash
npx wrangler login
npm run deploy
```

- **Өөрийн домэйн:** Workers & Pages → `classpulse` → Settings → Domains & Routes → Custom domain.
  Домэйн өөр бол `lib/site.ts` доторх `SITE.url`-ийг солино.
- **Git-ээс автоматаар deploy:** Settings → Builds хэсэгт repo-гоо холбоод Build command
  `npx opennextjs-cloudflare build`, Deploy command `npx opennextjs-cloudflare deploy`.
  Татах холбоосыг Settings → Variables хэсэгт `NEXT_PUBLIC_MODEL_DOWNLOAD_URL` болгон өгч болно.

## Тэмдэглэл

- `wrangler.toml`-ийг зассаны дараа `npm run cf-typegen` ажиллуулж `cloudflare-env.d.ts`-ийг шинэчилнэ.
- OG зургийн текстийг өөрчилбөл `node scripts/generate-og-image.mjs` ажиллуулна.
- Өмнөх хувилбарын нэвтрэлт, камерын самбар, суудлын зураглалын код git түүхэнд
  (`53bce62` commit) хадгалагдсан.
