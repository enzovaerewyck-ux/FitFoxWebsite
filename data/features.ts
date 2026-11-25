export type FeatureKey = "create" | "wardrobe" | "makeItMine" | "tryOn" | "dailyLook";

/** Main feature blocks, in page order. Copy follows the website brief (sell the outfit, not the algorithm). */
export const features: {
  key: FeatureKey;
  name: string;
  title: string;
  accent: string;
  body: string;
  points: string[];
  note: string;
  screenLabel: string;
}[] = [
  {
    key: "create",
    name: "Create studio",
    title: "More outfits.",
    accent: "Same wardrobe.",
    body: "Tell FitFox where you're going (a date, a meeting, a rainy Sunday) and get looks built from your own closet. Or pick that one piece you want to wear and let your stylist build the outfit around it.",
    points: ["Any occasion or idea", "Your colours and style", "Built around one piece"],
    note: "Your next favourite outfit might already be in your wardrobe.",
    screenLabel: "The Create studio: a request is typed in and four outfits made from your own clothes appear",
  },
  {
    key: "wardrobe",
    name: "Digital wardrobe",
    title: "Your entire wardrobe.",
    accent: "In your pocket.",
    body: "You probably own more than you remember. Snap your clothes in one go, see everything at a glance and rediscover the pieces hiding at the back of the closet.",
    points: ["Up to 40 pieces per photo session", "Category, colour, fit & season recognised", "Sort, filter and wardrobe stats"],
    note: "Rediscover what you already own.",
    screenLabel: "A Quick Photo Session filling the digital wardrobe, each piece recognised automatically",
  },
  {
    key: "makeItMine",
    name: "Make it mine",
    title: "Love their outfit?",
    accent: "Make it yours.",
    body: "Spot a look you love in the FitFox community and tap Make it mine. FitFox finds the closest pieces in your own wardrobe, so you get the same vibe without buying the whole outfit.",
    points: ["Looks from the FitFox community", "Matched to your own closet", "Inspired by them, styled by you"],
    note: "Same vibe. Your own wardrobe.",
    screenLabel: "Make it mine: a community outfit is matched piece by piece to clothes in your closet",
  },
  {
    key: "tryOn",
    name: "Virtual try-on",
    title: "See it on you",
    accent: "before you wear it.",
    body: "Add one full-body photo and preview a suggested outfit on yourself. Less guessing in front of the mirror, more confidence on your way out.",
    points: ["One full-body photo", "Preview any suggested look", "Try the look before the clothes"],
    note: "Less guessing. More confidence.",
    screenLabel: "Virtual try-on: a slider moves between your own photo and a preview of the new outfit on you",
  },
  {
    key: "dailyLook",
    name: "Daily look",
    title: "Your morning outfit,",
    accent: "already figured out.",
    body: "Open the app and today's look is waiting. It checks the weather, skips whatever's in the wash and keeps rotating, so you don't end up in the same three combinations.",
    points: ["Weather-aware", "Skips what's in the laundry", "Fresh combinations every day"],
    note: "Different day. Fresh outfit.",
    screenLabel: "The Daily Look: today's outfit with the weather and two skipped laundry items",
  },
];
