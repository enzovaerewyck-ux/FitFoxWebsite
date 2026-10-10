import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StyleDna } from "@/components/style-dna/StyleDna";
import { AiStylist } from "@/components/sections/AiStylist";
import { Wardrobe } from "@/components/wardrobe/Wardrobe";
import { MakeItMine } from "@/components/sections/MakeItMine";
import { SeeItOnYou } from "@/components/sections/SeeItOnYou";
import { StyleJourney } from "@/components/challenges/StyleJourney";
import { StyleQuests } from "@/components/challenges/StyleQuests";
import { FoxCompanion } from "@/components/sections/FoxCompanion";
import { Community } from "@/components/sections/Community";
import { BrandStory } from "@/components/sections/BrandStory";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <StyleDna />
        <AiStylist />
        <Wardrobe />
        <MakeItMine />
        <SeeItOnYou />
        <StyleJourney />
        <StyleQuests />
        <FoxCompanion />
        <Community />
        <BrandStory />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
