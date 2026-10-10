import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FlatLay } from "@/components/ui/FlatLay";
import { GarmentArt } from "@/components/ui/GarmentArt";
import { resultLooks, baseOutfit } from "@/data/exampleLooks";
import { photos } from "@/data/garmentPhotos";
import { garmentColors as c } from "@/data/garments";

const steps = [
  { word: "Discover", note: "A creator look catches your eye" },
  { word: "Try", note: "See it on you" },
  { word: "Personalize", note: "Adapt it to your Style DNA" },
  { word: "Wear", note: "With pieces you already own" },
  { word: "Share", note: "Your version, back to the community" },
];

function Visual({ i }: { i: number }) {
  const cls = "aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] border border-line/70";
  switch (i) {
    case 0:
      return (
        <div className={`relative ${cls}`}>
          <Image src={photos.creator} alt="" fill sizes="(min-width: 768px) 220px, 60vw" className="object-cover object-[50%_30%]" />
          <span className="absolute left-2 top-2 rounded bg-paper/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]">@creator</span>
        </div>
      );
    case 1:
      return <FlatLay items={Object.values(baseOutfit)} backdrop="#eadfce" photo={photos.lookOlive} className={cls} sizes="(min-width: 768px) 220px, 60vw" />;
    case 2:
      return (
        <FlatLay
          items={[
            { ...baseOutfit.outer, id: "c-o", color: c.olive, kind: "overshirt", accent: c.cream },
            baseOutfit.top,
            baseOutfit.bottom,
            { ...baseOutfit.shoes, id: "c-s", kind: "sneakers", color: c.white, accent: c.stone },
          ]}
          backdrop="#e2e2d5"
          className={cls}
        />
      );
    case 3:
      return <FlatLay items={resultLooks[3].items} backdrop={resultLooks[3].backdrop} photo={photos.personAfter} className={cls} sizes="(min-width: 768px) 220px, 60vw" />;
    default:
      return (
        <div className={`grid place-items-center bg-night ${cls}`}>
          <div className="w-[58%] rotate-[-4deg] rounded-lg bg-paper p-2 shadow-float">
            <GarmentArt garment={{ kind: "overshirt", color: c.olive, accent: c.cream, name: "Your version" }} className="w-full" />
            <p className="mt-1 text-center text-[10px] font-bold uppercase tracking-[0.14em]">My version</p>
          </div>
        </div>
      );
  }
}

export function Community() {
  return (
    <section aria-labelledby="community-title" className="section-y border-t border-line-soft">
      <div className="container-brand">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeader
            id="community-title"
            eyebrow="Coming soon · Community"
            title={
              <>
                See a look you love.
                <br />
                <span className="italic">Make it yours.</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:ml-auto">
              Spot a look from a creator or a friend, and your stylist rebuilds it around your Style DNA and the clothes you already own. Your version, not a copy.
            </p>
          </Reveal>
        </div>

        <ol className="-mx-[var(--gutter)] mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.word} delay={i * 0.08} className="w-[62%] shrink-0 snap-start sm:w-[40%] md:w-auto">
              <Visual i={i} />
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-fox-ink">{s.word}</span>
                {i < steps.length - 1 && <span className="h-px flex-1 bg-line" aria-hidden />}
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">{s.note}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
