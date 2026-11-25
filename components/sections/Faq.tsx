import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { faqs } from "@/data/faq";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y">
      <div className="container-brand grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeader
            id="faq-title"
            eyebrow="Good questions"
            title={
              <>
                Before you <span className="italic">ask.</span>
              </>
            }
            intro="The things people usually wonder about before they join the waitlist."
          />
          <Reveal delay={0.1} className="mt-10 hidden items-end gap-2 lg:flex">
            <Fox pose="cheer" className="w-[96px]" decorative />
            <FoxBubble text="Ask away. I don't bite." tail="left" size="sm" className="mb-14" />
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <ul className="border-t border-line">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-xl leading-snug sm:text-2xl">{f.q}</span>
                    <span
                      aria-hidden
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-lg transition-transform duration-300 group-open:rotate-45 group-open:border-fox group-open:bg-fox group-open:text-on-night"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 pr-12 text-[17px] leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
