# DESIGN.MD — ROSAVIA DIGITAL EXPERIENCE

## 1. Design intent

**Kata kunci:** cinematic, feminine, mysterious, editorial, floral, intimate, premium.  
**Kontras:** dark plum backdrop + pink satin highlights + serif typography oversized.  
**Referensi ritme:** contoh video mengubah scene florals → scent ritual → extraction imagery → perfume reveal. Implementasi Rosavia mengadaptasi *ritme* dan *rasa mewah*, bukan meniru website atau desain visual referensi secara identik.

Target rasa visual: seperti kampanye rumah parfum butik; **bukan** template startup, dashboard, card-grid, atau template toko generik. Kurangi segala widget pill, card, badge, shadow yang tidak penting. Biarkan gambar, headline, ruang kosong, dan gerakan memainkan peran utama.

## 2. Brand identity

- Brand: **Rosavia**
- Product identity: **Extrait de Parfume, 18 mL** (mengikuti label pada produk)
- Positioning cue: **Soft Feminine Scent**
- Logo: gunakan wordmark **Rosavia** sebagai teks elegan; tetap pertahankan artwork brand asli pada foto.
- Jangan ubah nama ke brand referensi, jangan mengarang varian atau bahan.

### Color system

| Token | Hex | Penggunaan |
|---|---|---|
| `--ink` | `#22151E` | Background utama |
| `--night` | `#170E17` | Overlay gelap |
| `--plum` | `#3D1C32` | Secondary scene |
| `--wine` | `#68283E` | Accent bidang gelap |
| `--rose` | `#E0A8B7` | Highlight ilustrasi |
| `--pink` | `#F0C7D1` | Emphasis headline, detail produk |
| `--ivory` | `#FFF3EA` | Text utama |
| `--muted` | `#D9BBC3` | Copy sekunder |
| `--gold` | `#E7BD98` | Detail ekstraksi/metalik |

Color discipline: satu scene dominan dark, accent pink secukupnya. Hindari pink neon dan gradients multiwarna. Contrast copy memenuhi WCAG AA untuk teks kecil.

## 3. Typography

- **Display:** `Italiana`, fallback Georgia/serif. Headline 72–132 px desktop, 60–94 px mobile, tracking negatif tipis, line-height ~0.85–0.97.
- **Body/UI:** `DM Sans`, fallback Arial/system. Body 13–15 px desktop, minimal 12–14 px mobile, line-height 1.65–2.
- **Eyebrows:** all caps, 9–11 px, tracking 0.24–0.36 em.
- **Wordmark:** text serif 30–36 px desktop, 26–30 px mobile; bukan cursive berlebihan.
- Judul utama tiap scene maksimal dua baris. Teks pendukung 1–3 kalimat singkat.

## 4. Composition and layout

- Desktop viewport 1440×900: safe top 100 px, konten kiri mulai x≈16vw, headline memiliki 36–40vw, hero imagery di sebelah kanan 45–60vw.
- Rail chapter kiri 5.5vw, navigation dots kanan 4.5vw.
- Berikan `z-index` pasti agar scene imagery tidak menimpa button/teks.
- Margin besar dan whitespace dominan; tidak ada grid katalog di bagian storytelling.
- Mobile ≤680 px: header pendek (72 px), judul di bagian atas dengan visual di bawah, rail kiri dihilangkan, dots tetap terlihat. Hindari teks tertutup botol/kelopak.
- `100svh` sebagai tinggi adegan bila memungkinkan; tangani browser address bar mobile. Gunakan fallback `min-height: 100vh`.

## 5. Scene art direction

### S1 / The Rose
Full-bleed mood photography (file `rose-stage-1920x1080.webp`), dominan dark plum, bunga pink memenuhi kanan. Headline: **Where softness begins.** Copy Bahasa Indonesia pendek. Foto mungkin memperlihatkan kelopak, tetapi **bukan** bukti rose sebagai bahan aktual.

### S2 / The Essence
Glass vessel `glass-bowl.svg` dengan kelopak `petal-rose.svg` dan `petal-small.svg`, diffuse bloom highlight. Gerakan floating lembut. Visual adalah metafora aromatik, **bukan** dokumentasi proses produksi.

### S3 / The Character
Copper vessel `alembic.svg` dan `drop.svg`. Sorotan warm gold agar transisi tidak monoton pink. Narasi tentang karakter `Soft Feminine Scent` tanpa membuat klaim notes, ketahanan, atau teknik pembuatan.

### S4 / Meet Rosavia
Product photo `rosavia-bottle-transparent.png` ditempatkan besar di center-right, latar radial burgundy, botanical outlines `rose-line.svg`. CTA `Explore the bottle` membuka detail dengan `rosavia-original.webp` sehingga produk lengkap (botol + box) selalu terlihat. **Dilarang regenerasi logo/label dengan AI pada aset produk asli.**

## 6. Components

| Component | Responsibility |
|---|---|
| `SiteHeader` | Wordmark, minimal action |
| `ChapterRail` | Left sidebar 01/04 state |
| `ScenePagination` | Four dot nav, next/previous semantics |
| `StoryExperience` | Orchestrate GSAP & scene state |
| `RoseScene` | Editorial cover |
| `EssenceScene` | Bowl, petals, subtle parallax |
| `CharacterScene` | Golden vessel illustration |
| `RevealScene` | Actual Rosavia bottle reveal |
| `ProductDetailDialog` | Authentic product hero, known specs, placeholder for checkout |
| `ReducedMotionGate` | Disable motion when user requests it |

## 7. Interaction specs

- Pointer dots indicate chapter. Each is a semantic button with accessible label.
- Copy links advance to next scene. No fake external calls.
- Scene-to-scene scroll with gradual dissolve or shared color fade, not sudden content jumps.
- Desktop scroll scrub responds to progress; scroll navigation should not hold user hostage. Mobile may replace pin with CSS scroll-snap.
- Microinteractions: CTA underline grows, filled CTA moves up ≤3 px, dot enlarges.
- `prefers-reduced-motion`: disable repeated float and scrub; all copy immediately visible.
- Dialog: native `<dialog>` where possible, trap focus, Escape close, backdrop support.

## 8. Product/content style

Recommended copy samples:
- **Where softness begins.** — "Ada keindahan dalam kesan yang lembut."
- **A delicate essence.** — "Sebuah interpretasi visual dari keanggunan yang tenang."
- **Quietly captivating.** — "Rosavia hadir dengan karakter Soft Feminine Scent."
- **Meet Rosavia.** — "Extrait de Parfume · 18 mL."

Avoid claims such as "tahan 24 jam", "100% halal", "BPOM", "mengandung bunga mawar", "top notes rose / heart vanilla" without verified details. Do not add fictitious reviews, fake product prices, false testimonials, fake stock.

## 9. Accessibility & performance

- Real text headings, no primary content embedded inside images.
- Alt for actual product photo; decorative SVG `aria-hidden=true` / alt empty.
- Contrast >4.5:1 for small text; larger editorial text still readable.
- Lazy-load imagery below first scene; prefetch bottle for final reveal only if prudent.
- SVG local, `next/image` for product. No autoplay sound or mandatory WebGL.
- Page must remain navigable without animation, with keyboard and touch.
- Optimize CLS, avoid 4K images for mobile, keep critical assets small.

## 10. Screens to verify

| Viewport | Desired result |
|---|---|
| 360×800 | Readable heading & CTA, bottle not obscuring copy |
| 390×844 | Main mobile reference |
| 768×1024 | Tablet two-column or stacked cleanly |
| 1440×900 | Reference desktop composition |
| 1920×1080 | Upscale editorial quality |

## 11. Asset fidelity caveat

`rosavia-hero-1920x1080.webp` is an upscale of the supplied **1672×941** photo, **not a native 1920×1080 capture**. `rosavia-bottle-transparent.png` is extracted/masked from that photo; inspect its edges at high zoom before production. For ultimate fidelity, replace with professional transparent packshot or original high-res source when available.
