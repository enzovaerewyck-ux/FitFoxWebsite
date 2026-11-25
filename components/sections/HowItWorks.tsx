"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "1",
    title: "Upload your wardrobe",
    body: "Snap up to 40 pieces in one Quick Photo Session. FitFox recognises the category, colour, fit and season for you.",
    art: ["coat-camel", "jeans-blue", "sneakers-white"],
  },
  {
    n: "2",
    title: "Discover new outfits",
    body: "Pick an occasion, a mood or one piece you want to wear. Get combinations made from what you already own.",
    art: ["look-weekend"],
  },
  {
    n: "3",
    title: "Wear your own style",
    body: "Preview it on you, swap what you like and walk out the door feeling like yourself. Just sharper.",
    art: ["person-after"],
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y border-y border-line-soft bg-sand/55">
      <div className="container-brand">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-5">How it works</p>
          <h2 id="how-title" className="display text-balance text-[2.6rem] sm:text-6xl">
            Three steps. <span className="italic">No fashion degree required.</span>
          </h2>
        </Reveal>

        <ol className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {/* connecting line (desktop) */}
          <motion.span
            aria-hidden
            className="absolute left-[16%] right-[16%] top-[28px] hidden h-px origin-left bg-fox/40 md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={0.12 * i} className="relative">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-night font-display text-2xl italic text-on-night ring-8 ring-[#f3eee5]">
                {s.n}
              </span>
              <div className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-line bg-paper shadow-[var(--shadow-soft)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-linen/60">
                  {s.art.length > 1 ? (
                    <div className="absolute inset-0 grid grid-cols-3 gap-2 p-5">
                      {s.art.map((a, j) => (
                        <motion.div
                          key={a}
                          className="relative rounded-xl bg-paper shadow-sm"
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + j * 0.15, duration: 0.6 }}
                        >
                          <Image src={`/photos/cutout/${a}.webp`} alt="" fill sizes="120px" className="object-contain p-2" />
                          <span className="absolute inset-x-1.5 bottom-1.5 rounded-full bg-owned-soft py-0.5 text-center text-[9px] font-bold text-owned">✓ tagged</span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <Image
                      src={`/photos/${s.art[0]}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 92vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-display text-2xl sm:text-[1.7rem]">{s.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
