"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FlatLay } from "@/components/ui/FlatLay";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { examplePrompt, resultLooks } from "@/data/exampleLooks";

export function AiStylist() {

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

        <Reveal className="mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fox-ink">For example</p>
          <p className="font-display text-xl italic leading-snug sm:text-2xl">&ldquo;{examplePrompt.replace(/\n/g, " ")}&rdquo;</p>
        </Reveal>

        <div className="relative mt-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {resultLooks.map((look, i) => (
              <Reveal as="article" key={look.id} delay={0.05 + i * 0.07} className="group overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper">
                <FlatLay items={look.items} backdrop={look.backdrop} photo={look.photo} alt={look.alt} sizes="(min-width: 1024px) 300px, 45vw" className="aspect-[4/4.6] transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="p-3.5 sm:p-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs">{look.title}</h3>
                  <p className="mt-1 flex justify-between gap-2 text-sm text-ink-soft">
                    <span>{look.meta}</span>
                    <span className="font-semibold text-ink">{look.price}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="pointer-events-none absolute -right-2 -top-10 flex items-end gap-1 sm:-right-6 sm:-top-14">
            <FoxBubble text="Four ideas. One's a winner." tail="right" size="sm" className="mb-10" />
            <Fox pose="cool" mirror className="w-[64px] sm:w-[84px]" decorative />
          </div>
        </div>
      </div>
    </section>
  );
}
