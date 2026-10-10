import Image from "next/image";
import type { Garment, GarmentKind } from "@/data/garments";
import { garmentCutout, garmentPhoto } from "@/data/garmentPhotos";

/**
 * Editorial flat-lay garment illustrations (SVG).
 * TODO(content): swap for real product / flat-lay photography when available —
 * each data item can later carry an `image` field; keep this as the graceful fallback.
 */

function mix(hex: string, target: "black" | "white", amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const t = target === "black" ? 0 : 255;
  const m = (c: number) => Math.round(c + (t - c) * amount);
  return `rgb(${m(r)} ${m(g)} ${m(b)})`;
}

type ArtProps = { c: string; d: string; l: string; a: string };

const shapes: Record<GarmentKind, (p: ArtProps) => React.ReactNode> = {
  coat: ({ c, d, l, a }) => (
    <>
      <path d="M62 32 86 20 100 44 114 20 138 32 164 58 180 156 160 162 152 104 152 226 48 226 48 104 40 162 20 156 36 58Z" fill={c} />
      <path d="M152 104 152 226 118 226Z" fill={d} opacity=".35" />
      <path d="M86 20 100 44 114 20 116 72 100 126 84 72Z" fill={d} />
      <path d="M86 20 72 58 88 76 100 44Z M114 20 128 58 112 76 100 44Z" fill={l} opacity=".5" />
      <path d="M100 126V226" stroke={d} strokeWidth="2" />
      <circle cx="110" cy="142" r="3.4" fill={a} />
      <circle cx="110" cy="172" r="3.4" fill={a} />
      <path d="M60 170h22M118 170h22" stroke={d} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  knit: ({ c, d, l }) => (
    <>
      <path d="M56 42Q100 56 144 42L174 62 186 168 164 172 152 98 152 204 48 204 48 98 36 172 14 168 26 62Z" fill={c} />
      <path d="M78 44Q100 66 122 44" stroke={d} strokeWidth="6" fill="none" strokeLinecap="round" />
      {[66, 82, 100, 118, 134].map((x) => (
        <path key={x} d={`M${x} 70V196`} stroke={d} strokeOpacity=".22" strokeWidth="2" />
      ))}
      <path d="M48 192h104" stroke={d} strokeWidth="10" strokeOpacity=".35" />
      <path d="M16 160l22 4M184 160l-22 4" stroke={d} strokeWidth="8" strokeOpacity=".35" />
      <path d="M56 42Q100 56 144 42" stroke={l} strokeWidth="2" fill="none" opacity=".6" />
    </>
  ),
  tee: ({ c, d, l }) => (
    <>
      <path d="M62 44Q100 58 138 44L182 68 166 104 150 96 150 206 50 206 50 96 34 104 18 68Z" fill={c} />
      <path d="M80 46Q100 66 120 46" stroke={d} strokeWidth="5" fill="none" strokeOpacity=".5" strokeLinecap="round" />
      <path d="M150 96 150 206 128 206Z" fill={d} opacity=".08" />
      <path d="M62 44 50 96" stroke={l} strokeWidth="2" opacity=".5" />
      <path d="M36 98l14-4M164 98l-14-4" stroke={d} strokeOpacity=".25" strokeWidth="2" />
    </>
  ),
  shirt: ({ c, d, l }) => (
    <>
      <path d="M64 38 84 30 100 40 116 30 136 38 170 60 184 170 164 174 152 100 152 214 48 214 48 100 36 174 16 170 30 60Z" fill={c} />
      <path d="M84 30 100 40 92 58Z M116 30 100 40 108 58Z" fill={d} opacity=".25" />
      <path d="M100 40V214" stroke={d} strokeOpacity=".3" strokeWidth="2" />
      {[70, 100, 130, 160, 190].map((y) => (
        <circle key={y} cx="104" cy={y} r="2.2" fill={d} opacity=".45" />
      ))}
      <path d="M36 174 16 170" stroke={l} strokeWidth="6" opacity=".4" />
    </>
  ),
  overshirt: ({ c, d, a }) => (
    <>
      <path d="M60 36 82 28 100 42 118 28 140 36 172 58 184 168 162 172 152 98 154 210 46 210 48 98 38 172 16 168 28 58Z" fill={c} />
      <path d="M82 28 100 42 90 64 74 44Z M118 28 100 42 110 64 126 44Z" fill={d} opacity=".45" />
      <rect x="62" y="80" width="28" height="30" rx="3" fill={d} opacity=".28" />
      <rect x="110" y="80" width="28" height="30" rx="3" fill={d} opacity=".28" />
      <path d="M100 42V210" stroke={d} strokeWidth="2.4" strokeOpacity=".5" />
      {[76, 110, 144, 178].map((y) => (
        <circle key={y} cx="105" cy={y} r="3" fill={a} />
      ))}
    </>
  ),
  jacket: ({ c, d, l }) => (
    <>
      <path d="M60 40 84 28 100 38 116 28 140 40 172 62 182 162 162 166 152 100 152 180 48 180 48 100 38 166 18 162 28 62Z" fill={c} />
      <path d="M84 28 70 60 100 38Z M116 28 130 60 100 38Z" fill={d} />
      <path d="M100 38V180" stroke={l} strokeWidth="2" opacity=".6" />
      <path d="M48 168h104" stroke={d} strokeWidth="12" opacity=".6" />
      <path d="M66 110h20M114 110h20" stroke={d} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  trousers: ({ c, d, l }) => (
    <>
      <path d="M58 22h84l10 206h-42L100 84 90 228H48Z" fill={c} />
      <path d="M58 22h84v12H58Z" fill={d} opacity=".4" />
      <path d="M78 36 70 226M122 36l8 190" stroke={l} strokeOpacity=".35" strokeWidth="2" />
      <path d="M100 34v50" stroke={d} strokeWidth="2" strokeOpacity=".45" />
      <path d="M142 22l10 206h-18Z" fill={d} opacity=".12" />
    </>
  ),
  jeans: ({ c, d, l }) => (
    <>
      <path d="M58 22h84l10 206h-42L100 84 90 228H48Z" fill={c} />
      <path d="M58 22h84v12H58Z" fill={d} opacity=".45" />
      <path d="M62 38q14 18 30 4M138 38q-14 18-30 4" stroke="#d6a45a" strokeWidth="1.6" fill="none" strokeDasharray="3 3" />
      <path d="M100 34v50" stroke="#d6a45a" strokeWidth="1.6" strokeDasharray="3 3" />
      <path d="M54 212h38M108 212h40" stroke={l} strokeWidth="3" opacity=".35" />
      <path d="M142 22l10 206h-18Z" fill={d} opacity=".15" />
    </>
  ),
  skirt: ({ c, d }) => (
    <>
      <path d="M68 40h64l30 160H38Z" fill={c} />
      <path d="M68 40h64v12H68Z" fill={d} opacity=".4" />
      <path d="M86 52 76 200M114 52l10 148" stroke={d} strokeOpacity=".2" strokeWidth="2" />
    </>
  ),
  sneakers: ({ c, d, a }) => (
    <>
      <g transform="translate(22 8)" opacity=".9">
        <path d="M18 142c0-20 8-34 20-40l26-6c10 10 26 16 44 18 20 2 40 8 50 24v12H18Z" fill={mix(c.startsWith("#") ? c : "#ffffff", "black", 0.08)} />
        <path d="M16 146h144v10H16Z" fill={a} />
      </g>
      <path d="M22 168c0-20 8-34 20-40l26-6c10 10 26 16 44 18 20 2 40 8 50 24v12H22Z" fill={c} stroke={d} strokeOpacity=".25" />
      <path d="M20 172h146v12a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4Z" fill={a} />
      <path d="M72 128l8 14M84 132l7 12M96 135l6 11" stroke={d} strokeOpacity=".5" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 168c24-2 60-2 136-2" stroke={d} strokeOpacity=".15" strokeWidth="2" />
    </>
  ),
  loafers: ({ c, d, l }) => (
    <>
      <g transform="translate(20 10)" opacity=".85">
        <path d="M22 150c4-14 16-22 34-22 14 10 40 12 62 12 22 0 38 8 42 22v6H22Z" fill={d} />
      </g>
      <path d="M20 172c4-14 16-22 34-22 14 10 40 12 62 12 22 0 38 8 42 22v6H20Z" fill={c} />
      <path d="M18 178h144v6a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4Z" fill={mix(c, "black", 0.45)} />
      <path d="M92 160c10 4 26 4 38 0" stroke={l} strokeWidth="3" fill="none" opacity=".55" strokeLinecap="round" />
    </>
  ),
  boots: ({ c, d }) => (
    <>
      <path d="M50 70h46v70c20 6 50 10 60 30v14H44Z" fill={c} />
      <path d="M42 180h116v8H42Z" fill={d} />
      <path d="M50 70h46v10H50Z" fill={d} opacity=".4" />
    </>
  ),
  bag: ({ c, d, a }) => (
    <>
      <path d="M72 80c0-30 56-30 56 0" stroke={d} strokeWidth="6" fill="none" />
      <path d="M44 80h112l-8 120H52Z" fill={c} />
      <circle cx="100" cy="110" r="4" fill={a} />
    </>
  ),
};

type GarmentArtProps = {
  garment: Pick<Garment, "kind" | "color" | "accent" | "name">;
  className?: string;
  title?: boolean;
};

/**
 * Renders a garment as a transparent product cut-out when a photo exists,
 * otherwise as the SVG illustration. Both occupy the same 5:6 box, so layouts don't shift.
 */
export function GarmentArt({ garment, className = "", title = false, illustration = false }: GarmentArtProps & { illustration?: boolean }) {
  const cutout = illustration ? undefined : garmentCutout(garment);
  if (cutout) {
    return (
      <span className={`relative block ${className}`} style={{ aspectRatio: "5 / 6" }}>
        <Image
          src={cutout}
          alt={title ? garment.name : ""}
          fill
          sizes="(min-width: 1024px) 240px, 40vw"
          className="object-contain"
          draggable={false}
        />
      </span>
    );
  }
  return <GarmentSvg garment={garment} className={className} title={title} />;
}

/** Full product photo on the house backdrop, filling its (square) container. Falls back to the cut-out/SVG. */
export function GarmentPhoto({ garment, className = "", sizes = "(min-width: 1024px) 300px, 45vw" }: { garment: GarmentArtProps["garment"]; className?: string; sizes?: string }) {
  const src = garmentPhoto(garment);
  if (!src) return <GarmentArt garment={garment} className={`mx-auto w-[72%] ${className}`} />;
  return <Image src={src} alt={garment.name} fill sizes={sizes} className={`object-cover ${className}`} />;
}

function GarmentSvg({ garment, className = "", title = false }: GarmentArtProps) {
  const c = garment.color;
  const d = mix(c, "black", 0.35);
  const l = mix(c, "white", 0.45);
  const a = garment.accent ?? mix(c, "black", 0.55);
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title ? garment.name : undefined}
    >
      {shapes[garment.kind]({ c, d, l, a })}
    </svg>
  );
}
