import Image from "next/image";
import { brand } from "@/config/brand";

/** Brand logo: Vex walking + the FitFox wordmark (public/logo.webp). */
export function Wordmark({ className = "h-[58px]", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={674}
      height={360}
      priority={priority}
      sizes="160px"
      className={`w-auto ${className}`}
    />
  );
}
