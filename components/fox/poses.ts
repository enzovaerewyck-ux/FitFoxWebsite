/**
 * Fox pose registry.
 * Current assets are cut-outs from the app screenshots (placeholders at modest resolution).
 * TODO(brand): replace with high-res transparent PNG/WebP exports from the illustrator.
 * TODO(brand): add dedicated poses — "inspect" (magnifier / looking at outfit), "sit" (calm, brand story),
 *              "point" (pointing at UI), "tail-flick" (separate tail layer for animation).
 *              Until then, those map to the closest existing pose via `poseFallback`.
 */
export type FoxPose = "wave" | "cool" | "portrait" | "cheer" | "peek";
export type FuturePose = "inspect" | "sit" | "point";

type PoseAsset = { src: string; width: number; height: number; alt: string };

export const foxPoses: Record<FoxPose, PoseAsset> = {
  wave: { src: "/fox/fox-wave.webp", width: 230, height: 246, alt: "The fox stylist in a cream cable knit, waving hello" },
  cool: { src: "/fox/fox-cool.webp", width: 192, height: 294, alt: "The fox stylist in sunglasses, olive blazer and cream trousers" },
  portrait: { src: "/fox/fox-cool-portrait.webp", width: 100, height: 163, alt: "Close-up of the fox stylist in sunglasses, looking unimpressed" },
  cheer: { src: "/fox/fox-cheer.webp", width: 135, height: 194, alt: "The fox stylist cheering with a raised paw" },
  peek: { src: "/fox/fox-peek.webp", width: 150, height: 306, alt: "The fox peeking out from behind the wardrobe" },
};

export const poseFallback: Record<FuturePose, FoxPose> = {
  inspect: "cool",
  sit: "wave",
  point: "cheer",
};
