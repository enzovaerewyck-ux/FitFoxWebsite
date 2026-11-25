"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Phone mock-up. The screen is a CSS container, so screen contents size themselves
 * in `cqw` units and stay pixel-perfect at any phone width (mobile → desktop).
 */
export function Phone({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  /** Accessible description of what the screen demonstrates. */
  label: string;
}) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative aspect-[9/19.2] rounded-[14%/6.6%] bg-night p-[3.2%] shadow-[0_2px_4px_rgb(20_20_18/0.12),0_40px_80px_-30px_rgb(60_40_20/0.55)] ring-1 ring-black/5 ${className}`}
    >
      <div className="@container relative h-full w-full overflow-hidden rounded-[11.5%/5.4%] bg-cream">
        {/* status bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[11cqw] items-center justify-between px-[7cqw] text-[3.4cqw] font-semibold text-ink">
          <span>9:41</span>
          <span className="absolute left-1/2 top-[2.6cqw] h-[6.4cqw] w-[26cqw] -translate-x-1/2 rounded-full bg-night" aria-hidden />
          <span className="flex items-center gap-[1.2cqw]" aria-hidden>
            <span className="flex items-end gap-[0.5cqw]">
              {[1.4, 2, 2.6, 3.2].map((h) => (
                <span key={h} className="w-[0.8cqw] rounded-sm bg-ink" style={{ height: `${h}cqw` }} />
              ))}
            </span>
            <span className="h-[2.8cqw] w-[5.4cqw] rounded-[0.8cqw] border-[0.35cqw] border-ink/80 p-[0.35cqw]">
              <span className="block h-full w-3/4 rounded-[0.3cqw] bg-ink" />
            </span>
          </span>
        </div>
        <div aria-hidden className="absolute inset-0 pt-[11cqw]">
          {children}
        </div>
      </div>
    </figure>
  );
}

/** Small app header that mirrors the real app ("FitFox" serif + label). */
export function AppHeader({ eyebrow, title }: { eyebrow?: string; title?: string }) {
  return (
    <div className="px-[6cqw] pb-[3cqw] pt-[2cqw]">
      <div className="flex items-center justify-between">
        <span className="font-display text-[5.6cqw] font-bold italic tracking-[-0.02em]">FitFox</span>
        <span className="relative h-[7cqw] w-[7cqw] overflow-hidden rounded-full bg-sand ring-[0.4cqw] ring-fox/40">
          <Image src="/brand/vexi-avatar.webp" alt="" fill sizes="40px" className="object-cover" />
        </span>
      </div>
      {eyebrow && <p className="mt-[3.5cqw] text-[2.6cqw] font-bold uppercase tracking-[0.2em] text-fox-ink">{eyebrow}</p>}
      {title && <p className="mt-[1cqw] font-display text-[6.6cqw] leading-tight">{title}</p>}
    </div>
  );
}

/**
 * Drives a looping, step-based demo animation — but only while the phone is on screen.
 * With reduced motion it jumps straight to the final step and stays there.
 */
export function useDemoLoop(steps: number, stepMs = 1100, holdMs = 2600) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(steps - 1);
      return;
    }
    if (!inView) return;
    const delay = step === steps - 1 ? holdMs : stepMs;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % steps), delay);
    return () => window.clearTimeout(t);
  }, [inView, step, steps, stepMs, holdMs, reduce]);

  return { ref, step, reduce: !!reduce };
}

/** Text that types itself out, driven by a 0→1 progress. */
export function TypedText({ text, progress, caret = true }: { text: string; progress: number; caret?: boolean }) {
  const shown = text.slice(0, Math.round(text.length * Math.min(1, Math.max(0, progress))));
  return (
    <>
      {shown}
      {caret && progress < 1 && <span className="ml-[0.3cqw] inline-block h-[1em] w-[0.5cqw] translate-y-[0.15em] animate-pulse bg-fox" />}
    </>
  );
}
