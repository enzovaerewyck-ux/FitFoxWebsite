/** Slow marquee of everyday moments FitFox dresses you for. Pure CSS, pauses on reduced motion. */
const moments = [
  "First date",
  "Monday meeting",
  "Rainy Tuesday",
  "Wedding guest",
  "Coffee on Sunday",
  "Job interview",
  "Birthday dinner",
  "Weekend away",
  "Drinks after work",
];

export function Occasions() {
  const row = [...moments, ...moments];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-line-soft bg-paper py-5">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-10 motion-reduce:animate-none">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl italic text-ink/80 sm:text-3xl">
            {m}
            <span className="text-base not-italic text-fox">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
