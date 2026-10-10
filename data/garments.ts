export type GarmentKind =
  | "coat"
  | "knit"
  | "tee"
  | "shirt"
  | "overshirt"
  | "jacket"
  | "trousers"
  | "jeans"
  | "skirt"
  | "sneakers"
  | "loafers"
  | "boots"
  | "bag";

export type Garment = {
  id: string;
  kind: GarmentKind;
  name: string;
  color: string;
  /** Optional accent color (lining, sole, buttons). */
  accent?: string;
};

/** Named garment palette — warm, editorial, wearable. */
export const garmentColors = {
  camel: "#c49a6c",
  cream: "#efe6d6",
  ivory: "#f6f1e7",
  black: "#1d1d1b",
  charcoal: "#3b3a37",
  navy: "#27324a",
  olive: "#5f6446",
  sage: "#a3ab8c",
  rust: "#b0582d",
  denim: "#5b7090",
  lightDenim: "#8fa3bd",
  white: "#fbfaf6",
  chocolate: "#5a3e2e",
  stone: "#b9ae9c",
  burgundy: "#6e2b2f",
} as const;
