"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { journeyChapter, upcomingChapters } from "@/data/journey";

function Flame() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-1.6.7-2.8 1.6-3.7.2 1.4.9 2.2 1.9 2.4-.6-2.6-.1-5.4.5-7.7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StyleJourney() {
  const [tasks, setTasks] = useState(journeyChapter.tasks);
  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const complete = done === total;

  const line = complete ? "Chapter two. Don't get cocky." : done >= 4 ? "One more. You've got this." : "Three down. Keep going.";

  return (
    <section id="challenges" aria-labelledby="journey-title" className="section-y border-t border-line-soft bg-paper">
      <div className="container-brand grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeader
            id="journey-title"
            eyebrow="Style journey"
            title={
              <>
                A style that <span className="italic">grows with you.</span>
              </>
            }
            intro="Small chapters, small wins. No points to chase, no pressure. Just a friendly nudge to discover what you really love wearing."
          />
          <Reveal delay={0.1} className="mt-10 hidden items-end gap-2 lg:flex">
            <Fox pose="wave" reactKey={done} className="w-[130px]" />
            <FoxBubble text={line} tail="left" className="mb-16" />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[var(--radius-2xl)] border border-line bg-cream p-6 shadow-card sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Chapter {journeyChapter.number}</p>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl">{journeyChapter.title}</h3>
              </div>
              <p className="flex items-center gap-1 font-display text-2xl text-fox" aria-label="4 day streak">
                <Flame />4
              </p>
            </div>

            <div className="mt-7">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold">Progress</span>
                <span className="font-display text-xl" aria-live="polite">
                  {done} / {total}
                </span>
              </div>
              <div className="mt-2.5 flex gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label="Chapter progress">
                {tasks.map((t) => (
                  <span key={t.id} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line-soft">
                    <motion.span className="block h-full bg-fox" initial={false} animate={{ width: t.done ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-7 space-y-2">
              {tasks.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    aria-pressed={t.done}
                    onClick={() => setTasks((ts) => ts.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
                    className="flex min-h-12 w-full items-center gap-3.5 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors hover:border-line hover:bg-paper"
                  >
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition-colors ${
                        t.done ? "border-fox bg-fox text-on-night" : "border-line text-transparent"
                      }`}
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className={`text-[15px] sm:text-base ${t.done ? "text-ink-soft line-through decoration-line" : "font-medium"}`}>{t.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-line pt-5">
              <ol className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
                {upcomingChapters.map((c) => (
                  <li key={c.number} className={`flex items-center gap-2 ${complete && c.number === 2 ? "font-semibold text-fox-ink" : ""}`}>
                    <span className="text-xs" aria-hidden>{complete && c.number === 2 ? "→" : "○"}</span>
                    Ch. {c.number} · {c.title}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 flex items-end gap-2 lg:hidden">
              <Fox pose="wave" reactKey={done} className="w-[80px]" decorative />
              <FoxBubble text={line} tail="left" size="sm" className="mb-8" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
