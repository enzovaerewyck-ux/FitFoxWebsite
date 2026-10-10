"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { FloatingTag } from "./FloatingTag";
import { motionTokens } from "@/config/tokens";
import { ctaHref } from "@/config/navigation";
import { brand } from "@/config/brand";
import { photos } from "@/data/garmentPhotos";

const heroLines = ["Not bad. I'd change the shoes.", "Good. Keep the coat."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const foxY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: motionTokens.duration.slow, ease: motionTokens.ease, delay },
  });

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden pt-[104px] pb-16 sm:pt-32 lg:pb-28">
      <div className="container-brand grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.p {...fade(0.05)} className="eyebrow mb-6">
            Your personal AI stylist
          </motion.p>
          <motion.h1 {...fade(0.12)} id="hero-title" className="display text-[3.4rem] sm:text-7xl lg:text-[4.6rem] xl:text-[5.1rem]">
            Full wardrobe.
            <br />
            <span className="italic">Nothing</span> to wear?
          </motion.h1>
          <motion.p {...fade(0.22)} className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft sm:text-xl">
            {brand.name} is the personal stylist in your pocket. It learns what you love, finds new outfits in the clothes you already own
            and tells you honestly when you don&rsquo;t need to buy a thing.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={ctaHref}>Get early access</Button>
            <Button href="#how-it-works" variant="secondary">
              See how it works
            </Button>
          </motion.div>
          <motion.p {...fade(0.38)} className="mt-7 flex items-center gap-2.5 text-sm text-ink-soft">
            <span className="inline-block h-[2px] w-6 bg-fox" aria-hidden />
            Now in private beta · Built around your style, not your demographic.
          </motion.p>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: motionTokens.ease, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[520px] lg:mr-0"
        >
          <div className="relative ml-[12%] overflow-hidden rounded-[var(--radius-2xl)] border border-line/60 shadow-card sm:ml-[14%]">
            <motion.div style={{ y: imgY }} className="relative aspect-[4/5] scale-[1.08]">
              <Image
                src={photos.hero}
                alt="A man checks his outfit in the bedroom mirror: camel coat, cream ribbed knit and charcoal pleated trousers"
                fill
                priority
                sizes="(min-width: 1024px) 460px, 88vw"
                className="object-cover object-[50%_20%]"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night/45 to-transparent" />
            <p className="absolute bottom-5 right-5 rounded-md bg-fox px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-on-night">
              Style of the day
            </p>
          </div>
          <p className="ml-[42%] mt-4 text-right font-display text-[15px] italic leading-snug text-ink-soft sm:ml-[46%]">
            Coat and knit: already his. {brand.name} just found the trousers.
          </p>

          {/* Floating UI */}
          <FloatingTag className="right-[-4px] top-[7%] sm:right-[-22px]" delay={0.7} label="Style DNA" value="Minimal 82%" meter={82} />
          <FloatingTag className="left-[2%] top-[34%] hidden sm:flex" delay={0.85} label="Date night" value="Under €200" />
          <FloatingTag className="right-[-4px] top-[33%] sm:right-[-30px] sm:top-auto sm:bottom-[26%]" delay={1} label="Already owned" value="White sneakers ✓" owned />

          {/* Fox inspecting the look */}
          <motion.div style={{ y: foxY }} className="absolute -bottom-6 -left-3 z-20 sm:-left-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...motionTokens.springSoft, delay: 0.9 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                className="absolute bottom-[99%] left-[40%] z-10 w-max max-w-[210px]"
              >
                <button
                  type="button"
                  onClick={() => setLine((l) => (l + 1) % heroLines.length)}
                  className="cursor-pointer text-left"
                  aria-label="Ask the fox for another opinion"
                >
                  <FoxBubble text={heroLines[line]} tail="bottom-left" size="sm" />
                </button>
              </motion.div>
              <Fox pose="cool" idle priority reactKey={line === 0 ? undefined : line} className="w-[124px] sm:w-[170px]" sizes="170px" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
