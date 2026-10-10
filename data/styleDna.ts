export type StyleTrait = {
  id: string;
  label: string;
  value: number;
  /** What the fox says when you hover this trait. */
  foxLine: string;
};

export const styleTraits: StyleTrait[] = [
  { id: "minimal", label: "Minimal", value: 82, foxLine: "Predictable. But in a good way." },
  { id: "smart-casual", label: "Smart Casual", value: 71, foxLine: "Dinner-ready without trying. Nice." },
  { id: "classic", label: "Classic", value: 64, foxLine: "Relax. Beige suits you." },
  { id: "streetwear", label: "Streetwear", value: 22, foxLine: "Room to play here. Just saying." },
];

export type StyleSignal = {
  id: string;
  label: string;
  level: 1 | 2 | 3 | 4 | 5;
  note: string;
};

export const styleSignals: StyleSignal[] = [
  { id: "creativity", label: "Creativity", level: 3, note: "Growing" },
  { id: "versatility", label: "Versatility", level: 4, note: "Strong" },
  { id: "closet", label: "Closet Usage", level: 2, note: "Half your wardrobe is sleeping" },
  { id: "color", label: "Color Exploration", level: 1, note: "Mostly neutrals" },
];

export const signatureColors = ["#1d1d1b", "#efe6d6", "#c49a6c", "#27324a", "#b9ae9c"];
