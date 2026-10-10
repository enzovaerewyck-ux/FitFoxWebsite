import Image from "next/image";
import type { Garment } from "@/data/garments";
import { GarmentArt } from "./GarmentArt";

const TOPS = ["coat", "knit", "tee", "shirt", "overshirt", "jacket"];
const BOTTOMS = ["trousers", "jeans", "skirt"];

type Placement = { left?: string; right?: string; top?: string; bottom?: string; width: string; rotate: number; z: number };

function place(kind: string, index: number): Placement {
  if (TOPS.includes(kind)) return { left: `${4 + index * 12}%`, top: `${2 + index * 6}%`, width: "58%", rotate: -6 + index * 6, z: 2 + index };
  if (BOTTOMS.includes(kind)) return { right: "2%", top: "20%", width: "46%", rotate: 5, z: 1 };
  return { left: "10%", bottom: "-4%", width: "46%", rotate: -4, z: 5 };
}

/**
 * An editorial "flat-lay" composition of 3–4 garments on a warm backdrop.
 * TODO(content): placeholder for real outfit photography.
 */
export function FlatLay({
  items,
  backdrop,
  className = "",
  photo,
  alt = "",
  sizes = "(min-width: 1024px) 320px, 50vw",
}: {
  items: Garment[];
  backdrop: string;
  className?: string;
  /** A real outfit flat-lay photo. When set, it replaces the composed illustration. */
  photo?: string;
  alt?: string;
  sizes?: string;
}) {
  if (photo) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ background: backdrop }}>
        <Image src={photo} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  let topIndex = 0;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: backdrop }}>
      <div className="grain absolute inset-0 opacity-70" aria-hidden />
      {items.map((g) => {
        const p = place(g.kind, TOPS.includes(g.kind) ? topIndex++ : 0);
        return (
          <div
            key={g.id}
            className="absolute"
            style={{ left: p.left, right: p.right, top: p.top, bottom: p.bottom, width: p.width, rotate: `${p.rotate}deg`, zIndex: p.z }}
          >
            <GarmentArt garment={g} className="block h-auto w-full drop-shadow-[0_10px_14px_rgba(60,40,20,0.18)]" />
          </div>
        );
      })}
    </div>
  );
}
