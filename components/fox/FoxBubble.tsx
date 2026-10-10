"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Tail = "left" | "right" | "bottom-left" | "bottom-right" | "none";

type FoxBubbleProps = {
  text: string;
  tail?: Tail;
  className?: string;
  tone?: "paper" | "night";
  size?: "sm" | "md" | "lg";
};

const tailClass: Record<Tail, string> = {
  left: "left-[-6px] top-1/2 -translate-y-1/2",
  right: "right-[-6px] top-1/2 -translate-y-1/2",
  "bottom-left": "left-6 bottom-[-6px]",
  "bottom-right": "right-6 bottom-[-6px]",
  none: "hidden",
};

const sizeClass = {
  sm: "px-3.5 py-2 text-[13px]",
  md: "px-4 py-2.5 text-[15px]",
  lg: "px-5 py-3.5 text-lg",
};

/** A speech bubble in the fox's voice. Text changes animate in place. */
export function FoxBubble({ text, tail = "bottom-left", className = "", tone = "paper", size = "md" }: FoxBubbleProps) {
  const reduce = useReducedMotion();
  const toneClass =
    tone === "night"
      ? "bg-night text-on-night border-night"
      : "bg-paper text-ink border-line";

  return (
    <div
      role="note"
      aria-live="polite"
      className={`relative inline-block rounded-2xl border font-display italic leading-snug shadow-float ${toneClass} ${sizeClass[size]} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={text}
          className="block"
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span
        aria-hidden
        className={`absolute h-3 w-3 rotate-45 border ${toneClass} ${tailClass[tail]} ${
          tail === "left" ? "border-r-0 border-t-0" : tail === "right" ? "border-b-0 border-l-0" : "border-l-0 border-t-0"
        }`}
      />
    </div>
  );
}
