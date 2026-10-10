import { garmentColors as c, type Garment } from "./garments";

export type WardrobeStatus = "owned" | "similar" | "missing";

export type WardrobeItem = Garment & { status: WardrobeStatus; note: string };

export const wardrobeItems: WardrobeItem[] = [
  { id: "w1", kind: "sneakers", name: "White sneakers", color: c.white, accent: c.stone, status: "owned", note: "Worn 14× this season" },
  { id: "w2", kind: "knit", name: "Cream knit", color: c.cream, status: "owned", note: "Goes with almost everything" },
  { id: "w3", kind: "trousers", name: "Black trousers", color: c.black, status: "owned", note: "Your most-used piece" },
  { id: "w4", kind: "overshirt", name: "Navy overshirt", color: c.navy, accent: c.cream, status: "similar", note: "Close to your indigo shirt" },
  { id: "w5", kind: "coat", name: "Beige coat", color: c.camel, accent: c.chocolate, status: "owned", note: "Not worn in 41 days" },
  { id: "w6", kind: "tee", name: "White tee", color: c.white, status: "owned", note: "You own four. Four." },
  { id: "w7", kind: "loafers", name: "Brown loafers", color: c.chocolate, status: "missing", note: "Would unlock 9 new looks" },
  { id: "w8", kind: "jeans", name: "Straight jeans", color: c.denim, status: "similar", note: "Similar to your dark denim" },
];

export const wardrobeStatusLabel: Record<WardrobeStatus, string> = {
  owned: "Owned ✓",
  similar: "Similar ✓",
  missing: "Missing",
};
