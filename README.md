# Maison Rosavia — Atelier de Parfume

Revisi UI ini mengikuti HTML yang diberikan pemilik pada 17 Oktober 2026. Komposisi desktop, gambar tertanam, font Cormorant Garamond/Inter/Playfair Display, sidebar, material counter, watermark outline, glass cards dan urutan transisi diadaptasi langsung dari sumber tersebut.

## Menjalankan

Node.js 20.9+ (pengujian menggunakan Node 24).

```sh
npm install
npm run dev
```

Buka http://localhost:3000. Untuk production:

```sh
npm run build
npm start
```

`predev` dan `prebuild` mengompilasi utility CSS menggunakan Tailwind **3.4.17**, versi yang dipakai HTML contoh. Tidak ada dependency CDN saat website dibuka. Font dan gambar dilayani lokal. Next.js App Router + TypeScript tetap digunakan.

## Interaksi sesuai contoh

- Empat stage: The Harvest → Extraction → The Structure → Maturation.
- Setiap stage memiliki dua state: editorial story dan kartu kaca. Scroll/next/PageDown mengungkap kartu, lalu melanjutkan ke stage berikutnya; PageUp kembali.
- Sidebar memilih stage langsung. Counter kanan berpindah chapter.
- Auto-Play Video Tour menggerakkan cerita setiap 2,4 detik dan dapat dijeda; interaksi navigasi menghentikannya.
- Stage akhir: transisi Pink Studio → Noir Flacon, dengan pilihan manual dua latar.
- Klik botol atau Spray Rosavia memicu efek kabut visual; tidak ada klaim semprotan fisik/aroma digital.
- Bahasa EN/ID, modal detail setiap kartu, modal Materials/Method/Glossary/Atelier/Contact.
- Foto studio dan cutout dapat dipilih dalam modal produk.
- Reduced motion mematikan CSS loops/canvas/autoplay. Tab tersembunyi menghentikan animasi. Listener, timer dan animation frame dibersihkan saat komponen unmount.
- Mobile: komposisi disesuaikan agar kontrol terbaca, swipe berpindah tahap, kartu dapat digulir tanpa memindahkan chapter. Tidak ada wheel interception di mobile.

## Perbedaan yang disengaja dari HTML sumber

Desktop memakai markup/classes/visual asli. Penyesuaian terbatas pada:

1. Copy tentang kandungan, proses produksi, 30% konsentrasi, durasi wangi, stok, varian dan reservasi di contoh belum terkonfirmasi. Copy diganti narasi visual dan fakta pada label; tidak ada pesanan/subscription palsu.
2. Checkout hanya muncul jika `config/brand.ts` → `checkoutUrl` diisi URL HTTPS resmi. Kontak/sosial belum diberi tautan karena belum ada data resmi.
3. Mobile ditata ulang secukupnya; paragraf stage botol desktop dibatasi agar tidak menutupi botol.
4. Fokus keyboard, modal inert/focus trap/Escape, reduced motion, language document, dan cleanup ditambahkan.
5. Kode inline source tidak dieksekusi. Markup statis yang sudah diinspeksi ditingkatkan oleh controller TypeScript scoped; tidak memakai iframe atau runtime `eval`.

## File utama

- `app/page.tsx`: entry point ke desain baru.
- `app/layout.tsx`: font lokal, metadata produk dan OG foto asli.
- `app/globals.css`: CSS sumber + adaptasi accessibility/mobile.
- `app/atelier-utilities.css`: hasil compiler Tailwind 3; dihasilkan ulang otomatis.
- `styles/atelier-tailwind.css`, `tailwind.reference.cjs`: input dan konfigurasi compiler sesuai HTML.
- `components/atelier/AtelierExperience.tsx`: React lifecycle.
- `components/atelier/markup.ts`: markup statis dari HTML milik pengguna.
- `components/atelier/controller.ts`: navigasi, dua state per stage, modal, bahasa, tour, canvas dan cleanup.
- `components/atelier/icons.ts`: SVG ikon asli dari HTML.
- `config/atelier.ts`: konten stage/kartu EN/ID yang typed.
- `config/brand.ts`: fakta produk, domain, checkout dan kontak.
- `public/assets/atelier/`: enam gambar diekstrak tanpa perubahan piksel dari HTML.
- `docs/reference/`: HTML yang sudah diekstrak dan CSS sumber untuk pembandingan; tidak menjadi public route.
- `scripts/atelier-qa.cjs`: pengujian interaksi dan responsive.
- `qa/atelier-*.png`, `qa/atelier-results.json`: screenshot dan hasil verifikasi baru.

Komponen versi desain pertama tetap tersedia di `components/story`, `components/navigation`, `components/product` dan `hooks`; halaman utama sekarang memakai `components/atelier`.

## Verifikasi

```sh
npm run lint
npm run typecheck
npm run build
npm run test:browser
```

Browser test memerlukan server berjalan. Default http://127.0.0.1:3000; gunakan `QA_URL` untuk URL lain. Windows memakai Edge; platform lain memakai Chromium Playwright. Screenshot diuji pada 360×800, 390×844, 768×1024, 1440×900 dan 1920×1080.

## Deploy Vercel

Import repository ke Vercel, pilih preset Next.js, root direktori proyek, Node 24, build `npm run build`, output default. Isi domain resmi pada `config/brand.ts` (`siteUrl`) atau `NEXT_PUBLIC_SITE_URL` sebelum deploy custom domain. Pada Vercel, URL metadata otomatis menggunakan deployment domain bila domain resmi belum diisi. Proyek belum dipublikasikan oleh pekerjaan lokal ini.

Field yang masih perlu diisi: domain, URL checkout resmi, email, nomor WhatsApp, akun sosial resmi. Harga, stok, komposisi, legalitas, varian dan testimoni tetap tidak ditampilkan sampai ada data terkonfirmasi.
