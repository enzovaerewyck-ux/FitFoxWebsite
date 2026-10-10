"use client";

import { motion } from "framer-motion";
import { motionTokens } from "@/config/tokens";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  y?: number;
};

/** Fades + lifts content in once, when it scrolls into view. */
export function Reveal({ children, delay = 0, className, as = "div", y = motionTokens.revealOffset }: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: motionTokens.duration.slow, ease: motionTokens.ease, delay }}
    >
      {children}
    </Comp>
  );
}
