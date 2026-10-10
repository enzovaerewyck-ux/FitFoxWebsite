/**
 * JS-side design tokens. Colors, radius, type, spacing and shadows live as CSS
 * variables in app/globals.css (@theme) so Tailwind utilities and components share one source.
 * This file holds the animation timing used by Framer Motion.
 */
export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeSoft: [0.4, 0, 0.2, 1] as [number, number, number, number],
  duration: {
    fast: 0.2,
    base: 0.45,
    slow: 0.8,
  },
  stagger: 0.08,
  /** Distance elements travel when revealing on scroll. */
  revealOffset: 24,
  spring: { type: "spring" as const, stiffness: 260, damping: 22 },
  springSoft: { type: "spring" as const, stiffness: 120, damping: 18 },
};
