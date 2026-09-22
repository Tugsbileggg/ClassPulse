import { Audience } from "@/components/sections/Audience";
import { DownloadSection } from "@/components/sections/DownloadSection";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Notifications } from "@/components/sections/Notifications";
import { Privacy } from "@/components/sections/Privacy";
import { Problem } from "@/components/sections/Problem";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Үндсэн агуулга руу шилжих
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Notifications />
        <Privacy />
        <Audience />
        <DownloadSection />
        <Faq />
      </main>
      <Footer />
      <RevealOnScroll />
    </>
  );
}
