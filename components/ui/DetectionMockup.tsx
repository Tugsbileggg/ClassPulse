import Image from "next/image";
import cameraDetection from "@/public/images/hero-camera-detection.webp";
import appMockup from "@/public/images/hero-app-mockup.png";

/** Hero хэсгийн жишээ зураг — ангийн камерын дүрс болон ClassPulse AI програмын дэлгэцийн агшин. */
export function DetectionMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl select-none pb-16 sm:pb-24 lg:max-w-none lg:pb-16">
      {/* lg дээр Hero-ийн өнгөт самбар энэ гэрэлтэлтийг орлоно. */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-200/60 via-brand-50 to-emerald-100/70 blur-2xl lg:hidden"
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-brand-900/10">
        <Image
          src={cameraDetection}
          alt="Ангийн камерын дүрс дээр ClassPulse AI утсаа оролдож буй болон нойрмоглож буй сурагчдыг өнгөт хүрээгээр тэмдэглэсэн нь"
          className="h-auto w-full"
          placeholder="blur"
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
        />
      </div>

      {/* Програмын дэлгэцийн жишээ — үндсэн зургийн дээр давхарлав */}
      <div className="absolute -bottom-2 left-4 w-56 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/15 sm:-bottom-6 sm:left-1/2 sm:w-72 sm:-translate-x-[62%] lg:bottom-0 lg:left-0 lg:w-72 lg:translate-x-0">
        <Image
          src={appMockup}
          alt="ClassPulse AI програмын дэлгэц: утас болон нойрмоглолт илрүүлсэн мэдэгдэл"
          className="h-auto w-full"
          placeholder="blur"
          sizes="(min-width: 1024px) 18rem, 14rem"
        />
      </div>
    </div>
  );
}
