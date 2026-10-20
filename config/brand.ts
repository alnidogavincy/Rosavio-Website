type BrandConfig = {
  name: string;
  tagline: string;
  concentration: string;
  volume: string;
  description: string;
  siteUrl: string | null;
  checkoutUrl: string | null;
  contact: { email: string | null; whatsapp: string | null; instagram: string | null };
  images: { bottle: string; original: string; originalAlt: string; bottleAlt: string };
};

export const brand: BrandConfig = {
  name: "Rosavia",
  tagline: "Soft Feminine Scent",
  concentration: "Extrait de Parfume",
  volume: "18 mL",
  description: "Rosavia — Soft Feminine Scent. Extrait de Parfume, 18 mL. Temukan cerita visual tentang kelembutan dan keanggunan Rosavia.",
  siteUrl: null,
  checkoutUrl: null,
  contact: { email: null, whatsapp: null, instagram: null },
  images: {
    bottle: "/assets/rosavia-bottle-transparent.png",
    original: "/assets/rosavia-original.webp",
    originalAlt: "Foto asli parfum Rosavia: botol pink berlabel Extrait de Parfume, Soft Feminine Scent, 18 mL, beserta kotaknya.",
    bottleAlt: "Botol parfum Rosavia asli, tutup metalik dan label pink Soft Feminine Scent, Extrait de Parfume, 18 mL.",
  },
};

export const ui = {
  skip: "Lewati navigasi",
  home: "Rosavia, kembali ke awal cerita",
  headerNote: "An olfactory reverie",
  explore: "Explore the fragrance",
  rail: "The Rosavia story",
  chapters: "Navigasi bab Rosavia",
  next: "Adegan selanjutnya",
  restart: "Kembali ke awal",
  scroll: "Scroll to discover",
  scrollShort: "Scroll to explore",
  conclusion: "A little softness. A world of feeling.",
  dialogEyebrow: "The Rosavia fragrance",
  dialogTitle: ["A little softness,", "a world of feeling."],
  dialogCopy: "Sisi feminin dalam rona pink yang lembut. Kenali Rosavia lebih dekat melalui foto asli botol dan kemasannya.",
  close: "Tutup detail produk",
  back: "Back to the story",
  buy: "Beli Rosavia",
  photoCaption: "Rosavia · The original bottle & box",
  volume: "Volume",
  concentration: "Konsentrasi",
  character: "Karakter",
};

/** Unknown commercial details stay absent. Only an explicitly supplied HTTPS URL enables buying. */
export function officialCheckout(): string | null {
  if (!brand.checkoutUrl) return null;
  try {
    const url = new URL(brand.checkoutUrl);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
