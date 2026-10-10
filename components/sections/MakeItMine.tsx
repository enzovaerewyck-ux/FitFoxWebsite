"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GarmentPhoto } from "@/components/ui/GarmentArt";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { baseOutfit, tweaks, type Outfit, type OutfitSlot, type Tweak } from "@/data/exampleLooks";

const slotOrder: OutfitSlot[] = ["outer", "top", "bottom", "shoes"];
const slotLabel: Record<OutfitSlot, string> = { outer: "Outer", top: "Top", bottom: "Bottom", shoes: "Shoes" };

export function MakeItMine() {
  const [outfit, setOutfit] = useState<Outfit>(baseOutfit);
  const [last, setLast] = useState<Tweak | null>(null);

  const apply = (t: Tweak) => {
    setOutfit((o) => ({ ...o, [t.slot]: t.replacement }));
    setLast(t);
  };
  const reset = () => {
    setOutfit(baseOutfit);
    setLast(null);
  };

  return (
    <section aria-labelledby="mine-title" className="section-y bg-paper">
      <div className="container-brand grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeader
            id="mine-title"
            eyebrow="Make it mine"
            title={
              <>
                Almost right?
                <br />
                <span className="italic">Make it yours.</span>
              </>
            }
            intro="Love the look, not the shoes? Change just the shoes. Your stylist tweaks one thing at a time and leaves the rest exactly how you liked it."
          />

          <Reveal delay={0.1} className="mt-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft" id="tweak-label">
              Try a change
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="tweak-label">
              {tweaks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => apply(t)}
                  aria-pressed={last?.id === t.id}
                  className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    last?.id === t.id ? "border-fox bg-fox text-on-night" : "border-line bg-cream text-ink hover:border-ink/40"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={reset} className="mt-5 text-sm font-semibold text-ink-soft underline underline-offset-4 hover:text-ink">
              Reset look
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative pt-28">
          <div className="pointer-events-none absolute right-4 top-0 z-0 flex items-start gap-1 sm:right-8">
            <FoxBubble text={last ? last.foxLine : "Hm."} tail="right" size="sm" className="mt-4" />
            <Fox pose="portrait" reactKey={last?.id} tilt={last ? 0 : -5} className="w-[84px] sm:w-[96px]" decorative />
          </div>
          <div className="relative z-10 rounded-[var(--radius-2xl)] border border-line bg-cream p-4 shadow-card sm:p-6">
            <div className="mb-4 flex items-center justify-between px-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fox-ink">Weekend dinner</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={last?.id ?? "none"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-right text-xs text-ink-soft"
                  aria-live="polite"
                >
                  {last ? last.reason : "4 pieces · 2 owned"}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {slotOrder.map((slot) => {
                const g = outfit[slot];
                const changed = last?.slot === slot;
                return (
                  <div
                    key={slot}
                    className={`relative overflow-hidden rounded-[var(--radius-lg)] border-2 bg-sand/80 transition-colors duration-300 ${
                      changed ? "border-fox" : "border-transparent"
                    }`}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <AnimatePresence initial={false}>
                        <motion.div
                          key={g.id}
                          className="absolute inset-0"
                          initial={{ opacity: 0, x: "30%" }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: "-30%" }}
                          transition={{ type: "spring", stiffness: 220, damping: 26 }}
                        >
                          <GarmentPhoto garment={g} sizes="(min-width: 1024px) 260px, 45vw" />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="flex items-center justify-between gap-2 border-t border-line/60 bg-paper/80 px-3 py-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-mute">{slotLabel[slot]}</span>
                      <span className="truncate text-[13px] font-semibold">{g.name}</span>
                    </div>
                    {changed && (
                      <span className="absolute right-2 top-2 rounded-md bg-fox px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-on-night">
                        New
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
