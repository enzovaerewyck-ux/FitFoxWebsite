"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { styleTraits, styleSignals, signatureColors } from "@/data/styleDna";
import { motionTokens } from "@/config/tokens";

const defaultLine = "You're more predictable than you think.";

export function StyleDna() {
  const [active, setActive] = useState<string | null>(null);
  const trait = styleTraits.find((t) => t.id === active);

  return (
    <section id="style-dna" aria-labelledby="dna-title" className="section-y relative overflow-hidden">
      <div className="container-brand grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative">
          <Reveal>
            <p className="eyebrow mb-5">Style DNA</p>
            <h2 id="dna-title" className="display text-balance text-[2.6rem] sm:text-6xl lg:text-[4.4rem]">
              Your style isn&rsquo;t a <span className="italic">checkbox.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft sm:text-xl">
              Every look you save, skip or tweak teaches your stylist a little more about you. So the suggestions keep getting more&nbsp;<em>you</em>.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 hidden items-end gap-3 lg:flex">
            <Fox pose="cheer" tilt={trait ? -6 : 0} reactKey={active ?? undefined} className="w-[120px]" />
            <div className="mb-24">
              <FoxBubble text={trait?.foxLine ?? defaultLine} tail="bottom-left" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <article
            aria-label="Example Style DNA profile"
            className="relative rounded-[var(--radius-2xl)] border border-line bg-paper p-6 shadow-card sm:p-10"
          >
            <header className="flex items-start justify-between gap-4 border-b border-line-soft pb-6">
              <div>
                <p className="eyebrow">Your Style DNA</p>
                <p className="mt-2 font-display text-2xl italic sm:text-3xl">Quiet, sharp, slightly beige.</p>
              </div>
              <div className="flex -space-x-1.5 pt-1" aria-label="Signature colours">
                {signatureColors.map((col) => (
                  <span key={col} className="h-7 w-7 rounded-full border-2 border-paper" style={{ background: col }} />
                ))}
              </div>
            </header>

            <ul className="divide-y divide-line-soft">
              {styleTraits.map((t, i) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(t.id)}
                    onFocus={() => setActive(t.id)}
                    onMouseLeave={() => setActive(null)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(t.id)}
                    className="group grid w-full grid-cols-[1fr_auto] items-end gap-x-4 py-5 text-left"
                  >
                    <span className={`text-lg font-semibold transition-colors ${active === t.id ? "text-fox-ink" : ""}`}>{t.label}</span>
                    <span className="font-display text-4xl leading-none sm:text-5xl">
                      <Counter value={t.value} />
                      <span className="text-2xl text-ink-mute">%</span>
                    </span>
                    <span className="col-span-2 mt-3 block h-[3px] w-full overflow-hidden rounded-full bg-line-soft">
                      <motion.span
                        className={`block h-full rounded-full ${i === 0 ? "bg-fox" : "bg-ink"}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: motionTokens.ease, delay: 0.2 + i * 0.1 }}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line-soft pt-7">
              {styleSignals.map((s) => (
                <div key={s.id}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">{s.label}</dt>
                  <dd className="mt-2">
                    <span className="flex gap-1" aria-label={`${s.level} out of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span key={n} className={`h-2 flex-1 rounded-full ${n <= s.level ? "bg-fox" : "bg-line-soft"}`} />
                      ))}
                    </span>
                    <span className="mt-1.5 block text-sm text-ink-soft">{s.note}</span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Mobile fox */}
            <div className="mt-8 flex items-end gap-2 lg:hidden">
              <Fox pose="cheer" reactKey={active ?? undefined} className="w-[72px]" decorative />
              <div className="mb-10">
                <FoxBubble text={trait?.foxLine ?? defaultLine} tail="bottom-left" size="sm" />
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  return (
    <motion.span
      onViewportEnter={() => {
        const start = performance.now();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return setShown(value);
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1100);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }}
      viewport={{ once: true }}
    >
      <span aria-hidden>{shown}</span>
      <span className="sr-only">{value}</span>
    </motion.span>
  );
}
