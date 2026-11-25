// Builds one self-contained preview.html (JS, CSS, fonts and images all inlined)
// that opens with a double-click — no server, no Next.js router.
//
//   npm run preview:html
//
// How: Next builds the Tailwind CSS, esbuild bundles the page as a
// plain client-side React app, and everything is inlined into ./preview.html.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const nextStatic = join(root, ".next/static");

// 1. CSS — reuse the exact stylesheet Next/Tailwind generates.
execSync("npx next build", { stdio: "inherit" });
const cssDir = join(root, ".next/static/css");
let css = readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(join(cssDir, f), "utf8"))
  .join("\n");

const mime = { ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2" };
const dataUri = (file) => `data:${mime[extname(file)]};base64,${readFileSync(file).toString("base64")}`;

// Keep only the basic latin font files and inline them.
css = css.replace(/@font-face\{[^}]*\}/g, (block) => {
  const m = block.match(/url\(([^)]+\.woff2)\)/);
  if (!m) return block;
  if (!/-latin-wght/.test(m[1])) return "";
  // url(/_next/static/media/x.woff2) → .next/static/media/x.woff2
  return block.replace(m[1], dataUri(join(nextStatic, m[1].replace(/^\/_next\/static\//, ""))));
});

// 2. JS — bundle the homepage as a client-only React app.
const result = await build({
  entryPoints: [join(root, "scripts/preview/entry.tsx")],
  bundle: true,
  write: false,
  minify: true,
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  alias: { "next/image": join(root, "scripts/preview/image-shim.tsx") },
  tsconfig: join(root, "tsconfig.json"),
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
});
let js = result.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");

// 3. Images → data URIs.
const walk = (dir) =>
  readdirSync(join(root, "public", dir), { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(`${dir}/${d.name}`) : /\.(webp|png)$/.test(d.name) ? [`${dir}/${d.name}`] : []
  );
const assets = [...walk("fox"), ...walk("images"), ...walk("photos"), ...walk("brand"), "logo.webp", "fox-mark.webp"];
const assetMap = Object.fromEntries(assets.map((a) => [`/${a}`, dataUri(join(root, "public", a))]));

// 4. Page shell (mirrors app/layout.tsx).
const brandMod = await build({ entryPoints: [join(root, "config/brand.ts")], bundle: true, write: false, format: "esm" });
const { brand, seo } = await import("data:text/javascript;base64," + Buffer.from(brandMod.outputFiles[0].text).toString("base64"));
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#f7f4ee" />
<title>${seo.title}</title>
<meta name="description" content="${seo.description}" />
<link rel="icon" type="image/png" href="${dataUri(join(root, "app/icon.png"))}" />
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<noscript><p style="padding:40px;font-family:sans-serif">${brand.name} preview needs JavaScript.</p></noscript>
<script>window.__ASSETS=${JSON.stringify(assetMap)};</script>
<script>${js}</script>
</body>
</html>`;

writeFileSync(join(root, "preview.html"), html);
console.log(`preview.html written (${(html.length / 1024 / 1024).toFixed(1)} MB)`);
