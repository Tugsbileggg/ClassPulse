import { ChevronDown, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";

const FAQS = [
  {
    question: "Ямар камер хэрэгтэй вэ?",
    answer:
      "Тусгай, үнэтэй камер шаардлагагүй. Ангийг бүхэлд нь харах өнцөгтэй, 1080p нягтралтай энгийн USB вэб камер хангалттай. Камерыг ангийн компьютерт холбож, Chrome эсвэл Edge зэрэг орчин үеийн хөтөч дээр ажиллуулна. Камераа холбосны дараа ClassPulse-д нэвтэрч, «Камерт хандах зөвшөөрөл өгөх» товчийг дарахад л дүрс шууд гарч ирнэ.",
  },
  {
    question: "Өгөгдөл хаана хадгалагдах вэ?",
    answer:
      "Камерын дүрс ангийн компьютерийн хөтөч дотор боловсруулагдаад шууд устдаг тул видео, зураг хэзээ ч сервер рүү илгээгдэхгүй. Сервер дээр зөвхөн сурагч бүрийн оролцооны хувь, мэдэгдлийн цаг зэрэг нэгтгэсэн тоон мэдээлэл хадгалагдана. Үүнийг зөвхөн тухайн ангийн багш болон сургуулийн эрх бүхий ажилтан харна.",
  },
  {
    question: "Сурагчдын нүүрийг таньдаг уу?",
    answer:
      "Үгүй. ClassPulse нүүр таних технологи ашигладаггүй, нүүрний өгөгдөл цуглуулдаггүй. Систем зөвхөн тухайн суудалд хүн байгаа эсэх, толгой нь унжсан эсэх, аль зүг рүү харж байгаа, гартаа утас барьсан эсэхийг л тодорхойлно. Сурагчийн нэр нь багшийн өөрөө тохируулсан суудлын зураглалаас гарна.",
  },
  {
    question: "Үнэ хэд вэ?",
    answer:
      "ClassPulse одоогоор туршилтын шатандаа байгаа бөгөөд энэ хугацаанд бүрэн үнэгүй. Албан ёсны үнийн нөхцөлийг багш нарын санал дээр үндэслэн тогтоож, урьдчилан ил тод мэдэгдэнэ.",
  },
  {
    question: "Хэзээ эхлэх вэ?",
    answer:
      "Одоо шууд эхэлж болно. Бүртгүүлээд нэвтэрмэгц камераа холбож, камерын дүрс дээр суудал бүрийг тэмдэглэн сурагчдынхаа нэрийг онооно. Суудлын зураглал таны бүртгэлд хадгалагдах тул дараагийн хичээлд дахин тохируулах шаардлагагүй.",
  },
  {
    question: "Эцэг эхчүүд энэ талаар мэдэх үү?",
    answer:
      "Тийм, заавал мэдэх ёстой. ClassPulse-ийг эцэг эх, асран хамгаалагчдад мэдэгдэлгүйгээр ямар ч ангид ашиглахгүй. Ангид ашиглаж эхлэхээс өмнө сургуулийн удирдлагатай хамтран систем юу хийдэг, ямар мэдээлэл хадгалдгийг эцэг эхчүүдэд танилцуулж, зөвшөөрөл авах журмыг хамтдаа тогтооно.",
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
