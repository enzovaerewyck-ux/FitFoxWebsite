import { garmentColors as c, type Garment } from "./garments";

/**
 * "Your own closet" photography (generated with Higgsfield): every piece hangs on the same oak hanger
 * against a warm cream wall at home — the way a user would snap it for the app. Shoes stand on the oak floor. Files live in /public/photos (backdrop) and /public/photos/cutout (transparent).
 * Garments without an entry fall back to the SVG illustration.
 */
// Literal paths (not template strings) so bundlers/preview tooling can find every file.
const table: Record<string, [photo: string, cutout: string]> = {
  [`coat|${c.camel}`]: ["/photos/coat-camel.webp", "/photos/cutout/coat-camel.webp"],
  [`knit|${c.cream}`]: ["/photos/knit-cream.webp", "/photos/cutout/knit-cream.webp"],
  [`knit|${c.rust}`]: ["/photos/knit-rust.webp", "/photos/cutout/knit-rust.webp"],
  [`knit|${c.sage}`]: ["/photos/knit-sage.webp", "/photos/cutout/knit-sage.webp"],
  [`tee|${c.white}`]: ["/photos/tee-white.webp", "/photos/cutout/tee-white.webp"],
  [`tee|${c.black}`]: ["/photos/tee-black.webp", "/photos/cutout/tee-black.webp"],
  [`shirt|${c.ivory}`]: ["/photos/shirt-ivory.webp", "/photos/cutout/shirt-ivory.webp"],
  [`overshirt|${c.navy}`]: ["/photos/overshirt-navy.webp", "/photos/cutout/overshirt-navy.webp"],
  [`overshirt|${c.olive}`]: ["/photos/overshirt-olive.webp", "/photos/cutout/overshirt-olive.webp"],
  [`jacket|${c.navy}`]: ["/photos/jacket-navy.webp", "/photos/cutout/jacket-navy.webp"],
  [`jacket|${c.olive}`]: ["/photos/jacket-olive.webp", "/photos/cutout/jacket-olive.webp"],
  [`trousers|${c.black}`]: ["/photos/trousers-black.webp", "/photos/cutout/trousers-black.webp"],
  [`trousers|${c.charcoal}`]: ["/photos/trousers-charcoal.webp", "/photos/cutout/trousers-charcoal.webp"],
  [`trousers|${c.stone}`]: ["/photos/trousers-stone.webp", "/photos/cutout/trousers-stone.webp"],
  [`trousers|${c.olive}`]: ["/photos/trousers-olive.webp", "/photos/cutout/trousers-olive.webp"],
  [`trousers|${c.burgundy}`]: ["/photos/trousers-burgundy.webp", "/photos/cutout/trousers-burgundy.webp"],
  [`jeans|${c.denim}`]: ["/photos/jeans-blue.webp", "/photos/cutout/jeans-blue.webp"],
  [`sneakers|${c.white}`]: ["/photos/sneakers-white.webp", "/photos/cutout/sneakers-white.webp"],
  [`sneakers|${c.ivory}`]: ["/photos/sneakers-canvas.webp", "/photos/cutout/sneakers-canvas.webp"],
  [`loafers|${c.chocolate}`]: ["/photos/loafers-brown.webp", "/photos/cutout/loafers-brown.webp"],
  [`loafers|${c.black}`]: ["/photos/loafers-black.webp", "/photos/cutout/loafers-black.webp"],
  [`loafers|${c.camel}`]: ["/photos/loafers-suede.webp", "/photos/cutout/loafers-suede.webp"],
};

type G = Pick<Garment, "kind" | "color">;

/** Full product photo on the house backdrop (square). */
export function garmentPhoto(g: G): string | undefined {
  return table[`${g.kind}|${g.color}`]?.[0];
}

/** Transparent cut-out of the same product. */
export function garmentCutout(g: G): string | undefined {
  return table[`${g.kind}|${g.color}`]?.[1];
}

/** Complete outfit flat-lays and people photography. */
export const photos = {
  lookDate: "/photos/look-date.webp",
  lookWeekend: "/photos/look-weekend.webp",
  lookSummer: "/photos/look-summer.webp",
  lookOffDuty: "/photos/look-offduty.webp",
  lookCamel: "/photos/look-camel.webp",
  lookOlive: "/photos/look-olive.webp",
  personBefore: "/photos/person-before.webp",
  personAfter: "/photos/person-after.webp",
  creator: "/photos/creator.webp",
  hero: "/photos/hero.webp",
  problem: "/photos/problem.webp",
} as const;
