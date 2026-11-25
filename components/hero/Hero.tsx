"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { brand } from "@/config/brand";
import { ctaHref, ctaLabel } from "@/config/navigation";
import { Phone } from "@/components/phone/Phone";
import { DailyLookScreen } from "@/components/phone/screens";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Garment cut-outs orbiting the phone, with parallax on scroll. */
const orbit = [
  { src: "coat-camel", cls: "left-[-34%] top-[10%] w-[44%] rotate-[-8deg]", depth: -60 },
  { src: "loafers-black", cls: "right-[-30%] bottom-[16%] w-[38%] rotate-[10deg]", depth: -110 },
  { src: "knit-cream", cls: "right-[-36%] top-[4%] w-[42%] rotate-[7deg]", depth: -30 },
  { src: "trousers-charcoal", cls: "left-[-30%] bottom-[6%] w-[34%] rotate-[-4deg]", depth: -90 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const k = reduce ? 0 : 1;
  const ys = [
    useTransform(scrollYProgress, [0, 1], [0, orbit[0].depth * k]),
    useTransform(scrollYProgress, [0, 1], [0, orbit[1].depth * k]),
    useTransform(scrollYProgress, [0, 1], [0, orbit[2].depth * k]),
    useTransform(scrollYProgress, [0, 1], [0, orbit[3].depth * k]),
  ];

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden pt-[104px] sm:pt-[128px]">
      {/* warm glow */}
      <div aria-hidden className="pointer-events-none absolute -right-[20%] top-[-10%] h-[70vw] max-h-[820px] w-[70vw] max-w-[820px] rounded-full bg-fox/15 blur-[110px]" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-60" />

      <div className="container-brand relative grid items-center gap-14 pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-28">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-fox-ink backdrop-blur lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-fox/60" />
              <span className="relative h-2 w-2 rounded-full bg-fox" />
            </span>
            Launching {brand.launch}
          </motion.p>

          <h1 id="hero-title" className="display mt-7 text-[3.05rem] leading-[0.98] sm:text-7xl lg:text-[5.6rem]">
            <Line delay={0.1}>A closet full</Line>
            <Line delay={0.2}>of clothes.</Line>
            <Line delay={0.3}>
              <span className="italic text-fox-ink">Nothing</span> to wear?
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mx-auto mt-7 max-w-[34rem] text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl lg:mx-0"
          >
            Your next favourite outfit is probably already hanging there. {brand.name} gets to know the clothes you own and shows you
            what they can really do.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href={ctaHref}
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-night px-8 text-[16px] font-semibold text-on-night shadow-[var(--shadow-float)] transition-transform hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto"
            >
              {ctaLabel}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-line bg-paper/70 px-8 text-[16px] font-semibold text-ink backdrop-blur transition-colors hover:border-ink/40 sm:w-auto"
            >
              See how it works
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-5 text-sm text-ink-mute"
          >
            Free to join · For every style, his and hers
          </motion.p>
        </div>

        {/* Phone + orbiting wardrobe */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease }}
          className="relative mx-auto w-[min(64vw,300px)] lg:w-[320px]"
        >
          <motion.div style={{ y: phoneY }} className="relative z-10">
            <Phone label="The FitFox Daily Look screen: today's outfit picked from your own wardrobe, with the weather and laundry taken into account">
              <DailyLookScreen />
            </Phone>
          </motion.div>
          {orbit.map((o, i) => (
            <motion.div
              key={o.src}
              style={{ y: ys[i] }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.8 + i * 0.12, ease }}
              className={`absolute ${o.cls} ${i % 2 ? "z-20" : "z-0"}`}
              aria-hidden
            >
              <div className={reduce ? "" : "animate-float"} style={{ animationDelay: `${i * 0.9}s` }}>
                <div className="relative aspect-square drop-shadow-[0_18px_22px_rgb(60_40_20/0.25)]">
                  <Image src={`/photos/cutout/${o.src}.webp`} alt="" fill sizes="160px" className="object-contain" priority={i < 2} />
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease }}
            className="absolute -left-[22%] top-[52%] z-30 hidden rounded-2xl border border-line bg-paper/95 px-4 py-3 shadow-[var(--shadow-float)] backdrop-blur sm:block"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fox-ink">Built from</p>
            <p className="font-display text-lg leading-tight">your own closet</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
