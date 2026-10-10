"use client";

import { MotionConfig } from "framer-motion";

/** Respects the user's OS "reduce motion" setting for every Framer Motion animation. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
