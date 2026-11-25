/**
 * Central brand configuration.
 * Rename the whole website from here — never hardcode the brand name in components.
 */
export const brand = {
  name: "FitFox",
  /** Logo lockup (fox + wordmark). Replace this file when the name changes. 674×360, transparent. */
  logo: "/logo.webp",
  /** Name of the fox character (used sparingly in copy). */
  foxName: "Vexi",
  tagline: "Your wardrobe has more potential than you think.",
  promise: "More outfits. Same wardrobe.",
  /** Public launch moment, used in hero, CTA and FAQ. */
  launch: "January 2027",
  description:
    "A closet full of clothes and nothing to wear? FitFox gets to know the clothes you already own and shows you new outfits, looks you can recreate, and how they look on you. Launching January 2027.",
  url: "https://fit-fox-website.vercel.app", // TODO: replace when a custom domain is connected
  social: {
    instagram: "https://instagram.com/", // TODO: add real handle
    tiktok: "https://tiktok.com/", // TODO: add real handle
  },
  contactEmail: "hello@fitfox.app", // TODO: replace with real address
  /** Early-access form endpoint (app/api/waitlist → Google Sheet). */
  waitlistEndpoint: "/api/waitlist",
  /** Stored with each signup as proof of consent. Keep in sync with the text under the form. */
  waitlistConsent: "Agreed to receive early-access and product update emails. Unsubscribe anytime.",
} as const;

export const seo = {
  title: `${brand.name} — More outfits. Same wardrobe.`,
  description: brand.description,
};
