# IMPLEMENTATION PLAN — ROSAVIA

**Proyek:** Rosavia — Luxury Perfume Storytelling Website  
**Versi:** 1.0 · 17 Oktober 2026  
**Status:** Siap diimplementasikan di Codex  
**Referensi:** Video 11 detik (empat narasi visual: mawar → esensi → interpretasi craft → botol parfum) dan foto asli produk Rosavia.

> Prioritas: website sinematik dengan performa tinggi, tidak sekadar landing page e-commerce generik. Inspirasi pola transisi dari video; tidak menyalin layout/brand/konten website di video secara persis.

## 0. Tujuan dan batasan

- Bangun pengalaman **empat adegan full-viewport** yang bereaksi pada scroll dan navigasi, seperti video referensi.
- Gunakan **foto asli** Rosavia sebagai sumber kebenaran visual produk. Pertahankan logo, label, proporsi, dan warna kemasan aslinya.
- Tunjukkan informasi yang dikonfirmasi: `Rosavia`, `Extrait de Parfume`, `Soft Feminine Scent`, `18 mL`.
- Narasi mawar/kelopak/alat ekstraksi adalah **metafora visual**, **bukan** klaim bahan, formula, cara produksi, durasi wangi, atau khasiat.
- Jangan buat harga, alamat, nomor WhatsApp, testimoni, varian, klaim BPOM, atau ulasan palsu. Simpan kontak & tautan toko dalam config hingga pemilik memberi data.

## 1. Teknologi

| Area | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js App Router + TypeScript | Komponen terstruktur, metadata SEO, deployment ke Vercel |
| CSS | Tailwind CSS + CSS variables | Responsive styling cepat dan design tokens konsisten |
| Animasi | GSAP + ScrollTrigger | Pinning, scrub, timeline dan transisi antar cerita yang presisi |
| UI state | React hooks | Cukup ringan untuk progress, menu, modal |
| Gambar | next/image pada foto; inline/local SVG | Optimalisasi gambar; SVG tajam dan ringan |
| Font | Italiana + DM Sans | Display serif editorial dan teks sangat terbaca |
| Hosting | Vercel | Deployment mudah untuk Next.js |

**Fallback:** CSS transform/transitions untuk animasi ambient. Sediakan `prefers-reduced-motion`; website harus tetap berfungsi bila GSAP gagal dimuat.

## 2. Arsitektur pengalaman

### Scene 1 — THE ROSE | ``Where softness begins.``
- Latar plum gelap, macro mawar di kanan, serif headline besar di kiri.
- Saat masuk: fade/slide berurutan untuk eyebrow, headline, copy, CTA.
- Scroll: foto mawar scale `1 → 1.08` dan opacity ke adegan berikutnya.
- CTA `Discover the story` menavigasi ke scene 2.

### Scene 2 — THE ESSENCE | ``A delicate essence.``
- Ilustrasi mangkuk kaca, air, dan kelopak mawar mengambang.
- Scroll: parallax berbeda pada mangkuk dan kelopak; teks reveal.
- Animasi loop: kelopak mengambang lembut, tidak berputar agresif.
- Copy **tidak** mengklaim kelopak sebagai komposisi asli parfum.

### Scene 3 — THE CHARACTER | ``Quietly captivating.``
- Siluet alat distilasi bergaya tembaga sebagai metafora craft.
- Scroll: vessel muncul dari bawah, cahaya emas naik, tetesan bergerak lambat.
- Tidak menampilkan proses manufaktur yang belum dibuktikan.

### Scene 4 — THE REVEAL | ``Meet Rosavia.``
- Foto botol asli (PNG transparan) menjadi fokus, floral line art, kelopak.
- Headline, subtitle `Soft Feminine Scent`, `18 mL`, `Extrait de Parfume`.
- CTA `Explore the bottle` membuka modal detail memakai foto lengkap asli.
- CTA pembelian hanya muncul **setelah** URL checkout resmi tersedia.

### Navigasi
- Header tetap di atas: logo Rosavia, label editorial, tombol `Explore`.
- Rail kiri: `THE ROSAVIA STORY` dan angka `01 / 04`.
- Rail kanan: empat titik chapter + tombol naik/turun.
- Scroll normal dengan snap yang lembut; keyboard & sentuh tetap bisa dipakai.
- Mobile: konten disusun agar objek tidak menutupi copy atau CTA.

## 3. Struktur kode target

```text
rosavia-web/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/SiteHeader.tsx
│   ├── navigation/ChapterRail.tsx
│   ├── navigation/ScenePagination.tsx
│   ├── story/StoryExperience.tsx
│   ├── story/StoryScene.tsx
│   ├── story/RoseScene.tsx
│   ├── story/EssenceScene.tsx
│   ├── story/CharacterScene.tsx
│   ├── story/RevealScene.tsx
│   ├── product/ProductDetailDialog.tsx
│   └── motion/ReducedMotionGate.tsx
├── hooks/
│   ├── useStoryScroll.ts
│   └── usePrefersReducedMotion.ts
├── config/
│   ├── brand.ts
│   └── chapters.ts
├── public/assets/
│   ├── rosavia-bottle-transparent.png
│   ├── rosavia-original.webp
│   ├── rosavia-hero-1920x1080.webp
│   ├── rose-stage-1920x1080.webp
│   ├── floral-blur-1920x1080.webp
│   ├── glass-bowl.svg
│   ├── alembic.svg
│   ├── rose-line.svg
│   ├── petal-rose.svg
│   ├── petal-small.svg
│   ├── drop.svg
│   └── brand-mark.svg
├── docs/
│   ├── design.md
│   ├── animation-spec.md
│   └── assets-guide.md
├── package.json
├── next.config.ts
└── README.md
```

**Jika proyek sudah ada:** audit dulu folder & dependency; adaptasikan, jangan timpa atau menghapus pekerjaan existing.

## 4. Tahapan kerja untuk Codex

| Tahap | Pekerjaan | Exit criteria |
|---|---|---|
| 1 — Audit | Baca `IMPLEMENTATION_PLAN.md`, `docs/design.md`, video/foto jika tersedia, semua asset, dan struktur repo | Codex menyajikan rencana file serta risiko sebelum perubahan besar |
| 2 — Scaffold | Next.js + TS, Tailwind, token warna, font, metadata, eslint | Dev server dapat berjalan |
| 3 — Static scenes | Bangun empat komponen scene, copywriting valid, elemen visual dari `public/assets` | Seluruh scene tampil baik desktop & mobile tanpa GSAP |
| 4 — GSAP motion | Tambahkan ScrollTrigger desktop, scene timelines, pagination, reduced-motion fallback | Transisi halus, dapat dikontrol manual dengan dot/keyboard |
| 5 — Modal | Dialog detail produk berisi gambar asli dan info valid | Dapat dibuka, ditutup, keyboard accessible |
| 6 — Responsive | Breakpoint mobile/tablet/desktop, touch behaviour, focal point, overflow | 360/390/768/1440 px tidak terpotong/overlap |
| 7 — Quality | SEO, performance, alt, Lighthouse, keyboard, build, lint | `npm run build` dan lint/test berhasil |
| 8 — Deploy | Set domain/env, Vercel, final smoke test | Website publik bekerja, CTA checkout hanya jika diisi |

## 5. Detail motion yang disarankan

- Scene pin animation desktop dengan total kira-kira `400vh` untuk 4 bab; jangan gunakan heavy video autoplay.
- ScrollTrigger `scrub: 0.8–1.2`, `invalidateOnRefresh: true` dan cleanup via `gsap.context()`.
- Timeline per chapter: fade out narasi lama 0.25 bagian timeline, masuk visual berikutnya 0.45, reveal teks baru 0.30.
- Text stagger `0.08–0.13s`; duration `0.6–1.0s`, ease `power2.out`.
- Layered parallax maksimal `20–70px`, transform/opacity saja.
- Loop ambient `4–9s` dengan amplitude `8–20px`; matikan untuk reduced motion.
- Pada viewport kecil atau touch low-powered gunakan scroll natural + `IntersectionObserver` (tanpa pin berlebihan).

Dokumentasi lebih detail di `docs/animation-spec.md`.

## 6. Uji minimum dan nonnegotiables

- [ ] Semua adegan ada dan urutannya benar.
- [ ] Produk Rosavia asli, label terbaca, tidak diganti botol AI.
- [ ] Scroll wheel, swipe, klik dots, keyboard dan CTA berfungsi.
- [ ] Tidak ada scroll trap, layout shift besar, atau horizontal overflow.
- [ ] Resolusi 360×800, 390×844, 768×1024, 1440×900, 1920×1080 layak.
- [ ] `prefers-reduced-motion: reduce` tidak menjalankan animasi intens.
- [ ] Dialog modal bisa ditutup dengan Escape.
- [ ] Tidak ada klaim produk atau informasi perdagangan yang dikarang.
- [ ] Optimasi next/image, lazy load, SVG lokal, no unnecessary 3D library.
- [ ] Build, lint, dan preview produksi diperiksa sebelum selesai.

## 7. Informasi yang masih perlu diisi pemilik brand

- Harga dan ketersediaan.
- URL resmi beli / WhatsApp / marketplace.
- Informasi komposisi atau piramida notes bila tersedia.
- Detail legalitas produk jika ingin ditampilkan.
- Email/domain dan akun sosial resmi.

**MVP tetap bisa dirilis sebagai brand-story website tanpa inventaris dan checkout**. Gunakan CTA eksplorasi hingga link penjualan resmi diberikan.
