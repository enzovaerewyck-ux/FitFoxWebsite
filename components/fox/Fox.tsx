"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { foxPoses, type FoxPose } from "./poses";

type FoxProps = {
  pose: FoxPose;
  /** Rendered width in px (height follows the asset ratio). Omit and size via className (e.g. "w-32 sm:w-44"). */
  width?: number;
  mirror?: boolean;
  /** Gentle idle sway. Keep for 1–2 foxes on screen at most. */
  idle?: boolean;
  /** Change this value to trigger a one-off reaction (hop + tilt). */
  reactKey?: string | number;
  /** Tilts the head/body slightly — used for "raised eyebrow" moments. */
  tilt?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  decorative?: boolean;
};

export function Fox({
  pose,
  width,
  mirror = false,
  idle = false,
  reactKey,
  tilt = 0,
  priority = false,
  className = "",
  sizes,
  decorative = false,
}: FoxProps) {
  const asset = foxPoses[pose];
  const reduce = useReducedMotion();
  const cropped = pose === "wave" || pose === "portrait";

  return (
    <motion.div
      className={`relative select-none ${className}`}
      style={{ width, aspectRatio: `${asset.width} / ${asset.height}`, transformOrigin: "50% 100%" }}
      animate={reduce ? undefined : { rotate: tilt }}
      transition={{ type: "spring", stiffness: 200, damping: 14 }}
    >
      <motion.div
        key={reactKey ?? "static"}
        className="h-full w-full"
        initial={reduce || reactKey === undefined ? false : { y: 0, rotate: 0 }}
        animate={
          reduce || reactKey === undefined
            ? undefined
            : { y: [0, -10, 0], rotate: [0, mirror ? 4 : -4, 0] }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "50% 100%" }}
      >
        <div
          className={`h-full w-full ${idle && !reduce ? "animate-sway" : ""}`}
          style={{ transformOrigin: "50% 100%" }}
        >
          <Image
            src={asset.src}
            alt={decorative ? "" : asset.alt}
            width={asset.width}
            height={asset.height}
            priority={priority}
            sizes={sizes ?? (width ? `${width}px` : "240px")}
            draggable={false}
            className="h-full w-full object-contain drop-shadow-[0_14px_18px_rgba(60,40,20,0.18)]"
            style={{
              transform: mirror ? "scaleX(-1)" : undefined,
              // Bust-crops end abruptly at the bottom — fade them out softly.
              maskImage: cropped ? "linear-gradient(to bottom, #000 78%, transparent 100%)" : undefined,
              WebkitMaskImage: cropped ? "linear-gradient(to bottom, #000 78%, transparent 100%)" : undefined,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
