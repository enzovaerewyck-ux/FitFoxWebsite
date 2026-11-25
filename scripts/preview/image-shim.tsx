// Stand-in for next/image in the standalone preview (plain <img>, same props).
import type { CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  draggable?: boolean;
};

// build-preview.mjs injects every public image as a data URI (window.__ASSETS), so template-string paths work too.
const assets = (globalThis as unknown as { __ASSETS?: Record<string, string> }).__ASSETS ?? {};

export default function Image({ src, alt, width, height, fill, priority, sizes: _sizes, className, style, draggable }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assets[src] ?? src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={draggable}
      className={className}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
    />
  );
}
