import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Occasions } from "@/components/sections/Occasions";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Stylist } from "@/components/sections/Stylist";
import { Extras } from "@/components/sections/Extras";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/ui/FloatingCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Occasions />
        <Problem />
        <HowItWorks />
        <Features />
        <Stylist />
        <Extras />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
