"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FlatLay } from "@/components/ui/FlatLay";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { baseOutfit } from "@/data/exampleLooks";
import { photos } from "@/data/garmentPhotos";

function Arrow({ delay }: { delay: number }) {
  return (
    <div className="flex items-center justify-center py-1 lg:py-0" aria-hidden>
      <motion.svg
        viewBox="0 0 48 16"
        className="h-4 w-12 rotate-90 text-fox lg:rotate-0"
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
      >
        <path d="M2 8h40M36 2l7 6-7 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </div>
  );
}

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="mt-4 flex items-baseline gap-2 text-sm font-semibold">
      <span className="font-display text-lg italic text-fox-ink">{n}</span>
      {children}
    </p>
  );
}

export function SeeItOnYou() {
  const look = Object.values(baseOutfit);
  return (
    <section aria-labelledby="tryon-title" className="section-y">
      <div className="container-brand">
        <SectionHeader
          id="tryon-title"
          eyebrow="See it on you"
          align="center"
          title={
            <>
              See it on you <span className="italic">before you buy it.</span>
            </>
          }
          intro="No more guessing how it'll look. Preview the complete outfit on your own photo and decide if it feels like you."
        />

        <div className="mx-auto mt-16 grid max-w-md items-center gap-4 lg:max-w-none lg:grid-cols-[1fr_auto_1fr_auto_1.25fr] lg:gap-5">
          <Reveal>
            <FlatLay items={look} backdrop="#eadfce" photo={photos.lookCamel} alt="Flat-lay of a camel coat, cream knit, charcoal trousers and black loafers" sizes="(min-width: 1024px) 300px, 448px" className="aspect-[4/5] rounded-[var(--radius-xl)] border border-line/70" />
            <Label n="1">The look</Label>
          </Reveal>
          <Arrow delay={0.3} />
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-line/70">
              <Image
                src={photos.personBefore}
                alt="A woman in a white t-shirt and jeans, leaning against a cream wall"
                fill
                sizes="(min-width: 1024px) 300px, 448px"
                className="object-cover object-[50%_45%]"
              />
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-semibold">
                Your photo
              </span>
            </div>
            <Label n="2">You</Label>
          </Reveal>
          <Arrow delay={0.5} />
          <Reveal delay={0.3} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-line/70 shadow-card">
              <Image
                src={photos.personAfter}
                alt="The same woman wearing the camel coat look: cream knit, charcoal trousers and black loafers"
                fill
                sizes="(min-width: 1024px) 34vw, 448px"
                className="object-cover object-[50%_45%]"
              />
              <motion.div
                aria-hidden
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                initial={{ x: "-120%" }}
                whileInView={{ x: "320%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 1.3, ease: "easeInOut" }}
              />
              <span className="absolute left-3 top-3 rounded-md bg-paper/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-fox-ink">
                Try-on preview
              </span>
            </div>
            <Label n="3">Your try-on</Label>
            <div className="pointer-events-none absolute -bottom-2 -right-2 flex items-end sm:-right-8">
              <FoxBubble text="Okay. That works." tail="right" size="sm" className="mb-16" />
              <Fox pose="cool" mirror className="w-[84px] sm:w-[104px]" decorative />
            </div>
          </Reveal>
        </div>

        <p className="mt-10 text-center text-sm text-ink-soft">
          Previews show the style, not an exact fit. Always check the size guide before you buy.
        </p>
      </div>
    </section>
  );
}
