# FitFox — Brand bible for Instagram Reels

Use this as the single source of truth for every reel. The brand name may still change: always write it as **{BRAND}** in templates (currently "FitFox"). The fox's name is **Vex**.

---

## 1. The product in one breath

FitFox is a personal AI stylist in your pocket. It learns your style (Style DNA), builds outfits from **the clothes you already own**, tweaks one item at a time ("Make it mine"), lets you preview a look on yourself, and nudges you with playful style quests. It is **not** a shopping app.

**Core promise:** "See a look you love. Make it yours."
**Big idea:** *Full wardrobe. Nothing to wear?* → You probably don't need more clothes. You need more ways to wear them.
**Belief:** We don't dress your demographic. We learn your style.

## 2. The design direction: "playful editorial fashion"

Premium fashion **+** a cheeky character **+** warm editorial calm **+** light game mechanics.
Test: without the fox it should still look like a premium fashion brand. With the fox it becomes memorable and warm.

| Do | Don't |
|---|---|
| Warm natural light, real homes, real clothes | Studio-white e-commerce, price tags, shop vibes |
| Calm camera, a few deliberate moves | Frantic cuts, glitch transitions, neon |
| One clear joke or insight per reel | Random meme spam, loud stock music drops |
| Lived-in details: unmade bed, coffee cup, oak floor | Luxury runway, logos, brand names |
| Fox as a witty stylist friend | Fox as a preschool cartoon, hyperactive, casino confetti |

## 3. Visual world

**Palette** (use in prompts, text overlays and end cards)
- Cream background `#F7F4EE` · paper `#FCFBF8` · sand `#EFE8DC`
- Ink (text) `#141412` · soft ink `#6F6A62` · line `#D7CFC3`
- **Fox orange (accent)** `#B8693A`: small doses only (labels, highlights, one object per scene)
- Black for buttons / end card background `#151513`
- Wardrobe colours: camel, cream, charcoal, navy, olive, stone, white, a touch of rust or burgundy

**Light & set**
- Soft morning or late-afternoon window light with window-frame shadows on cream plaster walls
- Light oak floors, linen sheets, wooden hangers on a brass hook, an open wooden wardrobe, a terracotta vase
- Belgian / European apartment feel: warm, lived-in, tidy-ish, never sterile

**Signature shots (the house look; reuse them)**
1. **The hook shot:** one garment on a light oak hanger on a brass wall hook, cream wall, window light. ("Your own closet.")
2. **The bed flat-lay:** the complete outfit laid out on an unmade bed with warm white linen, shot from above. ("Today's outfit.")
3. **The mirror check:** a person checking their outfit in a tall mirror at home, small satisfied smile.
4. **The pile:** a person sitting on the bed among tried-on clothes in front of a full wardrobe. ("Nothing to wear.")
5. **The swap:** the same scene where exactly ONE item changes (shoes, jacket…).

See `references/photography/` for every one of these.

**People:** diverse, relatable, late 20s to 30s, natural skin, real expressions (amused, exasperated, pleased), never model-pouty. No exact fit claims.

## 4. Vex the fox (core character)

**Look:** 3D-animated red fox with big expressive eyes, cream chest, fluffy orange tail with a white tip. Signature outfits:
- **Stylist mode:** sunglasses, olive blazer, cream turtleneck, cream trousers, white sneakers
- **Cosy mode:** cream cable-knit sweater (waving)
- **Cheeky mode:** peeking out from behind the wardrobe door

References are in `references/fox/`. The `*-from-app.png` files are the best quality. Always pass at least one fox reference image when generating the fox, so he stays consistent.

**Personality:** intelligent, fashion-aware, confident, warm, slightly cheeky, dry humour, occasionally opinionated, always on your side. Never mean, never childish.

**How he lives in a reel:** he reacts. He appears at the edge of the frame, raises an eyebrow, peeks in, gives one short line, then gets out of the way. Max 1–2 fox moments per reel. He doesn't talk constantly.

**Voice: example lines**
- "Another black outfit?"
- "You already own this."
- "Try the jacket."
- "Not bad. I'd change the shoes."
- "Nothing to wear. Sure."
- "Relax. Beige suits you."
- "Took you long enough."
- "No black today. Yes, I'm serious."
- "Much better."

## 5. Copy & on-screen text

- Language: **English** (same as the website) unless the brief asks for Dutch.
- Short, human, fashion-aware, slightly witty. Speak to problems people recognise.
- On-screen text: max ~7 words per card, max 3–4 cards per reel.
- Typography for overlays: **Playfair Display** (serif, italic for emphasis) for headlines; **Plus Jakarta Sans** for small labels in uppercase with wide letter spacing in fox orange.
- Avoid: "leverage AI", "revolutionary", sparkles/robot/brain icons, fake stats, fake testimonials.
- Good hooks:
  - "Full wardrobe. Nothing to wear?"
  - "POV: you own 4 white tees and still 'have nothing'."
  - "Same jacket. Three personalities."
  - "Love the look, not the shoes? Change just the shoes."
  - "Bought it three months ago. Tags still on."
- CTA end card: "{BRAND} — your personal AI stylist" + "Get early access · link in bio". Black or cream card, fox waving.

## 6. Reel format

- **9:16 vertical**, 1080×1920, **7–20 seconds** (sweet spot 10–15 s)
- Structure: **Hook (0–2 s) → Tension → Turn (FitFox / Vex helps) → Payoff → End card (1.5–2 s)**
- 3–6 shots. Each shot 2–4 s. Hold on the payoff.
- Keep the safe zone clear: no key text in the top 220 px or bottom 380 px (Instagram UI).
- Sound: calm lo-fi / warm acoustic or natural room sound. Optional dry voice-over in Vex's voice. No hard EDM drops.
- Always leave the first frame strong. It doubles as the cover.

## 7. Recurring series ideas

1. **"Nothing to wear?"**: the pile → Vex peeks in → the bed flat-lay built from the pile → mirror check.
2. **"One swap"**: same outfit, Vex changes ONE item, before/after.
3. **"Style quests"**: Vex announces a weekly challenge ("No black today"), the person tries it, payoff.
4. **"Vex judges"**: Vex reacts to three outfits with one-liners ("Hm." / "Better." / "Good choice.").
5. **"Forgotten favourite"**: the coat that hasn't been worn in 41 days gets a new outfit.
6. **"Same item, three looks"**: one overshirt → work / date / weekend.

## 8. Prompt templates (Higgsfield)

**Person shot (image, model `soul_2`, 9:16):**
> Candid photo of [person], at home in a bright warm-toned bedroom with cream plastered walls and light oak floor, [action/emotion]. Wearing [outfit in house colours]. Soft morning window light with window-frame shadows, an open wooden wardrobe, a terracotta vase. Natural, authentic, editorial but approachable, warm muted palette, shot on 35mm. Vertical 9:16 composition with space at the top for a caption.

**Hook shot (image, `gpt_image_2_5`):**
> Photo of [garment] hanging on a simple light oak wooden hanger from a small brass wall hook against a warm cream plastered wall at home, soft morning window light from the left, gentle shadow, real fabric texture. No tags, no labels, no logos, no text, no people.

**Bed flat-lay (image, `gpt_image_2_5`):**
> Overhead photo of a complete outfit laid out neatly on an unmade bed with soft crumpled warm white linen sheets, ready to be worn for [occasion]: [items]. Soft natural morning window light with window-frame shadows, warm muted palette. Top above, trousers below, shoes at the bottom. No tags, no labels, no logos, no text, no people.

**Fox shot (image or image-to-video, with a fox reference image):**
> The exact same 3D animated fox character from the reference (same face, fur colours, big expressive eyes, fluffy tail with white tip), wearing [stylist / cosy outfit], [action: peeks in from the left edge / raises one eyebrow / waves / points at the outfit], in a warm cream room with soft window light. Pixar-quality 3D, warm and charming, not childish. Vertical 9:16.

**Motion (video):** gentle, intentional camera moves only: slow push-in, soft pan, a hand placing a garment, fabric settling, the fox's ears twitching. Duration 3–5 s per shot.

**Negative cues to always add:** no tags, no price labels, no logos, no brand names, no extra text, no distorted hands, no extra limbs, no neon, no glitch effects.

## 9. Quality bar before delivering a reel

- [ ] Hook is clear in the first 2 seconds, readable without sound
- [ ] Looks like FitFox: cream, warm light, real clothes, fox orange in small doses
- [ ] Vex is on-model (matches references) and appears max 1–2 times
- [ ] One idea only; payoff is visible
- [ ] Text inside safe zones, max ~7 words per card
- [ ] End card with brand + "Get early access · link in bio"
- [ ] No tags, logos, fake claims or fake testimonials
