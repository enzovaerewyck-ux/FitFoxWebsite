import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, intro, align = "left", tone = "light", id, className = "" }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow mb-5 ${tone === "dark" ? "!text-[#e0a57d]" : ""}`}>{eyebrow}</p>}
      <h2
        id={id}
        className={`display text-balance text-[2.6rem] sm:text-6xl lg:text-[4.4rem] ${tone === "dark" ? "text-on-night" : "text-ink"}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-6 text-pretty text-lg leading-relaxed sm:text-xl ${center ? "mx-auto" : ""} max-w-2xl ${
            tone === "dark" ? "text-on-night/70" : "text-ink-soft"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
