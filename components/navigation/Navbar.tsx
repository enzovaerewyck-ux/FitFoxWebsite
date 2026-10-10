"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand } from "@/config/brand";
import { navLinks, ctaHref } from "@/config/navigation";
import { Wordmark } from "./Wordmark";
import { Fox } from "@/components/fox/Fox";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-cream/92 shadow-[0_8px_30px_-24px_rgba(60,40,20,0.5)] backdrop-blur-md" : "border-b border-transparent bg-cream/0"
      }`}
    >
      <nav aria-label="Main" className="container-brand flex h-[72px] items-center justify-between gap-6">
        {/* Plain anchor: this is a one-page site (also keeps the standalone preview.html working). */}
        <a href="#main" aria-label={`${brand.name} — back to top`} className="shrink-0" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative text-[15px] font-medium text-ink/80 transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-fox after:transition-all hover:after:w-full">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={ctaHref}
            className="hidden min-h-11 items-center rounded-[10px] bg-night px-5 text-sm font-semibold text-on-night transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Get early access
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[2px] w-5 bg-ink transition-all ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[2px] w-5 bg-ink transition-all ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </nav>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed panel. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-cream lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-brand flex min-h-full flex-col pb-10 pt-6">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="border-b border-line-soft"
                  >
                    <a href={l.href} onClick={() => setOpen(false)} className="display block py-5 text-[2.1rem]">
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-end justify-between gap-4 pt-10">
                <a
                  href={ctaHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-13 flex-1 items-center justify-center rounded-[10px] bg-night px-6 py-4 font-semibold text-on-night"
                >
                  Get early access
                </a>
                <Fox pose="wave" width={96} decorative />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
