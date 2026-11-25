"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Phone } from "@/components/phone/Phone";
import { StylistScreen } from "@/components/phone/screens";

const stylistPoints = [
  { t: "Why it works", d: "Learn why two pieces go together, so you start spotting it yourself." },
  { t: "Honest feedback", d: "Share what you wore and get a kind but candid second opinion." },
  { t: "Colour, contrast, silhouette", d: "Advice that fits your look, not this week's trend." },
  { t: "Gets better every day", d: "The more you like, wear and skip, the better it knows you." },
];

const game = [
  { k: "8", t: "chapters per journey", d: "Guided style journeys, one chapter at a time." },
  { k: "Daily", t: "challenges", d: "Small dares like 'no black today' to get you out of a rut." },
  { k: "SP", t: "Style Points & levels", d: "Earn points for trying something new and level up." },
  { k: "★", t: "Badges & rewards", d: "Collect them as your style grows. Share looks with the community." },
];

export function Stylist() {
  return (
    <section id="stylist" aria-labelledby="stylist-title" className="section-y">
      <div className="container-brand">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[420px]">
            <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-fox/15 blur-[70px]" />
            <Reveal y={40} className="relative mx-auto w-[min(68vw,290px)] sm:w-[300px]">
              <Phone label="Your stylist explains why an outfit works, shows your Style DNA and your progress in a style journey">
                <StylistScreen />
              </Phone>
            </Reveal>
            <Reveal delay={0.25} className="absolute -bottom-6 -right-2 z-10 w-[34%] sm:-right-10">
              <motion.div animate={{ rotate: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="origin-bottom">
                <Image src="/brand/vexi-walk.webp" alt="" width={369} height={584} className="h-auto w-full drop-shadow-[0_20px_20px_rgb(60_40_20/0.25)]" />
              </motion.div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow mb-5">Meet your stylist</p>
              <h2 id="stylist-title" className="display text-balance text-[2.6rem] sm:text-6xl">
                A stylist that <span className="italic text-fox-ink">gets your style.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                Your style isn&rsquo;t a trend. It&rsquo;s yours. Pick one of four fox style coaches and discover what actually works for
                you, with a Style DNA that grows with every outfit.
              </p>
            </Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {stylistPoints.map((p, i) => (
                <Reveal as="li" key={p.t} delay={0.07 * i} className="border-t border-line pt-5">
                  <h3 className="font-display text-xl">{p.t}</h3>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-ink-soft">{p.d}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-fox-soft px-4 py-2 text-sm font-semibold text-fox-ink">
                <span aria-hidden>✦</span> Extended Style DNA comes with Silver &amp; Gold
              </p>
            </Reveal>
          </div>
        </div>

        {/* Journeys & gamification */}
        <Reveal className="mt-24 sm:mt-32">
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-night px-6 py-14 text-on-night sm:px-12 sm:py-16 lg:px-16">
            <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-fox/30 blur-[110px]" />
            <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="eyebrow mb-5 !text-[#e0a57d]">Style journeys & challenges</p>
                <h2 className="display text-balance text-[2.4rem] sm:text-[3.4rem]">
                  Turn your wardrobe into an <span className="italic">adventure.</span>
                </h2>
                <p className="mt-5 max-w-md text-lg text-on-night/70">Discover your style one challenge at a time. It&rsquo;s more fun than it sounds.</p>
              </div>
              <ul className="grid grid-cols-2 gap-3">
                {game.map((g, i) => (
                  <motion.li
                    key={g.t}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[var(--radius-lg)] border border-on-night/10 bg-night-2 p-4 transition-colors hover:border-fox/50 sm:p-6"
                  >
                    <span className="font-display text-3xl italic text-[#e0a57d]">{g.k}</span>
                    <h3 className="mt-2 font-semibold">{g.t}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-on-night/65 sm:text-[15px]">{g.d}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
