# Vee Nexus Global Resource

Static React / TypeScript / Vite website, with HTML prerendered at build time. Primary project directory: `D:\Codex\vee-nexus`.

## Local preview

```sh
npm install
npm run dev
```

The development server uses http://127.0.0.1:8081.

```sh
npm run build
npm run preview
```

The production preview uses http://127.0.0.1:8082. Publish `dist/` to the root of a static hosting domain. No backend, API key, authentication, or database is required.

## Design and motion

- Hero: animated SVG container ship (CSS keyframes, no WebGL) sailing across layered waves, with a distant ship, bobbing, smoke and bow wave. Visible Pause motion control; reduced-motion visitors get a still scene. `src/components/ShipScene.tsx`, styles in `src/sections.css`. The earlier Three.js paper sculpture (`PaperExperience`/`PaperScene`) is no longer mounted but kept in the repo.
- Competitor-informed scope (kaiserinternational.in, synergymarinegroup.com, Sept 2026): Services tabs (trading & indenting, quality & documentation, shipping & logistics, marine services, support & sustainability), "Who we serve" mill types, 8-step process, photo gallery, added grades OINP / CBS / BBC and New Zealand origin.
- Floating WhatsApp button (wa.me link with prefilled text).
- Custom Three.js laminated paper sculpture. Pointer-responsive orientation, capped pixel ratio and 30 fps frame rate, offscreen suspension, pause/reset controls, reduced-motion behavior, WebGL and chunk-load fallbacks. Desktop initializes 3D after the first paint. Mobile and reduced-motion visitors get a 10 KB sculpture poster with an explicit Explore in 3D control.
- Scroll-driven material journey with six stages; native sticky positioning on desktop and direct stage selection on every screen size.
- Interactive paper/pulp grade browser preserving all 15 requested grades.
- Geographic sourcing map with selectable origin routes to Chennai.
- React Bits-based scroll text reveal, adapted with semantic markup, scoped animation cleanup and reduced-motion support.
- Grouped procurement information and expandable supplier checklist.
- Local fonts and photographs. Native scrolling; no scroll hijacking.

`docs/design-direction.md` records the redesign audit, art direction and content constraints.

## Editing

- `src/main.tsx`: page components, supplier checklist, source regions and contact content.
- `src/data.ts`: navigation, product grades and descriptions, photographs, services (`serviceGroups`) and mill types (`industries`). Remove any service line the company does not actually offer.
- `src/sections.css`: ship hero, gallery, services, industries, process and WhatsApp styles.
- `src/components/PaperExperience.tsx`: progressive enhancement and mobile opt-in.
- `src/components/PaperScene.tsx`: Three.js scene and lifecycle.
- `src/components/ScrollReveal.tsx`: scroll typography.
- `src/components/SceneBoundary.tsx`: optional-scene failure fallback.
- `src/style.css`: responsive design and shared tokens.
- `index.html`: SEO metadata and organization schema.

## Content and branding

The supplied request contained no original company logo, business-card artwork or profile PDF. The site retains a text-only company name, ready to replace with the original logo. The favicon is a plain initial, not a reconstructed brand mark.

Contact actions open mail, phone and WhatsApp applications. Sending supplier details opens an email draft; the site does not upload files or send messages automatically. Map routes illustrate sourcing regions, not verified current suppliers. Material photos illustrate the category, not stock availability. No years, shipment volumes, certifications, clients or testimonials have been invented.

## Asset credits

- Photos in `public/img/` (Unsplash License, free for commercial use): cardboard bales on pallets `photo-1788734170194-043a8a994606`; mixed paper bales `photo-1781243680823-aae6c7f1ff12`; OCC close-up `photo-1507560461415-997cd00bfd45`; newspapers `photo-1677624965247-4a8b6174dc65`; bulk carrier aerial `photo-1568347877321-f8935c7dc5a3`; container ship `photo-1605745341112-85968b19335b`; port crane `photo-1700777685830-f501e67260e6`. They illustrate categories, not Vee Nexus stock; replace with the company's own yard/loading photos when available.
- Container-port image: Unsplash `photo-1494412519320-aa613dfb7738`.
- Corrugated paper photo: Roberto Sorin / Unsplash `photo-1640193698858-31565d448f90`.
- World land geometry: Natural Earth, `nvkelso/natural-earth-vector/geojson/ne_110m_land.geojson` (public domain).
- Manrope and DM Sans: local WOFF2 fonts, SIL Open Font License; notices in `public/OFL-*.txt`.
- Three.js: MIT; Lucide: ISC.
- ScrollReveal adapted from David Haz's React Bits. MIT + Commons Clause license notice retained in `public/licenses/react-bits.txt`. Used as part of this website, not distributed as a standalone component product.
- No 21st.dev component is included. The implemented motion uses Three.js, GSAP and the attributed React Bits adaptation.

## Verification

Production build, screenshot review, responsive overflow checks at 320, 390, 768, 1024, 1440 and 1920 pixels, product selection, region selection, supplier disclosures, mobile menu and Escape behavior, image loading, and axe WCAG A/AA checks. Reports are stored under `work/`. Lighthouse results are local lab observations, not field Core Web Vitals guarantees. Original pre-redesign source snapshots remain under `work/`.

