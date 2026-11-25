"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Phone } from "@/components/phone/Phone";
import { CreateScreen, DailyLookScreen, MakeItMineScreen, TryOnScreen, WardrobeScreen } from "@/components/phone/screens";
import { features, type FeatureKey } from "@/data/features";
import { ctaHref, ctaLabel } from "@/config/navigation";

function Screen({ k }: { k: FeatureKey }) {
  switch (k) {
    case "create":
      return <CreateScreen />;
    case "wardrobe":
      return <WardrobeScreen />;
    case "makeItMine":
      return <MakeItMineScreen />;
    case "tryOn":
      return <TryOnScreen />;
    case "dailyLook":
      return (
        <DailyLookScreen
          photo="/photos/person-after.webp"
          caption="Long coat, soft knit, tailored trousers. Sunny but crisp."
          weather="☀︎ 9° · Sunny, crisp"
          items={["coat-camel", "tee-white", "trousers-charcoal", "loafers-black"]}
        />
      );
  }
}

const blobs = ["bg-fox/20", "bg-[#c9b79c]/40", "bg-owned/20", "bg-fox/15", "bg-[#d8c7ad]/50"];

function FeatureRow({ f, i }: { f: (typeof features)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const flip = i % 2 === 1;

  return (
    <div ref={ref} className="grid items-center gap-10 py-14 sm:py-24 lg:grid-cols-2 lg:gap-20">
      <div className={flip ? "lg:order-2" : ""}>
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="font-display text-base normal-case italic tracking-normal text-ink-mute">0{i + 1}</span>
            {f.name}
          </p>
          <h3 className="display text-balance text-[2.4rem] sm:text-[3.4rem] lg:text-[3.8rem]">
            {f.title} <span className="italic text-fox-ink">{f.accent}</span>
          </h3>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{f.body}</p>
        </Reveal>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {f.points.map((p, j) => (
            <Reveal as="li" key={p} delay={0.08 * j}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 text-[15px] font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-fox" aria-hidden />
                {p}
              </span>
            </Reveal>
          ))}
        </ul>
        {i === 2 && (
          <Reveal delay={0.2} className="mt-9">
            <a href={ctaHref} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-night px-7 py-3.5 font-semibold text-on-night transition-transform hover:-translate-y-0.5">
              {ctaLabel} <span aria-hidden>→</span>
            </a>
          </Reveal>
        )}
      </div>

      <div className={`relative mx-auto w-full max-w-[420px] ${flip ? "lg:order-1" : ""}`}>
        <div aria-hidden className={`absolute left-1/2 top-1/2 aspect-square w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] ${blobs[i]}`} />
        <motion.div style={{ y }} className="relative mx-auto w-[min(62vw,270px)] sm:w-[300px]">
          <Reveal y={40}>
            <Phone label={f.screenLabel}>
              <Screen k={f.key} />
            </Phone>
          </Reveal>
          <Reveal delay={0.3} className={`absolute bottom-[12%] z-10 w-[62%] ${flip ? "-right-[18%] sm:-right-[30%]" : "-left-[18%] sm:-left-[30%]"}`}>
            <p className="rounded-2xl rounded-bl-md border border-line bg-paper/95 px-4 py-3 font-display text-[15px] italic leading-snug shadow-[var(--shadow-float)] backdrop-blur sm:text-[17px]">
              {f.note}
            </p>
          </Reveal>
        </motion.div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-y pb-0">
      <div className="container-brand">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">What FitFox does</p>
          <h2 id="features-title" className="display text-balance text-[2.6rem] sm:text-6xl">
            Open your wardrobe. <span className="italic">See possibilities.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            FitFox only works with clothes you actually own. That&rsquo;s the whole point.
          </p>
        </Reveal>
        <div className="divide-y divide-line-soft">
          {features.map((f, i) => (
            <FeatureRow key={f.key} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
