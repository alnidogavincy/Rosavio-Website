# ROSAVIA — Implementation plan

## Audit (17 Oktober 2026)
- [x] Workspace kosong; tidak ada kode pengguna/dependency/AGENTS.md yang perlu dipertahankan.
- [x] Baca seluruh kit: implementation plan, design, animation spec, assets guide, HTML/CSS/JS preview.
- [x] Tinjau video lokal 11.03 detik melalui tujuh frame: rose (0–2s), bowl + falling petals (3–5s), copper vessel zoom (6–8s), bottle reveal (9–11s).
- [x] Periksa foto dan alpha botol asli. Simpan seluruh aset tanpa mengubah label/piksel produk.

## Arah implementasi
Next.js App Router + TypeScript + Tailwind CSS + GSAP/ScrollTrigger. Proyek lokal untuk deployment Vercel oleh pemilik, tanpa pendaftaran hosting lain. Gunakan token persis docs/design.md dan font Italiana/DM Sans yang dilayani lokal.

Desktop: pinned stage, 4 overlapping scenes, scroll native sepanjang 3 viewport ekstra, scrub 1, fade/slide berlapis; tanpa wheel interception. Copy masuk berurutan dan artwork parallax/scale. Mobile/tablet/touch/reduced motion: sections dalam document flow, IntersectionObserver untuk status chapter. Tidak memakai mandatory snapping.

Empat adegan: Where softness begins (rose photography), A delicate essence (glass + petals), Quietly captivating (copper illustration + drop), Meet Rosavia (foto botol asli + outline botanical). Narasi merupakan metafora visual, bukan klaim bahan/proses. Detail memakai foto original lengkap dan spesifikasi terkonfirmasi.

## File yang dibuat/diubah
- package.json, package-lock.json, tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs, .gitignore
- app/layout.tsx, app/page.tsx, app/globals.css
- config/brand.ts, config/chapters.ts
- components/layout/SiteHeader.tsx
- components/navigation/StoryNavigation.tsx
- components/story/StoryExperience.tsx, StoryScene.tsx, SceneArtwork.tsx
- components/product/ProductDetailDialog.tsx
- hooks/useStoryMotion.ts
- public/assets/* (salinan utuh), font lokal dari paket @fontsource
- docs/* (referensi dipertahankan), README.md, docs/verification.md
- scripts/browser-qa.cjs, qa/* screenshot dan hasil verifikasi

## Checklist
- [x] Scaffold, dependencies, self-hosted fonts, tokens, SEO lang=id + OG foto asli.
- [x] Config typed untuk seluruh copy, checkout, kontak; field belum diketahui null.
- [x] Empat adegan lengkap dan responsive.
- [x] ScrollTrigger timeline, lifecycle cleanup, chapter sync dan hash/deep links.
- [x] Header, rail, 4 dots, next, PageUp/PageDown, CTA berfungsi.
- [x] Native dialog, trap focus, Escape/backdrop close, return focus.
- [x] Reduced motion live preference change; fallback jika GSAP/JS tidak tersedia.
- [x] Lazy secondary images, alpha fidelity, semantic heading/focus/alt, no horizontal overflow.
- [x] Lint + TypeScript + production build.
- [x] Browser 360x800,390x844,768x1024,1440x900,1920x1080; scroll/dots/dialog/reduced motion.
- [x] README run/deploy Vercel, field pemilik, hasil test dan penyimpangan.

## Keputusan desain
- Ikuti dua baris headline dengan line break Where softness / begins.; ukuran disesuaikan lebar agar tidak pecah menjadi tiga baris.
- Pertahankan SVG kit untuk bowl/craft. Hasil ilustratif, bukan rekonstruksi 3D video.
- Hindari konten placeholder internal dalam dialog. Checkout tidak dirender sebelum URL HTTPS resmi diisi.
- Foto asli lengkap selalu object-fit:contain di dialog, bukan crop yang menyembunyikan box.



# Revisi UI — HTML Maison Rosavia (17 Oktober 2026)
Sumber utama UI kini HTML milik pengguna, menggantikan arah plum/Italiana versi pertama.
- [x] Audit HTML, seluruh layer gambar tertanam, navigasi, cards, autoplay, canvas, modal dan bilingual copy.
- [x] Ekstrak gambar tanpa regenerasi; gunakan komposisi/layer/ukuran/font/color HTML secara langsung.
- [x] Pertahankan stage story → cards → next, watermark, sidebar, material counter, mode Noir/Pink Studio, tour dan spray.
- [x] Integrasi template ke Next.js dengan controller TypeScript scoped dan cleanup, assets/fonts lokal, CSS Tailwind 3 yang sama dengan contoh.
- [x] Hindari klaim produksi/notes/ketahanan/stok dan transaksi palsu dalam sumber HTML; gunakan copy visual/fakta terkonfirmasi.
- [x] Sesuaikan mobile agar kartu dapat digulir dan kontrol tidak menutupi teks; reduced motion dan modal keyboard.
- [x] Bandingkan screenshot source vs implementasi, lint/typecheck/build, tes setiap kontrol.
File utama: components/atelier/*, config/atelier.ts, app/page.tsx, app/layout.tsx, app/globals.css, app/atelier-utilities.css, public/assets/atelier/*, scripts/atelier-qa.cjs, docs/reference/*, README.md.

