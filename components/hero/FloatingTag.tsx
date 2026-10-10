"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  label: string;
  value: string;
  className?: string;
  delay?: number;
  meter?: number;
  owned?: boolean;
};

/** Small floating app-UI card used around the hero visual. */
export function FloatingTag({ label, value, className = "", delay = 0, meter, owned }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-10 flex ${className}`}
    >
      <div
        className={`min-w-[150px] rounded-2xl border border-line/80 bg-paper/95 px-4 py-3 shadow-float backdrop-blur ${reduce ? "" : "animate-float"}`}
        style={{ animationDelay: `${delay * 1.7}s` }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fox-ink">{label}</p>
        <p className={`mt-1 text-[15px] font-semibold ${owned ? "text-owned" : "text-ink"}`}>{value}</p>
        {meter !== undefined && (
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line-soft">
            <motion.div
              className="h-full rounded-full bg-fox"
              initial={{ width: 0 }}
              animate={{ width: `${meter}%` }}
              transition={{ delay: delay + 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
