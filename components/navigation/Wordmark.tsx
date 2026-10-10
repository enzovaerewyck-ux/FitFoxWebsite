import { brand } from "@/config/brand";

/** Text wordmark matching the app: bold italic serif. */
export function Wordmark({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  return (
    <span
      className={`font-display text-[1.7rem] font-bold italic leading-none tracking-[-0.02em] ${
        tone === "light" ? "text-on-night" : "text-ink"
      } ${className}`}
    >
      {brand.name}
    </span>
  );
}
