"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { GarmentPhoto } from "@/components/ui/GarmentArt";
import { Fox } from "@/components/fox/Fox";
import { FoxBubble } from "@/components/fox/FoxBubble";
import { wardrobeItems, wardrobeStatusLabel, type WardrobeItem } from "@/data/wardrobe";
import { brand } from "@/config/brand";

function foxLineFor(item?: WardrobeItem) {
  if (!item) return "You really don't need another black shirt.";
  if (item.kind === "tee") return "Another white tee? You own four.";
  if (item.status === "owned") return "You already own this.";
  if (item.status === "similar") return "Close enough. Keep your money.";
  return "This one would unlock nine looks. Just saying.";
}

const statusStyle = {
  owned: "bg-owned-soft text-owned",
  similar: "bg-fox-soft text-fox-ink",
  missing: "bg-paper text-ink-soft border border-dashed border-line",
};

export function Wardrobe() {
  const [hovered, setHovered] = useState<WardrobeItem | undefined>();
  const [seen, setSeen] = useState(false);

  return (
    <section id="wardrobe" aria-labelledby="wardrobe-title" className="section-y relative overflow-hidden">
      <div className="container-brand">
        <SectionHeader
          id="wardrobe-title"
          eyebrow="Digital wardrobe"
          title={
            <>
              Your next favourite outfit might already be <span className="italic">in your closet.</span>
            </>
          }
          intro={`Snap the clothes you own, starting with a few favourites. ${brand.name} remembers every piece, digs up the ones you forgot about and tells you honestly when you don't need to buy something new.`}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Closet door with the fox peeking out */}
          <Reveal className="relative mt-12 h-[300px] lg:h-[380px]">
            <div className="absolute bottom-0 left-0 z-10 h-full w-[150px] rounded-t-[26px] border border-[#d6c7b1] bg-[#e8dccb] shadow-soft lg:w-[170px]">
              <div className="absolute inset-3 rounded-t-[18px] border border-[#d6c7b1]" />
              <div className="absolute inset-x-3 top-[46%] h-px bg-[#d6c7b1]" />
              <div className="absolute right-4 top-1/2 h-12 w-[5px] -translate-y-1/2 rounded-full bg-[#a8916f]" />
            </div>
            <motion.div
              className="absolute bottom-[14%] z-0 left-[124px] lg:left-[144px]"
              initial={{ x: -70 }}
              onViewportEnter={() => setSeen(true)}
              viewport={{ once: true, margin: "-20% 0px" }}
              animate={{ x: !seen ? -70 : hovered ? 18 : 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 16 }}
            >
              <Fox pose="peek" reactKey={hovered?.id} className="w-[96px] lg:w-[112px]" />
            </motion.div>
            <div className="absolute -top-14 left-[110px] z-20 w-max max-w-[210px] lg:left-[120px]">
              <FoxBubble text={foxLineFor(hovered)} tail="bottom-left" size="sm" />
            </div>
          </Reveal>

          {/* Wardrobe grid */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {wardrobeItems.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 0.05}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(item)}
                  onMouseLeave={() => setHovered(undefined)}
                  onFocus={() => setHovered(item)}
                  onBlur={() => setHovered(undefined)}
                  onClick={() => setHovered(item)}
                  className={`group block w-full overflow-hidden rounded-[var(--radius-lg)] border bg-paper text-left transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-float ${
                    item.status === "missing" ? "border-dashed border-line" : "border-line/80"
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-sand/70">
                    <GarmentPhoto
                      garment={item}
                      sizes="(min-width: 1024px) 230px, 45vw"
                      className={`transition-transform duration-500 group-hover:scale-105 ${item.status === "missing" ? "opacity-50 grayscale-[35%]" : ""}`}
                    />
                    <span className={`absolute left-2.5 top-2.5 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${statusStyle[item.status]}`}>
                      {wardrobeStatusLabel[item.status]}
                    </span>
                  </div>
                  <div className="px-3.5 py-3">
                    <p className="text-[15px] font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-[13px] leading-snug text-ink-soft">{item.note}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
