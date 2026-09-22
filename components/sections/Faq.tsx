import { ChevronDown, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

const FAQS = [
  {
    question: "AI загварыг хэзээ татаж авах боломжтой болох вэ?",
    answer:
      "AI загварыг одоо эцэслэн бэлтгэж байна. Бэлэн болмогц энэ хуудасны «AI загвар татах» товч идэвхжиж, шууд татаж суулгах боломжтой болно.",
  },
  {
    question: "Ямар камер хэрэгтэй вэ?",
    answer:
      "Тусгай камер шаардлагагүй. ClassPulse AI компьютерийн дэлгэцэн дээр гарч буй камерын дүрсийг уншдаг тул энгийн вэб камер, эсвэл сургуулийн хяналтын (CCTV) камерын програмаар харуулж буй дүрс ч тохирно. Ангийг бүхэлд нь харах өнцөгтэй, тод дүрс байхад илрүүлэлт илүү оновчтой болно.",
  },
  {
    question: "Ямар компьютер дээр ажиллах вэ?",
    answer:
      "ClassPulse AI-г Windows 10 болон 11 (64-bit) үйлдлийн системд зориулж бэлтгэж байна. Санах ой болон бусад шаардлагыг «Татаж авах» хэсгээс харна уу.",
  },
  {
    question: "Видео интернэтээр явах уу?",
    answer:
      "Үгүй. Дүрсийн шинжилгээ бүхэлдээ таны компьютер дээр явагддаг тул видео, зураг интернэтээр хаашаа ч илгээгдэхгүй, хадгалагдахгүй. Компьютер дээр зөвхөн мэдэгдлийн цаг, төрөл зэрэг товч тэмдэглэл үлдэнэ.",
  },
  {
    question: "Сурагчдын нүүрийг таньдаг уу?",
    answer:
      "Үгүй. ClassPulse AI хэн болохыг биш, юу болж байгааг л тодорхойлно: сурагч толгойгоо унжуулсан, ширээн дээр хэвтсэн эсвэл гартаа утас барьсан эсэх. Нүүр таних технологи ашиглахгүй, нүүрний өгөгдөл цуглуулахгүй.",
  },
  {
    question: "AI буруу илрүүлбэл яах вэ?",
    answer:
      "AI заримдаа алдаж болно. Тиймээс ClassPulse зөвхөн дохио өгдөг — юу хийхээ багш өөрөө шийднэ. Цаг харах, ном эргүүлэх зэрэг богино хөдөлгөөнийг мэдэгдэл болгохгүйн тулд үйлдэл хэдэн секунд үргэлжилсэн тохиолдолд л мэдэгдэнэ.",
  },
  {
    question: "Үнэ хэд вэ?",
    answer:
      "ClassPulse одоогоор туршилтын шатандаа байгаа бөгөөд энэ хугацаанд бүрэн үнэгүй. Албан ёсны үнийн нөхцөлийг багш нарын санал дээр үндэслэн тогтоож, урьдчилан ил тод мэдэгдэнэ.",
  },
  {
    question: "Эцэг эхчүүд энэ талаар мэдэх үү?",
    answer:
      "Тийм, заавал мэдэх ёстой. ClassPulse-ийг эцэг эх, асран хамгаалагчдад мэдэгдэлгүйгээр ямар ч ангид ашиглахгүй байхыг зөвлөнө. Ангид ашиглаж эхлэхээс өмнө сургуулийн удирдлагатай хамтран систем юу хийдэг, юуг хадгалдаггүйг эцэг эхчүүдэд танилцуулж, зөвшөөрөл авах журмыг хамтдаа тогтооно.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          id="faq-title"
          eyebrow="Түгээмэл асуулт"
          title="Танд асуулт байна уу?"
          description="Багш нар, сургуулийн удирдлагуудаас хамгийн их асуудаг асуултуудад хариуллаа."
        />

        <div data-reveal className="mt-12 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {FAQS.map(({ question, answer }) => (
            <details key={question} name="faq" className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left text-base font-semibold text-slate-900 transition-colors hover:text-brand-700 sm:px-6 sm:text-lg">
                <h3>{question}</h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 group-open:rotate-180 group-open:bg-brand-50 group-open:text-brand-700">
                  <ChevronDown className="size-5" aria-hidden="true" />
                </span>
              </summary>
              <p className="-mt-1 px-5 pb-6 leading-relaxed text-slate-600 sm:px-6">{answer}</p>
            </details>
          ))}
        </div>

        <p data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-slate-600">
          <Mail className="size-5 text-brand-600" aria-hidden="true" />
          Өөр асуулт байвал бидэнд бичээрэй:
          <a href={`mailto:${SITE.email}`} className="font-semibold text-brand-700 underline-offset-4 hover:underline">
            {SITE.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
