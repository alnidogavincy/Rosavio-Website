# Verifikasi ROSAVIA

Tanggal: 17 Oktober 2026 (Asia/Jakarta).

## Build dan kualitas kode

- `npm install`: selesai, lockfile tersimpan.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run build`: PASS; route `/` diprerender statis, tidak ada error TypeScript atau warning metadataBase pada build final.
- Versi terpasang tercatat persis dalam `package-lock.json`.
- Seluruh aset `public/assets` dibandingkan SHA-256 dengan kit: **0 perbedaan**. Foto dan label tidak diedit.

## Browser

Playwright dengan Microsoft Edge headless (Chromium) terhadap **production server** port 3001. Hasil per assertion berada di `qa/results.json`; jalankan ulang dengan `npm run test:browser` terhadap server lokal.

- Desktop 1440×900: empat scene, pin GSAP, dots, CTA, state `aria-current`, satu H1, lang=id.
- 1920×1080, 768×1024, 390×844, 360×800: keempat scene, CTA terlihat, tidak ada horizontal overflow, headline tidak melewati kolom, botol tidak bertabrakan dengan area teks.
- Wheel normal, PageUp/PageDown, next/restart, wordmark, header Explore dan urutan CTA.
- Direct link `#meet-rosavia` mengarah ke scene yang benar.
- Dialog menampilkan foto lengkap; Tab/Shift+Tab loop, Escape, backdrop, fokus kembali ke CTA; PageUp tidak menggeser story di belakang dialog.
- Reduced motion yang diubah saat runtime menghapus pin spacer, mengembalikan semua section, dan menghentikan loop. Saat diaktifkan kembali hanya ada satu pin spacer.
- Touch emulation 390×844: native swipe tanpa pin, tap header menuju botol.
- Tanpa JavaScript: empat section dan navigasi anchor tetap tersedia. Modal memerlukan JavaScript.
- Tidak ada browser runtime exception.
- Screenshot diperiksa visual, termasuk foto asli utuh di modal desktop/mobile dan jarak aman botol di HP/tablet.

## Perbaikan dari QA

1. Tab terbalik pada native dialog awalnya dapat berpindah ke chrome browser; ditambahkan focus loop eksplisit.
2. Botol pada 360px dan tablet terlalu dekat ke area copy ketika ambient motion naik; komposisi digeser/diperkecil agar ada ruang gerak.
3. Foto dialog dimuat eager ketika modal dibuka, sementara foto sekunder story tetap lazy.
4. Konfigurasi telemetry Next.js memicu EXDEV pada lingkungan Windows lintas drive; CLI wrapper menonaktifkan telemetry per proses.

## Screenshot

- `qa/desktop-01.png` … `qa/desktop-04.png`
- `qa/desktop-dialog.png`
- `qa/390x844-01.png` … `qa/390x844-04.png`
- `qa/360x800-04.png`, `qa/768x1024-04.png`
- `qa/1920x1080-01.png`, `qa/1920x1080-04.png`
- `qa/mobile-dialog.png`, `qa/phone-touch-390x844.png`, `qa/reduced-motion.png`

## Batas pengujian dan fidelity

Browser diuji melalui Chromium/Edge desktop dan emulasi touch, bukan perangkat fisik iPhone/Android atau Safari. Tidak ada klaim skor Lighthouse, FPS tertentu, atau pengujian lintas semua browser.

Video referensi ditinjau sepanjang 11,03 detik melalui tujuh frame. Scene dan ritme motion diadaptasi menggunakan aset kit, bukan reproduksi 3D atau salinan artwork/brand pihak ketiga. Foto botol asli hanya 409×724; source foto lengkap 1672×941. Ketajaman dibatasi resolusi tersebut.

Belum dipublikasikan ke Vercel. Domain/checkout/kontak resmi belum diberikan; checkout disembunyikan. Panduan deployment ada di README.
