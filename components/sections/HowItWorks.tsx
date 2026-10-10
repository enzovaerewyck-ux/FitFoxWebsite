"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GarmentPhoto } from "@/components/ui/GarmentArt";
import { photos } from "@/data/garmentPhotos";
import { FlatLay } from "@/components/ui/FlatLay";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { garmentColors as c } from "@/data/garments";
import { resultLooks } from "@/data/exampleLooks";

function DnaScene() {
  const tiles = [
    { g: { kind: "coat", color: c.camel, accent: c.chocolate, name: "Coat" } as const, bg: "#eadfce", liked: true },
    { g: { kind: "jacket", color: c.navy, name: "Navy jacket" } as const, bg: "#e2ddd6", liked: false },
    { g: { kind: "knit", color: c.cream, name: "Knit" } as const, bg: "#e7e2d4", liked: true },
    { g: { kind: "overshirt", color: c.olive, accent: c.cream, name: "Overshirt" } as const, bg: "#dfe0d2", liked: true },
  ];
  const [liked, setLiked] = useState(tiles.map((t) => t.liked));
  return (
    <div className="relative grid h-full grid-cols-2 gap-2.5 p-4">
      {tiles.map((t, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setLiked((l) => l.map((v, j) => (j === i ? !v : v)))}
          aria-pressed={liked[i]}
          aria-label={`${liked[i] ? "Unlike" : "Like"} ${t.g.name}`}
          className={`relative overflow-hidden rounded-xl border-2 transition-colors ${liked[i] ? "border-fox" : "border-transparent"}`}
          style={{ background: t.bg }}
        >
          <GarmentPhoto garment={t.g} sizes="160px" />
          <span
            className={`absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full text-xs transition-colors ${
              liked[i] ? "bg-fox text-on-night" : "bg-paper/80 text-ink-mute"
            }`}
            aria-hidden
          >
            {liked[i] ? "✓" : "+"}
          </span>
        </button>
      ))}
      <div className="absolute -bottom-3 -right-3 w-[74px]">
        <Fox pose="cheer" className="w-full" decorative />
      </div>
    </div>
  );
}

function CreateScene() {
  const chips = ["Dinner", "Under €200", "12°C, rain", "Relaxed fit", "Calm mood"];
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5">
      <div className="rounded-xl border border-line bg-paper p-4 text-left shadow-soft">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fox-ink">Where are you going?</p>
        <p className="mt-2 font-display text-lg leading-snug">
          Dinner with friends, <br />
          something relaxed
          <motion.span
            className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-fox"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            aria-hidden
          />
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((ch, i) => (
          <motion.span
            key={ch}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${i === 1 ? "border-fox bg-fox text-on-night" : "border-line bg-paper text-ink"}`}
          >
            {ch}
          </motion.span>
        ))}
      </div>
      <div className="flex items-center gap-2 pl-1">
        <Fox pose="cool" className="w-[34px]" decorative />
        <FoxBubble text="Rain? Skip the suede." tail="left" size="sm" />
      </div>
    </div>
  );
}

function MineScene() {
  const look = resultLooks[1];
  return (
    <div className="relative h-full">
      <div className="absolute inset-0">
        <FlatLay items={look.items} backdrop={look.backdrop} photo={photos.lookWeekend} alt="Flat-lay of a cream knit, straight jeans and white sneakers" className="h-full w-full" sizes="(min-width: 1024px) 380px, 90vw" />
      </div>
      <div className="absolute inset-x-3 bottom-3 z-10 flex flex-wrap gap-1.5">
        {["Use my wardrobe", "Warmer", "Other colour"].map((t) => (
          <span key={t} className="rounded-full border border-line bg-paper/95 px-3 py-1.5 text-xs font-semibold shadow-soft">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const steps = [
  {
    n: "01",
    title: "Show us what you like",
    body: "Heart the looks, colours and fits that feel like you. Skip the rest. No awkward quiz about your age or body type.",
    tags: ["Looks", "Colours", "Fits", "Aesthetics"],
    Scene: DnaScene,
    bg: "bg-sand",
  },
  {
    n: "02",
    title: "Tell us where you're going",
    body: "A first date, a job interview, a rainy Tuesday. Add a budget if you like, and your stylist puts the looks together.",
    tags: ["Occasion", "Budget", "Weather", "Mood"],
    Scene: CreateScene,
    bg: "bg-[#ece5da]",
  },
  {
    n: "03",
    title: "Tweak it until it's you",
    body: "Use your own sneakers, go cheaper, go warmer, try another colour. One tap, one change. The rest stays put.",
    tags: ["Your wardrobe", "Alternatives", "Colours", "Vibe"],
    Scene: MineScene,
    bg: "bg-sand",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y border-t border-line-soft bg-paper">
      <div className="container-brand">
        <SectionHeader
          id="how-title"
          eyebrow="How it works"
          title={
            <>
              Three steps.
              <br />
              <span className="italic">No fashion degree required.</span>
            </>
          }
        />
        <ol className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-8">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.1} className="group md:grid md:grid-cols-2 md:items-center md:gap-10 lg:block">
              <div className={`relative aspect-[5/5.2] overflow-hidden rounded-[var(--radius-xl)] border border-line/70 ${s.bg} transition-transform duration-500 group-hover:-translate-y-1`}>
                <s.Scene />
              </div>
              <div>
              <div className="mt-6 flex items-baseline gap-4 md:mt-0 lg:mt-6">
                <span className="font-display text-4xl italic text-fox-ink">{s.n}</span>
                <h3 className="font-display text-2xl leading-tight sm:text-[1.7rem]">{s.title}</h3>
              </div>
              <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{s.body}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-ink-mute">{s.tags.join(" · ")}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
