# Verifikasi revisi Maison Rosavia

17 Oktober 2026. Acuan UI utama: `maison_rosavia_atelier_de_parfume_extrait_de_parfume_18ml.html` milik pengguna.

## Fidelity

- Enam gambar base64 diekstrak byte-for-byte ke `public/assets/atelier/`; tidak ada generasi atau editing gambar.
- Markup dan utility classes desktop berasal langsung dari HTML, memakai compiler Tailwind 3.4.17 yang sama.
- Cormorant Garamond, Inter, Playfair Display dilayani lokal; screenshot sumber dan implementasi telah dibandingkan pada 1440×900.
- Urutan story → cards → next, sidebar, material counter, outline watermark, glass cards, spray, bilingual controls, tur otomatis, dan mode Pink Studio/Noir dipertahankan.
- Perbedaan: copy klaim produk belum terkonfirmasi diganti narasi visual; tidak ada form pesanan/subscription yang berpura-pura berhasil. Mobile/tablet disesuaikan untuk keterbacaan, foto botol tidak menutupi copy.

## Pemeriksaan

- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run build`: PASS, route `/` statis.
- Browser: Edge/Chromium headless dengan Playwright; hasil terbaru lengkap tersimpan di `qa/atelier-results.json`.
- Lima viewport: 360×800, 390×844, 768×1024, 1440×900, 1920×1080.
- Semua stage/cards dan detail, mode latar, modal produk/foto/focus trap/Escape/return focus, lima tautan footer, bahasa, wheel/keyboard, tour/pause/spray, reduced motion, swipe/touch, deep link dan runtime errors.
- Gambar diperiksa visual untuk desktop, mobile, tablet, kartu dan modal.

## Perbaikan dari QA

- Fokus modal dijadwalkan setelah pembaruan inert DOM; loop Tab juga menangani fokus di luar panel.
- Paragraf final lebih ringkas dan kolomnya dibatasi agar produk tetap terlihat.
- Tablet menggunakan ukuran botol/posisi dan sidebar yang tidak menutupi copy; kartu menjadi kolom yang dapat digulir.
- Tombol navigasi HP dipisahkan dari area foto botol.
- Tes wheel menunggu dispatch scroll browser sebelum memeriksa state.

## Batas

Diuji pada Chromium/Edge serta emulasi touch, belum perangkat fisik/Safari. Tidak mengklaim pixel-perfect untuk copy yang diganti atau seluruh breakpoint; komposisi desktop dan aset berasal langsung dari contoh. Proyek tetap lokal, belum dipublikasikan.

Laporan `docs/verification.md` dan screenshot tanpa prefix `atelier-` adalah hasil versi desain pertama, dipertahankan sebagai riwayat.

Tambahan hasil perbaikan tablet: tombol Show Story Note ditempatkan pada baris terpisah sehingga panel kanan tidak menangkap kliknya. Wheel pada panel kartu yang overflow menggulir panel tersebut tanpa berpindah stage.
Panel kartu aktif kini memiliki pointer-events:auto eksplisit agar celah antarkartu dan scrollbar menerima input, mengikuti perilaku HTML sumber.

Hasil final production: 18/18 pemeriksaan browser PASS, 0 runtime exception. Lint, TypeScript, dan production build PASS.
