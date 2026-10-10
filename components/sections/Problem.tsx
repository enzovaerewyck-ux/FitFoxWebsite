"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { brand } from "@/config/brand";
import { photos } from "@/data/garmentPhotos";

const thoughts = [
  "I have nothing to wear.",
  "I love this look… but would it ever work on me?",
  "Bought it three months ago. Tags still on.",
  "Why do I always end up in the same black outfit?",
];

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="section-y relative overflow-hidden">
      <div className="container-brand grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Sound familiar?</p>
            <h2 id="problem-title" className="display text-balance text-[2.5rem] sm:text-6xl lg:text-[4.1rem]">
              Door open. Coffee going cold.
              <br />
              <span className="text-ink-soft">Still no idea what to wear.</span>
            </h2>
          </Reveal>

          <ul className="mt-12 space-y-4">
            {thoughts.map((t, i) => (
              <Reveal as="li" key={t} delay={0.1 + i * 0.1}>
                <div
                  className="relative inline-flex max-w-md items-start gap-3 rounded-2xl rounded-bl-md border border-line bg-paper px-5 py-4 shadow-soft"
                  style={{ marginLeft: `${[0, 28, 8, 20][i]}px` }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fox" aria-hidden />
                  <p className="font-display text-lg italic leading-snug sm:text-xl">&ldquo;{t}&rdquo;</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Overflowing wardrobe + fox */}
        <Reveal className="relative mx-auto w-full max-w-[520px]">
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-2xl)] border border-line bg-sand">
              <Image
                src={photos.problem}
                alt="A woman sits on her bed surrounded by piles of tried-on clothes, looking at her completely full wardrobe"
                fill
                sizes="(min-width: 1024px) 520px, 92vw"
                className="object-cover object-[50%_40%]"
              />
            </div>

            <div className="absolute -bottom-4 -right-2 z-10 sm:-right-8">
              <div className="absolute bottom-[96%] right-[30%] w-max">
                <FoxBubble text="Nothing to wear. Sure." tail="bottom-right" size="sm" />
              </div>
              <Fox pose="wave" mirror className="w-[132px] sm:w-[170px]" />
            </div>

            <figcaption className="mt-6 font-display text-lg italic text-ink-soft">She says she has nothing to wear.</figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal className="container-brand mt-20 sm:mt-28">
        <p className="mx-auto max-w-3xl text-balance text-center font-display text-3xl leading-tight sm:text-[2.6rem]">
          You probably don&rsquo;t need more clothes.
          <br />
          You need <span className="italic text-fox-ink">more ways to wear them.</span>
        </p>
        <p className="mx-auto mt-5 max-w-xl text-center text-lg text-ink-soft">
          That&rsquo;s exactly what {brand.name} is for.
        </p>
      </Reveal>
    </section>
  );
}
