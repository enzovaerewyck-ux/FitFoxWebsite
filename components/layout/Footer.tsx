import { brand } from "@/config/brand";
import { Wordmark } from "@/components/navigation/Wordmark";

const links = [
  { label: "Instagram", href: brand.social.instagram, external: true },
  { label: "TikTok", href: brand.social.tiktok, external: true },
  { label: "Privacy", href: "#" }, // TODO(legal): add privacy page
  { label: "Terms", href: "#" }, // TODO(legal): add terms page
  { label: "Contact", href: `mailto:${brand.contactEmail}` },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="container-brand flex flex-col gap-8 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Wordmark className="h-[84px]" />
          <p className="mt-3 text-ink-soft">{brand.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-medium">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-ink/80 underline-offset-4 hover:text-fox-ink hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-brand flex items-center justify-between border-t border-line-soft py-6 text-sm text-ink-mute">
        <p>
          © {new Date().getFullYear()} {brand.name}
        </p>
        {/* Fox tail flourish */}
        <svg viewBox="0 0 80 40" className="h-8 w-16" aria-hidden>
          <path d="M6 34C20 36 44 30 58 18c6-5 10-11 12-16 4 8 4 18-2 26-8 10-24 14-40 14-10 0-18-3-22-8Z" fill="var(--color-fox)" />
          <path d="M70 2c4 8 4 18-2 26-3 4-8 7-13 9 6-6 9-13 9-20 2-5 4-10 6-15Z" fill="var(--color-paper)" stroke="var(--color-line)" strokeWidth=".8" />
        </svg>
      </div>
    </footer>
  );
}
