export type SceneKind = "rose" | "essence" | "character" | "reveal";
export type Chapter = {
  id: string;
  kind: SceneKind;
  eyebrow: string;
  title: readonly [string, string];
  description: string;
  action: string;
  label: string;
  caption: string;
};

export const chapters: readonly Chapter[] = [
  {
    id: "the-rose", kind: "rose", eyebrow: "The beginning",
    title: ["Where softness", "begins."],
    description: "Ada keindahan dalam kesan yang lembut. Sebuah cerita visual tentang sisi feminin Rosavia.",
    action: "Discover the story", label: "Bloom", caption: "Rose-inspired visual",
  },
  {
    id: "the-essence", kind: "essence", eyebrow: "The feeling",
    title: ["A delicate", "essence."],
    description: "Dibayangkan melalui kelopak, cahaya, dan gerak yang tenang. Setiap adegan menghadirkan karakter lembut Rosavia.",
    action: "Follow the feeling", label: "Essence", caption: "A study in softness",
  },
  {
    id: "the-character", kind: "character", eyebrow: "The character",
    title: ["Quietly", "captivating."],
    description: "Sebuah komposisi visual tentang kelembutan dan keanggunan—terinspirasi dari karakter Soft Feminine Scent.",
    action: "Meet Rosavia", label: "Character", caption: "An artistic interpretation",
  },
  {
    id: "meet-rosavia", kind: "reveal", eyebrow: "The reveal",
    title: ["Meet", "Rosavia."],
    description: "Soft Feminine Scent. Hadir dalam botol 18 mL dengan tampilan pink yang elegan.",
    action: "Explore the bottle", label: "Rosavia", caption: "Soft Feminine Scent",
  },
];
