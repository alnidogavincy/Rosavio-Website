# ASSET GUIDE — ROSAVIA

All imagery is local at `public/assets/`; no external stock media is required. The brand product photo comes from the user-supplied Rosavia image; the remaining SVGs are original simple illustrations created for this kit.

| Asset | Format | Usage |
|---|---|---|
| `rosavia-original.png` | PNG, original 1672×941 | Archived unchanged input/reference; preserve unchanged |
| `rosavia-original.webp` | WebP | Modal product photo, image of original bottle & box |
| `rosavia-hero-1920x1080.webp` | WebP | Full bleed responsive background; **upscaled** to FHD, not true native photo |
| `rosavia-mobile-1080x1920.webp` | WebP | Alternate mobile art direction crop |
| `rose-stage-1920x1080.webp` | WebP | Scene 1 dramatic rose background |
| `floral-blur-1920x1080.webp` | WebP | Soft dreamy background, optional |
| `rosavia-bottle-transparent.png` | PNG RGBA | Final scene floating **actual** bottle cutout |
| `glass-bowl.svg` | SVG | Scene 2 illustration |
| `petal-rose.svg`, `petal-small.svg` | SVG | CSS floating petals |
| `alembic.svg`, `drop.svg` | SVG | Scene 3 copper vessel metaphor |
| `rose-line.svg` | SVG | Scene 4 botanical outline |
| `brand-mark.svg` | SVG | Optional small motif/favicon; **not** an official Rosavia logo |
| `petals-float-loop.webp` | Animated WebP 48 frames | Animated transparent petal overlay; optional alternative to CSS motion |

## Install in Next.js

1. Copy entire folder `public/assets/` into the repo's `public/assets/`.
2. Next.js public URL becomes `/assets/rosavia-original.webp`, not `../public/assets/...` (the relative version exists only in the static preview).
3. Use `next/image` for WebP and PNG, with correct descriptive `alt` for nondecorative product images; ordinary `<img alt="" aria-hidden>` is fine for decorative SVG if needed.
4. Large asset widths and heights should be declared to avoid CLS.
5. Inspect transparent bottle edges against dark and pink backgrounds. The mask is a first pass extracted from a photographic scene, not a studio alpha photograph.
6. Do not use generated/altered mockup artwork in place of authentic Rosavia product labels.

## Video reference usage

The user-supplied WhatsApp video is **not included** in production media. Use it as a motion/art-direction reference only. The website should not reuse its recorded screen, third-party logo, website text, or imagery as final creative assets.
