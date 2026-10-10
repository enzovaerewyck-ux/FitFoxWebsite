/**
 * Central brand configuration.
 * Rename the whole website from here — never hardcode the brand name in components.
 */
export const brand = {
  name: "FitFox",
  /** Name of the fox character (used sparingly in copy). */
  foxName: "Vex",
  tagline: "Your personal AI stylist.",
  promise: "See a look you love. Make it yours.",
  description:
    "Full wardrobe, nothing to wear? FitFox is your personal AI stylist: it learns your style, builds outfits from the clothes you already own and helps you discover what to wear next.",
  url: "https://fitfox.app", // TODO: replace with the final production domain
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
  title: `${brand.name} — Your Personal AI Stylist`,
  description: brand.description,
};
