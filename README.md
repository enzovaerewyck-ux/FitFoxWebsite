# FitFox — marketing website

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion.
Fonts (Playfair Display + Plus Jakarta Sans) are self-hosted via `@fontsource`, zodat er geen externe font-requests zijn.

## Lokaal draaien

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # productie-build testen
```

## Snelle preview zonder server

Dubbelklik op **`preview.html`**: één bestand waarin alle code, fonts en afbeeldingen zitten. Werkt offline in elke browser.
Na wijzigingen maak je een nieuwe versie met:

```bash
npm run preview:html
```

## Publiceren op Vercel

**Optie A — via GitHub (aanbevolen)**
1. Maak een nieuwe GitHub-repository en push deze map.
2. Op vercel.com → *Add New… → Project* → importeer de repository.
3. Vercel herkent Next.js automatisch. Klik op *Deploy*. Klaar.

**Optie B — via de Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Early-access lijst in Google Sheets (gratis)

Het formulier "Get early access" stuurt elk e-mailadres naar `/api/waitlist`, die het in een Google Sheet zet.
De kolommen zijn zo gekozen dat Mailchimp ze bij het importeren automatisch herkent:
**Email Address · Signup Date · Source · Consent · Tags**. Dubbele adressen worden overgeslagen.

**Eenmalig instellen (± 5 minuten)**
1. Maak in Google Drive een nieuwe Google Sheet, bv. "FitFox waitlist".
2. Kies in die sheet **Extensies → Apps Script**. Wis de voorbeeldcode en plak de inhoud van `google-apps-script/Code.gs`.
3. Vervang bovenaan `CHANGE-ME-to-a-long-random-string` door een lange willekeurige tekst (je geheime sleutel). Klik op **Opslaan**.
4. Klik op **Implementeren → Nieuwe implementatie → type: Web-app**.
   - Uitvoeren als: **Ik**
   - Wie heeft toegang: **Iedereen**
   - Klik op **Implementeren** en geef toestemming met je Google-account.
5. Kopieer de **Web-app-URL** (eindigt op `/exec`).
6. Ga in Vercel naar je project → **Settings → Environment Variables** en voeg toe:
   - `WAITLIST_SHEET_URL` = de Web-app-URL
   - `WAITLIST_SECRET` = dezelfde geheime tekst als in stap 3
7. Deploy de site opnieuw. Test het formulier: binnen enkele seconden verschijnt het adres in het tabblad **Waitlist**.

Lokaal testen? Kopieer `.env.example` naar `.env.local` en vul dezelfde twee waarden in.

**Later naar Mailchimp**
In Google Sheets: **Bestand → Downloaden → .csv** (of .xlsx). In Mailchimp: **Audience → Add contacts → Import contacts → Upload a file**.
De kolom *Tags* zet iedereen meteen in de groep "early-access".

**Privacy (GDPR)**
Bij elke inschrijving wordt de toestemmingstekst mee opgeslagen (kolom *Consent*). Pas die aan in `config/brand.ts`
(`waitlistConsent`) als je de tekst onder het formulier wijzigt, en vermeld de lijst in je privacyverklaring.

## De merknaam wijzigen

Alles staat in **`config/brand.ts`**: `name`, `foxName`, `tagline`, `description`, domein, socials en contactmail.
De naam wordt nergens anders hardcoded. Vergeet daarna ook `public/og.png` (social preview) en `app/icon.png` te vervangen.

## Structuur

```
app/                 layout (SEO/OG-metadata), pagina, globale CSS + design tokens (@theme)
config/              brand.ts · navigation.ts · tokens.ts (animatietiming)
data/                styleDna · challenges · wardrobe · exampleLooks · journey · garments
components/
  navigation/        Navbar, Wordmark
  hero/              Hero, FloatingTag
  sections/          Problem, HowItWorks, AiStylist, MakeItMine, SeeItOnYou, FoxCompanion, Community, BrandStory, FinalCta
  style-dna/         StyleDna
  wardrobe/          Wardrobe
  challenges/        StyleJourney, StyleQuests
  fox/               Fox (poses + reacties), FoxBubble, poses.ts
  ui/                Button, Reveal, SectionHeader, GarmentArt (SVG-kledingstukken), FlatLay
  layout/            Footer, MotionProvider (respecteert prefers-reduced-motion)
public/fox/          vos-poses (uitgesneden uit de app-screenshots)
public/images/       modefotografie
```

## Nog te doen (TODO's in de code)

- **Vos-assets**: de huidige poses zijn uitsneden uit screenshots (lage resolutie). Vervang ze door hoge-resolutie PNG/WebP-exports met transparante achtergrond in `public/fox/` en werk de afmetingen bij in `components/fox/poses.ts`. Gewenste extra poses: *inspect*, *sit*, *point* en een aparte staartlaag voor animatie.
- **Fotografie**: er is nu één modefoto (`public/images/look-camel-coat.webp`). De outfitkaarten gebruiken SVG-flat-lays als placeholder (`components/ui/GarmentArt.tsx`).
- **Early-access-formulier**: volg de stappen onder "Early-access lijst in Google Sheets" hierboven.
- **Domein, socials, contactmail** in `config/brand.ts`.
- **Privacy- en voorwaardenpagina's** (links in de footer staan nu op `#`).
