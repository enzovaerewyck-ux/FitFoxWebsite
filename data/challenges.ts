import type { FoxPose } from "@/components/fox/poses";
import { garmentColors as c, type Garment } from "./garments";

export type Challenge = {
  id: string;
  title: string;
  lines: string[];
  detail: string;
  tag: string;
  tone: "cream" | "night" | "fox" | "sand";
  foxPose: FoxPose;
  foxLine: string;
  /** Small playful illustration on the card. */
  visual: Pick<Garment, "kind" | "color" | "accent" | "name">;
  /** Draw a strike-through over the visual (e.g. "no black"). */
  crossed?: boolean;
};

export const challenges: Challenge[] = [
  { id: "no-black", title: "No black", lines: ["No black", "today"], detail: "Build one look without a single black piece. Navy doesn't count as cheating. Mostly.", tag: "Colour", tone: "night", foxPose: "cool", foxLine: "No black today. Yes, I'm serious.", visual: { kind: "tee", color: c.black, name: "Black tee" }, crossed: true },
  { id: "one-three", title: "One item. Three looks.", lines: ["One item.", "Three looks."], detail: "Pick one piece you own and style it three different ways this week.", tag: "Wardrobe", tone: "cream", foxPose: "cheer", foxLine: "Same jacket. Three personalities.", visual: { kind: "overshirt", color: c.olive, accent: c.cream, name: "Overshirt" } },
  { id: "date-150", title: "Date night under €150", lines: ["Date night", "under €150"], detail: "A look that feels special, without the special price tag.", tag: "Budget", tone: "fox", foxPose: "wave", foxLine: "Romance on a budget. I love it.", visual: { kind: "loafers", color: c.chocolate, name: "Loafers" } },
  { id: "forgotten", title: "Forgotten favourite", lines: ["Forgotten", "favourite"], detail: "Wear something you haven't touched in 60 days. It misses you.", tag: "Closet", tone: "sand", foxPose: "cheer", foxLine: "Found it behind your gym bag.", visual: { kind: "jacket", color: c.navy, name: "Forgotten jacket" } },
  { id: "outside", title: "One step outside", lines: ["One step", "outside"], detail: "Add one piece from a style you'd usually skip. Just one.", tag: "Explore", tone: "cream", foxPose: "cool", foxLine: "Comfort zones are overrated.", visual: { kind: "trousers", color: c.burgundy, name: "Burgundy trousers" } },
  { id: "airport", title: "Airport fit", lines: ["Airport", "fit"], detail: "Comfortable enough for 9 hours. Sharp enough for arrivals.", tag: "Travel", tone: "night", foxPose: "wave", foxLine: "Gate 14. Looking good.", visual: { kind: "sneakers", color: c.white, accent: c.stone, name: "Sneakers" } },
];
