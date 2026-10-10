import { Reveal } from "@/components/ui/Reveal";
import { Fox } from "@/components/fox/Fox";
import { brand } from "@/config/brand";

const lines = [
  "It's the colours you keep choosing.",
  "The jacket you never know how to wear.",
  "The outfit you save but never recreate.",
  "The confidence you feel when everything finally works together.",
];

export function BrandStory() {
  return (
    <section id="about" aria-labelledby="story-title" className="section-y relative overflow-hidden bg-paper">
      <div className="container-brand grid gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:gap-10">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-5">Why we&rsquo;re building {brand.name}</p>
            <h2 id="story-title" className="display text-[2.8rem] sm:text-6xl lg:text-[5rem]">
              Fashion should feel <span className="italic">personal.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 font-display text-2xl leading-snug sm:text-3xl">
              Style isn&rsquo;t your age, gender or an algorithmic label.
            </p>
          </Reveal>
          <div className="mt-6 space-y-3">
            {lines.map((l, i) => (
              <Reveal key={l} delay={0.15 + i * 0.08}>
                <p className="text-xl leading-relaxed text-ink-soft sm:text-2xl">{l}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <p className="mt-6 text-xl font-semibold sm:text-2xl">{brand.name} learns those details.</p>
          </Reveal>
          <Reveal delay={0.5} className="mt-14 border-l-2 border-fox pl-6">
            <p className="font-display text-3xl italic leading-tight sm:text-[2.6rem]">
              We don&rsquo;t dress your demographic.
              <br />
              We learn your style.
            </p>
          </Reveal>
        </div>

        {/* TODO(brand): replace with a calm "sitting" fox pose when available (see poses.ts → poseFallback.sit) */}
        <Reveal delay={0.2} className="-mb-[var(--section-y)] flex items-end justify-center lg:justify-end">
          <div className="relative">
            <Fox pose="wave" className="w-[180px] sm:w-[230px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
