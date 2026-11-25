"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

const moments = [
  { n: "01", t: "The same jeans. Again.", d: "They're safe. They're also all you've worn since March." },
  { n: "02", t: "That blazer you love.", d: "Still on the hanger, waiting for its big day." },
  { n: "03", t: "Date tonight. Twelve tries.", d: "And you end up back in the black T-shirt." },
  { n: "04", t: "Saw a great outfit on someone.", d: "No idea how to pull it off with what you own." },
  { n: "05", t: "Finally decided.", d: "Favourite shirt? In the wash." },
];

export function Problem() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-2, 2]);

  return (
    <section ref={ref} aria-labelledby="problem-title" className="section-y relative overflow-hidden">
      <div className="container-brand grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Sound familiar?</p>
            <h2 id="problem-title" className="display text-balance text-[2.6rem] sm:text-6xl lg:text-[4.3rem]">
              Same clothes. Same outfits. <span className="italic text-ink-soft">Every single week.</span>
            </h2>
          </Reveal>

          <ol className="mt-10 divide-y divide-line border-y border-line">
            {moments.map((m, i) => (
              <Reveal as="li" key={m.n} delay={0.05 * i}>
                <div className="group flex gap-5 py-5 sm:py-6">
                  <span className="pt-1 font-display text-sm italic text-fox-ink">{m.n}</span>
                  <p className="text-[17px] leading-snug sm:text-lg">
                    <span className="font-semibold">{m.t}</span> <span className="text-ink-soft">{m.d}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="relative mx-auto w-full max-w-[520px]">
          <div className="relative aspect-[920/1016]">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-fox/15 blur-[70px]" />
            <motion.div style={{ y, rotate }} className="relative h-full w-full">
              <Image
                src="/brand/wardrobe-foxes.webp"
                alt="An overflowing wardrobe with clothes piled on the floor, and five foxes peeking out and waving"
                fill
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-contain"
              />
            </motion.div>
          </div>
        </Reveal>
      </div>

      <Reveal className="container-brand mt-20 sm:mt-28">
        <p className="mx-auto max-w-4xl text-balance text-center font-display text-[2rem] leading-[1.1] sm:text-5xl">
          You don&rsquo;t need more clothes. You need to see{" "}
          <span className="italic text-fox-ink">what yours can do.</span>
        </p>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-ink-soft">Your wardrobe has more potential than you think.</p>
      </Reveal>
    </section>
  );
}
