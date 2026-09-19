# ClassPulse

Багш нарт зориулсан ангийн оролцооны AI туслах. Энэ repo нь:

- **Landing page** — бүтээгдэхүүний танилцуулга, нэвтрэх / бүртгүүлэх хэсэг
- **Нэвтрэлт** — и-мэйл + нууц үгээр бүртгүүлэх, нэвтрэх (D1 дээрх сесс)
- **Самбар (`/dashboard`)** — камерт хандах зөвшөөрөл авч шууд дүрсийг харуулах, дүрс дээр
  суудлын зураглал (суудал → сурагч) тохируулж хадгалах

Технологи: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, Cloudflare Workers
(`@opennextjs/cloudflare`), Cloudflare D1, `lucide-react`, Manrope фонт (кирилл + cyrillic-ext — Ө, Ү үсэгт шаардлагатай).

> **Pages биш, Workers.** `@opennextjs/cloudflare` нь Next.js-ийг Cloudflare **Workers** рүү
> (static файлуудыг Workers Assets-аар) deploy хийдэг. Dashboard дээр "Workers & Pages" хэсэгт харагдана.

## Нууцлал

- Камерын дүрс **зөвхөн хөтөч дотор** (`getUserMedia` → `<video>`) харагдана. Видео, зураг сервер рүү
  хэзээ ч илгээгдэхгүй.
- Сервер дээр зөвхөн ангийн нэр, суудлын байршил (дүрсийн 0–1 харьцаагаар) болон сурагчийн нэр хадгалагдана.
- Нууц үгийг PBKDF2-SHA256 (100 000 давталт, давсалсан)-аар hash хийж хадгална. Сессийн cookie нь
  `HttpOnly`, `SameSite=Lax`, production дээр `Secure`; DB-д токены SHA-256 hash л хадгалагдана.
- Бүх POST/PUT/DELETE API `Origin` header-ийг шалгаж, өөр сайтаас ирсэн хүсэлтийг татгалзана.

## Бүтэц

```
app/
  page.tsx                      landing (хэсгүүдийг угсарна)
  (auth)/login, (auth)/register нэвтрэх, бүртгүүлэх хуудас
  dashboard/page.tsx            самбар (нэвтрээгүй бол /login руу шилжүүлнэ)
  api/auth/{register,login,logout,session}/route.ts
  api/classrooms/route.ts       POST — анги үүсгэх
  api/classrooms/[id]/route.ts  PUT — хадгалах, DELETE — устгах
components/
  sections/                     landing-ийн хэсгүүд (Header, Hero, …, LoginSection, Faq, Footer)
  auth/                         AuthForm (нэвтрэх/бүртгүүлэх таб), PasswordInput
  dashboard/                    useCamera, CameraStage, SeatOverlay, SeatPanel, ClassroomWorkspace
  ui/                           нийтлэг жижиг компонентууд
lib/
  auth.ts                       нууц үг hash, сесс, getCurrentUser
  validation.ts                 client + server хоёулаа ашигладаг формын validation
  seats.ts                      суудлын өгөгдлийн төрөл, шалгалт
  db.ts, api.ts, site.ts
migrations/0001_init.sql        users, sessions, classrooms
wrangler.toml                   Worker + D1 binding (DB)
```

## Local дээр ажиллуулах

Node.js 20.9+ шаардлагатай.

```bash
npm install
npm run db:migrate:local   # local D1 (.wrangler/state) дээр хүснэгтүүд үүсгэнэ
npm run dev                # http://localhost:3000
```

`next dev` үед `initOpenNextCloudflareForDev()` (next.config.ts) D1 binding-ийг local SQLite-аар холбодог.
Камер нь зөвхөн `https://` эсвэл `localhost` хаягаар ажилладаг (хөтчийн шаардлага).

Бодит Workers runtime дээр туршиж үзэх:

```bash
npm run preview            # http://localhost:8787
```

Шалгах командууд: `npm run lint`, `npm run typecheck`, `npm run build`.

## Самбарыг ашиглах

1. Бүртгүүлэх эсвэл нэвтрэхэд `/dashboard` нээгдэнэ.
2. «Камерт хандах зөвшөөрөл өгөх» → хөтчийн асуултад «Зөвшөөрөх». Зөвшөөрөл өмнө нь олгосон бол камер
   автоматаар асна. Олон камертай бол доорх жагсаалтаас сонгоно.
3. «Суудал зурах» горимд дүрс дээр чирж суудал зурна → баруун талд сурагчийн нэрийг бичнэ.
   Суудлыг чирж зөөнө, ногоон булангаас нь чирж хэмжээг өөрчилнө.
   Гараар: сум — зөөх, Alt + сум — хэмжээ, Shift — том алхам, Delete — устгах.
4. «Хадгалах» (эсвэл Ctrl/⌘ + S). Нэг хэрэглэгч хэд хэдэн анги үүсгэж болно.

## Cloudflare руу deploy хийх

Анх удаа:

```bash
npx wrangler login
npx wrangler d1 create classpulse-db
```

Гарсан `database_id`-г `wrangler.toml` доторх `00000000-...` утгын оронд тавиад:

```bash
npm run db:migrate:remote  # production D1 дээр хүснэгтүүд үүсгэнэ
npm run deploy             # OpenNext build + Worker deploy
```

Дараагийн deploy-ууд: `npm run deploy` (шинэ migration нэмсэн бол эхлээд `npm run db:migrate:remote`).

- **Өөрийн домэйн:** Workers & Pages → `classpulse` → Settings → Domains & Routes → Custom domain.
  Домэйн өөр бол `lib/site.ts` доторх `SITE.url`-ийг солино.
- **Git-ээс автоматаар deploy:** Settings → Builds хэсэгт repo-гоо холбоод Build command
  `npx opennextjs-cloudflare build`, Deploy command `npx opennextjs-cloudflare deploy`.
- **Brute-force хамгаалалт:** Cloudflare dashboard → Security → WAF → Rate limiting rule-ээр
  `/api/auth/login` болон `/api/auth/register` замыг хязгаарлахыг зөвлөж байна.

Бүртгэлтэй хэрэглэгчдийг харах:

```bash
npx wrangler d1 execute classpulse-db --remote --command "SELECT id, name, email, school, created_at FROM users ORDER BY id DESC"
```

## Тэмдэглэл

- `wrangler.toml`-ийг зассаны дараа `npm run cf-typegen` ажиллуулж `cloudflare-env.d.ts`-ийг шинэчилнэ.
- OG зургийн текстийг өөрчилбөл `node scripts/generate-og-image.mjs` ажиллуулна.
- Нууц үг сэргээх (и-мэйл илгээх) боломж одоогоор байхгүй.
