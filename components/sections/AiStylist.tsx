"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FlatLay } from "@/components/ui/FlatLay";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { examplePrompt, resultLooks, stylistChips } from "@/data/exampleLooks";

export function AiStylist() {
  const [selected, setSelected] = useState<string[]>(["Date night", "Use my wardrobe"]);
  const [round, setRound] = useState(1);
  const toggle = (c: string) => setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const looks = round % 2 ? resultLooks : [...resultLooks].reverse();

  return (
    <section aria-labelledby="stylist-title" className="section-y border-y border-line-soft bg-sand/60">
      <div className="container-brand">
        <SectionHeader
          id="stylist-title"
          eyebrow="AI styling studio"
          title={
            <>
              Tell your stylist where
              <br className="hidden sm:block" /> you&rsquo;re <span className="italic">going.</span>
            </>
          }
          intro="A first date, a wedding, Monday morning. Type it like you'd text a friend (budget and weather included) and get looks that fit your plans and your wardrobe."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          {/* Prompt panel — mirrors the app's "Outfit maken" screen */}
          <Reveal>
            <div className="rounded-[var(--radius-2xl)] border border-line bg-cream p-5 shadow-card sm:p-8">
              <div className="flex items-center gap-4 border-b border-line pb-5">
                <Fox pose="cheer" className="w-[52px] shrink-0" decorative />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fox-ink">From your Style DNA</p>
                  <p className="mt-1 text-[15px]">A versatile look for date night, true to your style.</p>
                </div>
              </div>

              <label htmlFor="stylist-prompt" className="sr-only">
                Describe what you need
              </label>
              <textarea
                id="stylist-prompt"
                defaultValue={examplePrompt}
                rows={4}
                className="mt-6 w-full resize-none rounded-xl border border-line bg-paper p-4 font-display text-xl leading-snug text-ink outline-none transition-colors focus:border-fox sm:text-2xl"
              />

              <fieldset className="mt-5">
                <legend className="sr-only">Quick choices</legend>
                <div className="flex flex-wrap gap-2">
                  {stylistChips.map((c) => {
                    const on = selected.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(c)}
                        className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors ${
                          on ? "border-night bg-night text-on-night" : "border-line bg-paper text-ink hover:border-ink/40"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={() => setRound((r) => r + 1)}
                className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-[10px] bg-night px-6 font-semibold text-on-night transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
              >
                Generate outfits
                <span className="font-normal text-on-night/60">· try it</span>
              </button>
            </div>
          </Reveal>

          {/* Results */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {looks.map((look, i) => (
                  <motion.article
                    key={`${look.id}-${round}`}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="group overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper"
                  >
                    <FlatLay items={look.items} backdrop={look.backdrop} photo={look.photo} alt={look.alt} sizes="(min-width: 1024px) 300px, 45vw" className="aspect-[4/4.6] transition-transform duration-500 group-hover:scale-[1.02]" />
                    <div className="p-3.5 sm:p-4">
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs">{look.title}</h3>
                      <p className="mt-1 flex justify-between text-sm text-ink-soft">
                        <span>{look.meta}</span>
                        <span className="font-semibold text-ink">{look.price}</span>
                      </p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
            <div className="pointer-events-none absolute -right-2 -top-10 flex items-end gap-1 sm:-right-6 sm:-top-14">
              <FoxBubble text={round > 1 ? "Better." : "Four ideas. One's a winner."} tail="right" size="sm" className="mb-10" />
              <Fox pose="cool" mirror reactKey={round} className="w-[64px] sm:w-[84px]" decorative />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
