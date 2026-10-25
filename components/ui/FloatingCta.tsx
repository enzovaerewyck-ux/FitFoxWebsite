"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * Floating "join the waitlist" pill. Appears once the hero is scrolled past,
 * hides again while the early-access form itself is on screen.
 * Click → smooth scroll to the form and focus the email field.
 */
export function FloatingCta() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("early-access");
    const io = form
      ? new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 })
      : null;
    if (form && io) io.observe(form);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const show = pastHero && !formVisible;

  const goToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("early-access")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    window.setTimeout(() => document.getElementById("cta-email")?.focus({ preventScroll: true }), reduce ? 0 : 700);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6 sm:justify-end sm:px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="#early-access"
            onClick={goToForm}
            className="pointer-events-auto group relative inline-flex min-h-14 items-center gap-3 rounded-full bg-night py-2 pl-2 pr-6 text-on-night shadow-[var(--shadow-float)] ring-1 ring-white/10 transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream">
              <Image src="/fox-mark.webp" alt="" width={160} height={160} className="h-10 w-10" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] font-semibold">Join the waitlist</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e0a57d]">It&rsquo;s free</span>
            </span>
            <span aria-hidden className="ml-1 text-lg transition-transform group-hover:translate-y-0.5">↓</span>
            {!reduce && (
              <span aria-hidden className="absolute right-3 top-2 h-2 w-2 rounded-full bg-fox">
                <span className="absolute inset-0 animate-ping rounded-full bg-fox" />
              </span>
            )}
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
