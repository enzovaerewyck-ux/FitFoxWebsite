export type JourneyTask = { id: string; label: string; done: boolean };

export const journeyChapter = {
  number: 1,
  title: "Discover your style",
  next: "Chapter 2 — Break your patterns",
  tasks: [
    { id: "dna", label: "Create your Style DNA", done: true },
    { id: "first-look", label: "Create your first look", done: true },
    { id: "save-three", label: "Save three looks", done: true },
    { id: "wardrobe-three", label: "Add three wardrobe pieces", done: false },
    { id: "comfort", label: "Try something outside your comfort zone", done: false },
  ] as JourneyTask[],
};

export const upcomingChapters = [
  { number: 2, title: "Break your patterns" },
  { number: 3, title: "Master your wardrobe" },
  { number: 4, title: "Signature style" },
];
