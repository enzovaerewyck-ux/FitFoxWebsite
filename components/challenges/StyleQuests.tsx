"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { challenges, type Challenge } from "@/data/challenges";
import { GarmentArt } from "@/components/ui/GarmentArt";

const tone: Record<Challenge["tone"], { card: string; tag: string; sub: string }> = {
  cream: { card: "bg-paper text-ink border-line", tag: "bg-fox-soft text-fox-ink", sub: "text-ink-soft" },
  sand: { card: "bg-sand text-ink border-line", tag: "bg-paper text-fox-ink", sub: "text-ink-soft" },
  night: { card: "bg-night text-on-night border-night", tag: "bg-fox text-on-night", sub: "text-on-night/70" },
  fox: { card: "bg-fox text-on-night border-fox", tag: "bg-paper text-fox-ink", sub: "text-on-night/85" },
};

export function StyleQuests() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = challenges.find((c) => c.id === openId) ?? challenges[0];

  return (
    <section aria-labelledby="quests-title" className="section-y relative overflow-hidden">
      <div className="container-brand">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="quests-title"
            eyebrow="Style quests"
            title={
              <>
                Stuck in a style rut? <span className="italic">Take a quest.</span>
              </>
            }
            intro="Tiny weekly challenges that get you out of your comfort zone, one outfit at a time. Tap a card to see what it's about."
          />
          <div className="flex items-end gap-2 self-start lg:self-end" aria-live="polite">
            <FoxBubble text={active.foxLine} tail="right" className="mb-16 max-w-[220px]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.foxPose}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3 }}
              >
                <Fox pose={active.foxPose} mirror={active.foxPose !== "peek"} className={active.foxPose === "wave" ? "w-[120px]" : "w-[96px] sm:w-[110px]"} decorative />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((c, i) => {
            const t = tone[c.tone];
            const open = openId === c.id;
            return (
              <Reveal as="li" key={c.id} delay={(i % 3) * 0.08}>
                <motion.button
                  type="button"
                  onClick={() => setOpenId(open ? null : c.id)}
                  aria-expanded={open}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`group relative flex min-h-[240px] w-full flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] border p-6 text-left sm:p-7 ${t.card}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${t.tag}`}>{c.tag}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-current/25 text-lg leading-none" aria-hidden>
                      {open ? "–" : "+"}
                    </span>
                  </div>
                  <div aria-hidden className={`pointer-events-none absolute -bottom-3 -right-2 transition-opacity ${open ? "opacity-25" : ""}`}>
                    <div className="w-[100px] rotate-[-8deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110 lg:w-[120px]">
                    <GarmentArt garment={c.visual} className="w-full drop-shadow-[0_10px_12px_rgba(0,0,0,0.25)]" />
                    {c.crossed && <span className="absolute left-[8%] top-1/2 h-[4px] w-[84%] -rotate-[35deg] rounded-full bg-fox" />}
                  </div>
                  </div>
                  <div className="relative mt-10 pr-16">
                    <p className="font-display text-[2rem] uppercase leading-[0.98] tracking-[-0.01em] sm:text-[2.2rem]">
                      {c.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`overflow-hidden text-[15px] leading-relaxed ${t.sub}`}
                        >
                          <span className="block pt-4">{c.detail}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
