import { Reveal } from "@/components/ui/Reveal";

const extras: { icon: string; t: string; d: string; plan?: string }[] = [
  { icon: "▦", t: "Outfit calendar", d: "Plan the week ahead, from Monday's meeting to Saturday's wedding." },
  { icon: "◌", t: "Laundry mode", d: "Mark what's in the wash. It won't be suggested until it's clean." },
  { icon: "↻", t: "Rotation & wear history", d: "See what you wear on repeat and what you've forgotten." },
  { icon: "€", t: "Wardrobe stats & cost-per-wear", d: "Find out which pieces really earn their place." },
  { icon: "♡", t: "Wishlist", d: "Keep track of what you'd like, without the impulse buy." },
  { icon: "✚", t: "Missing Piece", d: "Spot the one item that would unlock the most new outfits." },
  { icon: "◷", t: "Monthly shopping budget", d: "Set a budget and stay on top of it.", plan: "Silver & Gold" },
  { icon: "✺", t: "Community & Fit Check Stories", d: "Share your outfits and get inspired by others." },
  { icon: "✓", t: "Daily challenges & rewards", d: "A small style dare every day, with points to show for it." },
  { icon: "文", t: "7 languages, local currencies", d: "FitFox speaks your language and your currency." },
];

export function Extras() {
  return (
    <section aria-labelledby="extras-title" className="section-y border-t border-line-soft bg-paper">
      <div className="container-brand">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-5">And there&rsquo;s more</p>
          <h2 id="extras-title" className="display text-balance text-[2.4rem] sm:text-[3.4rem]">
            Little things you&rsquo;ll <span className="italic">quietly love.</span>
          </h2>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-line bg-line lg:grid-cols-5">
          {extras.map((e, i) => (
            <Reveal as="li" key={e.t} delay={0.04 * i} className="group bg-paper p-4 transition-colors hover:bg-cream sm:p-6">
              <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-sand text-lg text-fox-ink transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                {e.icon}
              </span>
              <h3 className="mt-4 text-[15px] font-semibold leading-snug sm:text-base">{e.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft sm:text-[15px]">{e.d}</p>
              {e.plan && <p className="mt-3 inline-block rounded-full bg-fox-soft px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-fox-ink">{e.plan}</p>}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
