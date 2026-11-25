"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppHeader, TypedText, useDemoLoop } from "./Phone";

const ease = [0.22, 1, 0.36, 1] as const;
const pop = {
  initial: { opacity: 0, y: 8, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.45, ease },
};

function Chip({ children, tone = "paper" }: { children: React.ReactNode; tone?: "paper" | "fox" | "night" | "owned" }) {
  const tones = {
    paper: "bg-paper/95 text-ink border-line",
    fox: "bg-fox text-on-night border-fox",
    night: "bg-night text-on-night border-night",
    owned: "bg-owned-soft text-owned border-owned/20",
  };
  return (
    <span className={`inline-flex items-center gap-[1.2cqw] whitespace-nowrap rounded-full border-[0.3cqw] px-[2.8cqw] py-[1.3cqw] text-[2.9cqw] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Cutout({ src, className = "" }: { src: string; className?: string }) {
  return (
    <span className={`relative block overflow-hidden rounded-[2.4cqw] bg-linen/70 ${className}`}>
      <Image src={src} alt="" fill sizes="80px" className="object-contain p-[1.2cqw]" />
    </span>
  );
}

/* ───────────────────────── Daily Look ───────────────────────── */
export function DailyLookScreen({
  photo = "/photos/hero.webp",
  caption = "Camel coat, cream knit. Warm enough for the rain.",
  items = ["coat-camel", "knit-cream", "trousers-charcoal", "loafers-black"],
  weather = "☁︎ 12° · Light rain",
}: { photo?: string; caption?: string; items?: string[]; weather?: string }) {
  const { ref, step } = useDemoLoop(5, 900, 3200);
  return (
    <div ref={ref} className="flex h-full flex-col">
      <AppHeader eyebrow="Good morning" />
      <div className="relative mx-[5cqw] flex-1 overflow-hidden rounded-[5cqw] bg-sand">
        <motion.div className="absolute inset-0" animate={{ scale: [1.04, 1.1] }} transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "linear" }}>
          <Image src={photo} alt="" fill sizes="320px" className="object-cover object-[50%_20%]" />
        </motion.div>
        <div className="absolute left-[3.5cqw] right-[3.5cqw] top-[3.5cqw] flex flex-wrap gap-[1.6cqw]">
          <AnimatePresence>
            {step >= 1 && (
              <motion.span key="w" {...pop}>
                <Chip>{weather}</Chip>
              </motion.span>
            )}
            {step >= 2 && (
              <motion.span key="l" {...pop}>
                <Chip>
                  <span className="text-fox">●</span> 2 pieces in the wash · skipped
                </Chip>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 via-night/70 to-transparent px-[4cqw] pb-[4cqw] pt-[14cqw] text-on-night">
          <span className="inline-block bg-fox px-[2cqw] py-[0.8cqw] text-[2.5cqw] font-bold uppercase tracking-[0.2em]">Style of the day</span>
          <p className="mt-[2cqw] font-display text-[5.2cqw] leading-tight">{caption}</p>
          <div className="mt-[2.6cqw] flex gap-[1.6cqw]">
            {items.map((it, i) => (
              <motion.span
                key={it}
                initial={false}
                animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 6 }}
                transition={{ duration: 0.4, delay: step >= 3 ? i * 0.08 : 0, ease }}
                className="block"
              >
                <Cutout src={`/photos/cutout/${it}.webp`} className="h-[11cqw] w-[11cqw] !bg-paper" />
              </motion.span>
            ))}
          </div>
          <motion.span
            animate={{ scale: step === 4 ? [1, 1.04, 1] : 1 }}
            transition={{ duration: 0.6 }}
            className="mt-[3cqw] flex h-[9cqw] items-center justify-center rounded-[1.6cqw] bg-cream text-[3cqw] font-bold uppercase tracking-[0.16em] text-ink"
          >
            Wear this look
          </motion.span>
        </div>
      </div>
      <TabBar active="Home" />
    </div>
  );
}

/* ───────────────────────── Create studio ───────────────────────── */
export function CreateScreen() {
  const { ref, step } = useDemoLoop(4, 1600, 3600);
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    if (step !== 0) return setTyped(1);
    setTyped(0);
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1300);
      setTyped(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step]);

  const looks = ["look-date", "look-olive", "look-weekend", "look-camel"];
  return (
    <div ref={ref} className="flex h-full flex-col">
      <AppHeader eyebrow="Create studio" title="Where are you going?" />
      <div className="mx-[5cqw] rounded-[3cqw] border-[0.3cqw] border-line bg-paper p-[3.4cqw] font-display text-[4.4cqw] leading-snug">
        <TypedText text="Dinner date, smart casual, nothing too warm." progress={typed} />
      </div>
      <div className="mx-[5cqw] mt-[2.6cqw] flex flex-wrap gap-[1.6cqw]">
        <Chip tone="night">Date night</Chip>
        <Chip>My colours</Chip>
        <Chip tone={step >= 1 ? "owned" : "paper"}>{step >= 1 ? "✓ " : ""}Only my closet</Chip>
      </div>
      <motion.span
        animate={{ scale: step === 1 ? [1, 0.96, 1] : 1 }}
        transition={{ duration: 0.35, delay: 0.5 }}
        className="mx-[5cqw] mt-[3cqw] flex h-[10cqw] items-center justify-center gap-[2cqw] rounded-[2cqw] bg-night text-[3.4cqw] font-semibold text-on-night"
      >
        ✦ Generate outfits
      </motion.span>
      <div className="mx-[5cqw] mt-[3.4cqw] grid flex-1 grid-cols-2 gap-[2.4cqw] pb-[3cqw]">
        {looks.map((l, i) => (
          <motion.span
            key={l}
            initial={false}
            animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.94 }}
            transition={{ duration: 0.5, delay: step >= 2 ? i * 0.12 : 0, ease }}
            className="relative overflow-hidden rounded-[3cqw] bg-sand"
          >
            <Image src={`/photos/${l}.webp`} alt="" fill sizes="160px" className="object-cover" />
            {i === 0 && step >= 3 && (
              <motion.span {...pop} className="absolute left-[1.6cqw] top-[1.6cqw]">
                <Chip tone="fox">♥ Saved</Chip>
              </motion.span>
            )}
            <span className="absolute bottom-[1.6cqw] left-[1.6cqw] rounded-full bg-paper/90 px-[2cqw] py-[0.8cqw] text-[2.4cqw] font-bold">4/4 yours</span>
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Digital wardrobe ───────────────────────── */
const closet = [
  ["coat-camel", "Coat · Camel · Autumn"],
  ["knit-sage", "Knit · Sage · Winter"],
  ["jeans-blue", "Jeans · Blue · All year"],
  ["overshirt-navy", "Overshirt · Navy · Spring"],
  ["sneakers-white", "Sneakers · White · All year"],
  ["trousers-stone", "Trousers · Stone · Summer"],
  ["knit-rust", "Knit · Rust · Autumn"],
  ["shirt-ivory", "Shirt · Ivory · Summer"],
  ["loafers-brown", "Loafers · Brown · All year"],
] as const;

export function WardrobeScreen() {
  const { ref, step } = useDemoLoop(closet.length + 1, 650, 2600);
  const count = Math.min(step, closet.length);
  const latest = closet[count - 1];
  return (
    <div ref={ref} className="flex h-full flex-col">
      <AppHeader eyebrow="My wardrobe" title="Quick Photo Session" />
      <div className="mx-[5cqw] rounded-[3cqw] bg-night p-[3.4cqw] text-on-night">
        <div className="flex items-center justify-between text-[3cqw]">
          <span className="font-semibold">◉ Snapping away</span>
          <span className="tabular-nums text-on-night/70">{count + 22} / 40</span>
        </div>
        <div className="mt-[2cqw] h-[1.4cqw] overflow-hidden rounded-full bg-on-night/15">
          <motion.div className="h-full rounded-full bg-fox" animate={{ width: `${((count + 22) / 40) * 100}%` }} transition={{ duration: 0.5, ease }} />
        </div>
        <div className="mt-[2.4cqw] h-[4cqw] text-[2.9cqw] text-[#e0a57d]">
          <AnimatePresence mode="wait">
            {latest && (
              <motion.span key={latest[0]} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="block">
                Recognised: {latest[1]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mx-[5cqw] mt-[3cqw] flex gap-[1.6cqw]">
        <Chip tone="night">All</Chip>
        <Chip>Tops</Chip>
        <Chip>Bottoms</Chip>
        <Chip>Shoes</Chip>
      </div>
      <div className="mx-[5cqw] mt-[3cqw] grid grid-cols-3 gap-[2cqw]">
        {closet.map(([src], i) => (
          <motion.span
            key={src}
            initial={false}
            animate={{ opacity: i < count ? 1 : 0.0, scale: i < count ? 1 : 0.8 }}
            transition={{ duration: 0.4, ease }}
            className="block"
          >
            <Cutout src={`/photos/cutout/${src}.webp`} className="aspect-square" />
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Make it mine ───────────────────────── */
const swaps = [
  ["Olive overshirt", "overshirt-olive"],
  ["White tee", "tee-white"],
  ["Charcoal trousers", "trousers-charcoal"],
  ["White sneakers", "sneakers-white"],
] as const;

export function MakeItMineScreen() {
  const { ref, step } = useDemoLoop(6, 800, 3400);
  const found = Math.max(0, step - 1);
  return (
    <div ref={ref} className="flex h-full flex-col">
      <AppHeader eyebrow="From the community" />
      <div className="relative mx-[5cqw] h-[58cqw] overflow-hidden rounded-[4cqw] bg-sand">
        <Image src="/photos/creator.webp" alt="" fill sizes="320px" className="object-cover object-[50%_25%]" />
        <span className="absolute bottom-[2.4cqw] left-[2.4cqw]">
          <Chip>♥ Loved this look</Chip>
        </span>
      </div>
      <motion.span
        animate={{ scale: step === 1 ? [1, 0.96, 1] : 1, backgroundColor: step >= 1 ? "#b8693a" : "#151513" }}
        transition={{ duration: 0.4 }}
        className="mx-[5cqw] mt-[3cqw] flex h-[10cqw] items-center justify-center rounded-[2cqw] text-[3.4cqw] font-semibold text-on-night"
      >
        {step >= 1 ? "Finding it in your closet…" : "Make it mine"}
      </motion.span>
      <ul className="mx-[5cqw] mt-[3cqw] space-y-[1.8cqw]">
        {swaps.map(([name, src], i) => {
          const ok = i < found;
          return (
            <li key={src} className="flex items-center gap-[2.4cqw] rounded-[2.4cqw] border-[0.3cqw] border-line bg-paper p-[1.6cqw]">
              <Cutout src={`/photos/cutout/${src}.webp`} className="h-[9cqw] w-[9cqw]" />
              <span className="flex-1 text-[3.1cqw] font-semibold">{name}</span>
              <motion.span
                initial={false}
                animate={{ opacity: ok ? 1 : 0.35 }}
                className={`rounded-full px-[2cqw] py-[0.8cqw] text-[2.5cqw] font-bold ${ok ? "bg-owned-soft text-owned" : "bg-sand text-ink-mute"}`}
              >
                {ok ? "✓ In your closet" : "Searching"}
              </motion.span>
            </li>
          );
        })}
      </ul>
      <p className="mx-[5cqw] mt-[2.6cqw] text-center font-display text-[4cqw] italic">
        {found >= 4 ? "Same vibe. Your own clothes." : " "}
      </p>
    </div>
  );
}

/* ───────────────────────── Virtual try-on ───────────────────────── */
export function TryOnScreen() {
  const { ref, step, reduce } = useDemoLoop(3, 1400, 2600);
  const pos = reduce ? 50 : step === 0 ? 100 : step === 1 ? 50 : 0;
  return (
    <div ref={ref} className="flex h-full flex-col">
      <AppHeader eyebrow="Virtual try-on" title="See it on you first" />
      <div className="relative mx-[5cqw] flex-1 overflow-hidden rounded-[4cqw] bg-sand">
        <Image src="/photos/person-after.webp" alt="" fill sizes="320px" className="object-cover object-[50%_30%]" />
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <Image src="/photos/person-before.webp" alt="" fill sizes="320px" className="object-cover object-[50%_30%]" />
        </motion.div>
        <motion.span
          className="absolute inset-y-0 w-[0.6cqw] -translate-x-1/2 bg-cream shadow"
          initial={false}
          animate={{ left: `${pos}%` }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <span className="absolute left-1/2 top-1/2 grid h-[9cqw] w-[9cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-[3.4cqw] font-bold shadow-lg">
            ⇆
          </span>
        </motion.span>
        <span className="absolute left-[2.4cqw] top-[2.4cqw]">
          <Chip>Your photo</Chip>
        </span>
        <span className="absolute right-[2.4cqw] top-[2.4cqw]">
          <Chip tone="fox">Try-on preview</Chip>
        </span>
      </div>
      <div className="mx-[5cqw] my-[3cqw] flex gap-[1.6cqw]">
        {["coat-camel", "knit-cream", "trousers-charcoal", "loafers-black"].map((s) => (
          <Cutout key={s} src={`/photos/cutout/${s}.webp`} className="h-[12cqw] flex-1" />
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Stylist & journeys ───────────────────────── */
const dna = [
  ["Warm neutrals", 82],
  ["Soft contrast", 64],
  ["Relaxed silhouette", 71],
] as const;

export function StylistScreen() {
  const { ref, step } = useDemoLoop(4, 1100, 3200);
  return (
    <div ref={ref} className="flex h-full flex-col">
      <AppHeader eyebrow="Your stylist" />
      <div className="mx-[5cqw] flex items-end gap-[2.4cqw]">
        <span className="relative h-[13cqw] w-[13cqw] shrink-0 overflow-hidden rounded-full ring-[0.5cqw] ring-fox/50">
          <Image src="/brand/vexi-avatar.webp" alt="" fill sizes="60px" className="object-cover" />
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={step >= 2 ? "b" : "a"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-[3.4cqw] rounded-bl-[0.8cqw] border-[0.3cqw] border-line bg-paper px-[3cqw] py-[2.4cqw] font-display text-[3.7cqw] italic leading-snug"
          >
            {step >= 2 ? "Great fit check. Next time, try the loafers instead." : "Camel and charcoal: warm against cool. That's why it works."}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mx-[5cqw] mt-[4cqw] rounded-[3.4cqw] border-[0.3cqw] border-line bg-paper p-[3.4cqw]">
        <p className="text-[2.6cqw] font-bold uppercase tracking-[0.2em] text-fox-ink">Your Style DNA</p>
        <ul className="mt-[2.4cqw] space-y-[2.4cqw]">
          {dna.map(([k, v], i) => (
            <li key={k}>
              <div className="flex justify-between text-[3cqw]">
                <span>{k}</span>
                <span className="text-ink-mute">{step >= 1 ? v : 0}%</span>
              </div>
              <div className="mt-[1cqw] h-[1.4cqw] rounded-full bg-sand">
                <motion.div className="h-full rounded-full bg-fox" initial={false} animate={{ width: step >= 1 ? `${v}%` : "0%" }} transition={{ duration: 0.8, delay: i * 0.12, ease }} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-[5cqw] mt-[3cqw] overflow-hidden rounded-[3.4cqw] bg-night p-[3.4cqw] text-on-night">
        <p className="text-[2.6cqw] font-bold uppercase tracking-[0.2em] text-[#e0a57d]">Style journey</p>
        <p className="mt-[1cqw] font-display text-[4.6cqw]">Colour confidence</p>
        <div className="mt-[2.4cqw] flex gap-[1cqw]">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              initial={false}
              animate={{ backgroundColor: i < (step >= 3 ? 4 : 3) ? "#b8693a" : "rgba(255,253,248,0.15)" }}
              className="h-[1.4cqw] flex-1 rounded-full"
            />
          ))}
        </div>
        <p className="mt-[1.6cqw] text-[2.8cqw] text-on-night/70">Chapter {step >= 3 ? 4 : 3} of 8</p>
        <AnimatePresence>
          {step >= 3 && (
            <motion.span {...pop} className="absolute right-[3cqw] top-[3cqw]">
              <Chip tone="fox">+15 Style Points</Chip>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabBar({ active }: { active: string }) {
  const tabs = ["Home", "Wardrobe", "Create", "Community", "Ranking"];
  return (
    <div className="mt-[3cqw] flex items-center justify-around border-t-[0.3cqw] border-line-soft bg-paper px-[2cqw] pb-[5cqw] pt-[2.4cqw] text-[2.4cqw] font-semibold">
      {tabs.map((t) =>
        t === "Create" ? (
          <span key={t} className="grid h-[10cqw] w-[10cqw] -translate-y-[2cqw] place-items-center rounded-full bg-night text-[4cqw] text-on-night">
            ✦
          </span>
        ) : (
          <span key={t} className={t === active ? "text-fox-ink" : "text-ink-mute"}>
            {t}
          </span>
        ),
      )}
    </div>
  );
}
