"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { brand } from "@/config/brand";

type Status = "idle" | "sending" | "done" | "invalid" | "failed";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [wiggle, setWiggle] = useState(0);
  const [honey, setHoney] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    // The offline preview.html has no server: show the success state without sending.
    if (typeof window !== "undefined" && !/^https?:$/.test(window.location.protocol)) {
      setStatus("done");
      return;
    }
    try {
      const res = await fetch(brand.waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), website: honey, consent: brand.waitlistConsent, source: "website" }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section id="early-access" aria-labelledby="cta-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-night text-on-night">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-fox/25 blur-[120px]" aria-hidden />
        <div className="container-brand relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 !text-[#e0a57d]">Early access</p>
              <h2 id="cta-title" className="display text-balance text-[2.9rem] sm:text-7xl lg:text-[5.6rem]">
                Ready to love your wardrobe <span className="italic">again?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 max-w-xl rounded-2xl border border-on-night/15 bg-night-2 p-6"
                    role="status"
                  >
                    <p className="font-display text-2xl italic">You&rsquo;re on the list.</p>
                    <p className="mt-2 text-on-night/70">We&rsquo;ll email {email} as soon as your spot in the beta opens.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} noValidate className="mt-10 max-w-xl" exit={{ opacity: 0 }}>
                    <label htmlFor="cta-email" className="mb-2 block text-sm font-semibold text-on-night/80">
                      Your email
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        id="cta-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "invalid" || status === "failed") setStatus("idle");
                        }}
                        aria-invalid={status === "invalid"}
                        aria-describedby="cta-help"
                        className="min-h-14 flex-1 rounded-[10px] border border-on-night/20 bg-night-2 px-4 text-base text-on-night placeholder:text-on-night/40 outline-none transition-colors focus:border-fox"
                      />
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        onMouseEnter={() => setWiggle((w) => w + 1)}
                        onFocus={() => setWiggle((w) => w + 1)}
                        className="min-h-14 rounded-[10px] bg-cream px-7 font-semibold text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60"
                      >
                        {status === "sending" ? "Joining…" : "Get early access"}
                      </button>
                    </div>
                    {/* Honeypot for bots — hidden from people and assistive tech */}
                    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                      <label htmlFor="cta-website">Website</label>
                      <input id="cta-website" type="text" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
                    </div>
                    <p
                      id="cta-help"
                      role={status === "invalid" || status === "failed" ? "alert" : undefined}
                      className={`mt-3 text-sm ${status === "invalid" || status === "failed" ? "text-[#f0a57a]" : "text-on-night/55"}`}
                    >
                      {status === "invalid"
                        ? "That email doesn't look quite right."
                        : status === "failed"
                          ? "Something went wrong on our side. Mind trying again in a minute?"
                          : "We'll send your invite as soon as there's room. No spam, promise. Unsubscribe anytime."}
                    </p>
                    <a href="#early-access" onClick={(e) => { e.preventDefault(); document.getElementById("cta-email")?.focus(); }} className="mt-5 inline-block text-sm font-semibold text-on-night underline decoration-fox underline-offset-4 hover:text-[#e0a57d]">
                      Join the beta →
                    </a>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>

          <div className="relative flex items-end justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute bottom-[88%] right-[62%] z-10 hidden w-max lg:block">
                <FoxBubble text={status === "done" ? "Welcome in." : "Your closet's been waiting."} tail="bottom-right" tone="paper" />
              </div>
              <div className="absolute bottom-[101%] left-[40%] z-10 w-max lg:hidden">
                <FoxBubble text={status === "done" ? "Welcome in." : "Your closet's been waiting."} tail="bottom-left" tone="paper" size="sm" />
              </div>
              <Fox pose="cool" reactKey={wiggle || (status === "done" ? "done" : undefined)} className="w-[150px] sm:w-[190px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
