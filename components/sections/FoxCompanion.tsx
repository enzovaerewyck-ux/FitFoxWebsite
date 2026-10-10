"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { brand } from "@/config/brand";

const traits = [
  "He notices you've worn black four days in a row.",
  "He learns what you love, and what you'll never wear.",
  "He remembers every piece in your wardrobe.",
  "He nudges you out of your comfort zone. Gently.",
  "He tells you when you don't need to buy it.",
];

const bubbles = [
  { text: "Another black outfit?", pos: "left-0 top-[6%] sm:left-[2%]", tail: "bottom-right" as const },
  { text: "You already own this.", pos: "right-0 top-[18%] sm:right-[0%]", tail: "bottom-left" as const },
  { text: "Try the jacket.", pos: "left-[2%] bottom-[34%] sm:left-[6%]", tail: "right" as const },
  { text: "Good choice.", pos: "right-[4%] bottom-[22%]", tail: "left" as const },
];

export function FoxCompanion() {
  const [poke, setPoke] = useState(0);

  return (
    <section aria-labelledby="fox-title" className="section-y relative overflow-hidden bg-fox-soft">
      <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="container-brand relative grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Meet {brand.foxName}</p>
            <h2 id="fox-title" className="display text-balance text-[2.6rem] sm:text-6xl lg:text-[4.2rem]">
              Honest opinions. <span className="italic">Always on your side.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Think best friend with a stylist's eye. {brand.foxName} is a little cheeky, never mean, and always looking out for you.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-0 border-t border-ink/15">
            {traits.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.06} className="flex items-baseline gap-4 border-b border-ink/15 py-4">
                <span className="font-display text-sm italic text-fox-ink">0{i + 1}</span>
                <span className="font-display text-xl sm:text-2xl">{t}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="relative mx-auto aspect-square w-full max-w-[540px]">
          <div className="absolute inset-[12%] rounded-full bg-cream" aria-hidden />
          <div className="absolute inset-[12%] rounded-full border border-fox/30" aria-hidden />
          <button
            type="button"
            onClick={() => setPoke((p) => p + 1)}
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2"
            aria-label={`Poke ${brand.foxName}`}
          >
            <Fox pose="cool" idle reactKey={poke || undefined} className="w-[170px] sm:w-[220px]" />
          </button>
          {bubbles.map((b, i) => (
            <motion.div
              key={b.text}
              className={`absolute ${b.pos}`}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ delay: 0.4 + i * 0.35, type: "spring", stiffness: 260, damping: 18 }}
            >
              <FoxBubble text={b.text} tail={b.tail} size="md" tone={i === 0 ? "night" : "paper"} />
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
