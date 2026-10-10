import { garmentColors as c, type Garment } from "./garments";
import { photos } from "./garmentPhotos";

export type Look = {
  id: string;
  title: string;
  meta: string;
  price: string;
  backdrop: string;
  items: Garment[];
  /** Real flat-lay photo of the complete outfit. */
  photo?: string;
  alt?: string;
};

export const stylistChips = [
  "Date night",
  "Work",
  "Summer",
  "Use my wardrobe",
  "With my sneakers",
  "Surprise me",
] as const;

export const examplePrompt = "Smart casual dinner outfit,\nunder €200,\nrelaxed fit.";

export const resultLooks: Look[] = [
  {
    id: "relaxed-date",
    title: "Relaxed Date Night",
    meta: "3 pieces owned",
    price: "€145",
    backdrop: "#e9dfd0",
    photo: photos.lookDate,
    alt: "Navy overshirt, stone chinos and brown penny loafers laid out on cream linen",
    items: [
      { id: "a1", kind: "overshirt", name: "Navy overshirt", color: c.navy, accent: c.cream },
      { id: "a2", kind: "trousers", name: "Stone trousers", color: c.stone },
      { id: "a3", kind: "loafers", name: "Brown loafers", color: c.chocolate },
    ],
  },
  {
    id: "city-weekend",
    title: "City Weekend",
    meta: "2 pieces owned",
    price: "€120",
    backdrop: "#dfe2d6",
    photo: photos.lookWeekend,
    alt: "Cream ribbed knit, straight blue jeans and white leather sneakers laid out on cream linen",
    items: [
      { id: "b1", kind: "knit", name: "Cream knit", color: c.cream },
      { id: "b2", kind: "jeans", name: "Straight jeans", color: c.denim },
      { id: "b3", kind: "sneakers", name: "White sneakers", color: c.white, accent: c.stone },
    ],
  },
  {
    id: "summer-dinner",
    title: "Summer Dinner",
    meta: "1 piece owned",
    price: "€185",
    backdrop: "#efe1cf",
    photo: photos.lookSummer,
    alt: "Ivory linen shirt, olive trousers and camel suede loafers laid out on cream linen",
    items: [
      { id: "c1", kind: "shirt", name: "Linen shirt", color: c.ivory },
      { id: "c2", kind: "trousers", name: "Olive trousers", color: c.olive },
      { id: "c3", kind: "loafers", name: "Suede loafers", color: c.camel },
    ],
  },
  {
    id: "off-duty",
    title: "Off-Duty Minimal",
    meta: "All owned",
    price: "€0",
    backdrop: "#e4e0da",
    photo: photos.lookOffDuty,
    alt: "White t-shirt, black tailored trousers and white sneakers laid out on cream linen",
    items: [
      { id: "d1", kind: "tee", name: "White tee", color: c.white },
      { id: "d2", kind: "trousers", name: "Black trousers", color: c.black },
      { id: "d3", kind: "sneakers", name: "White sneakers", color: c.white, accent: c.stone },
    ],
  },
];

/* ---------- Make it mine ---------- */

export type OutfitSlot = "outer" | "top" | "bottom" | "shoes";

export type Outfit = Record<OutfitSlot, Garment>;

export const baseOutfit: Outfit = {
  outer: { id: "m-outer", kind: "coat", name: "Camel coat", color: c.camel, accent: c.chocolate },
  top: { id: "m-top", kind: "knit", name: "Cream knit", color: c.cream },
  bottom: { id: "m-bottom", kind: "trousers", name: "Charcoal trousers", color: c.charcoal },
  shoes: { id: "m-shoes", kind: "loafers", name: "Black loafers", color: c.black },
};

export type Tweak = {
  id: string;
  label: string;
  slot: OutfitSlot;
  replacement: Garment;
  reason: string;
  foxLine: string;
};

export const tweaks: Tweak[] = [
  { id: "casual", label: "More casual", slot: "outer", replacement: { id: "t-casual", kind: "overshirt", name: "Olive overshirt", color: c.olive, accent: c.cream }, reason: "Swapped the coat for an overshirt", foxLine: "Much better." },
  { id: "cheaper", label: "Less expensive", slot: "shoes", replacement: { id: "t-cheaper", kind: "sneakers", name: "Canvas sneakers", color: c.ivory, accent: c.stone }, reason: "€120 less — same vibe", foxLine: "Your wallet says thanks." },
  { id: "warmer", label: "Warmer", slot: "top", replacement: { id: "t-warmer", kind: "knit", name: "Chunky rust knit", color: c.rust }, reason: "Heavier knit, same shape", foxLine: "Cozy. Still sharp." },
  { id: "my-sneakers", label: "Use my sneakers", slot: "shoes", replacement: { id: "t-mysneakers", kind: "sneakers", name: "Your white sneakers", color: c.white, accent: c.stone }, reason: "From your wardrobe", foxLine: "Told you they'd work." },
  { id: "colour", label: "Change colour", slot: "bottom", replacement: { id: "t-colour", kind: "trousers", name: "Stone trousers", color: c.stone }, reason: "Lighter trousers, softer contrast", foxLine: "Look at you, trying colours." },
  { id: "wardrobe", label: "Use more from my wardrobe", slot: "outer", replacement: { id: "t-wardrobe", kind: "jacket", name: "Your navy jacket", color: c.navy }, reason: "Your jacket, finally out of the closet", foxLine: "Welcome back, jacket." },
  { id: "surprise", label: "Surprise me", slot: "bottom", replacement: { id: "t-surprise", kind: "trousers", name: "Burgundy trousers", color: c.burgundy }, reason: "One bold piece, the rest stays calm", foxLine: "Trust me on this one." },
];
