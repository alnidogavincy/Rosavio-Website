export type AtelierLanguage = 'en' | 'id';
export type AtelierCard = { icon: string; pills: string[]; title: string; body: string; detail: string };
export type AtelierStage = { id: number; navName: string; counter: string; eyebrow: string; materialHeader: string; materialName: string; headline: string; watermark: string; ctaText: string; description: string; cardsCols: string; cards: AtelierCard[] };
export const atelierStages: Record<AtelierLanguage, AtelierStage[]> = {
  "en": [
    {
      "id": 0,
      "navName": "The Harvest",
      "counter": "/01",
      "eyebrow": "/01 — HARVEST",
      "materialHeader": "THE MATERIAL",
      "materialName": "/Rosa<br/>Damascena",
      "headline": "Where<br/>Perfume<br/>Begins",
      "watermark": "Harvest",
      "ctaText": "SEE THE HARVEST WINDOW",
      "description": "A rose suspended in the quiet of a dark atelier. Light moves over its petals, drawing out folds, shadows and soft pink tones. This is the visual beginning of Rosavia: an editorial study in softness, femininity and the small details that hold our attention. The flower sets the mood for the story to follow, a poetic image rather than a statement about the fragrance formula or the way it is made.",
      "cardsCols": "md:grid-cols-2 max-w-4xl",
      "cards": [
        {
          "icon": "leaf",
          "pills": [
            "Texture",
            "Contrast",
            "Rose"
          ],
          "title": "Terroir",
          "body": "A study of texture, natural contours and the contrast between pink petals and deep shadow. The rose is the visual starting point of this story.",
          "detail": "A study of texture, natural contours and the contrast between pink petals and deep shadow. The rose is the visual starting point of this story."
        },
        {
          "icon": "sun",
          "pills": [
            "Soft Light",
            "Petals",
            "Stillness"
          ],
          "title": "Dawn Picking",
          "body": "Soft light reveals the folds of the flower. This moment is an artistic interpretation of stillness and the beginning of the Rosavia story.",
          "detail": "Soft light reveals the folds of the flower. This moment is an artistic interpretation of stillness and the beginning of the Rosavia story."
        }
      ]
    },
    {
      "id": 1,
      "navName": "Extraction",
      "counter": "/02",
      "eyebrow": "/02 — EXTRACTION",
      "materialHeader": "THE MATERIAL",
      "materialName": "/Copper<br/>Alembic",
      "headline": "Capturing<br/>the Scent",
      "watermark": "Extraction",
      "ctaText": "COMPARE THE METHODS",
      "description": "Petals drift toward a glass vessel as light catches its surface. Reflections, transparency and slow movement turn a simple composition into a moment of stillness. This scene imagines the feeling of a delicate essence through visual storytelling. The bowl and copper objects are artistic metaphors, rather than documentation of Rosavia ingredients or extraction methods.",
      "cardsCols": "md:grid-cols-3 max-w-6xl",
      "cards": [
        {
          "icon": "flask",
          "pills": [
            "Copper",
            "Glass",
            "Reflections"
          ],
          "title": "Steam Distillation",
          "body": "Copper and glass catch the light in this visual scene. Their reflections create a warm, clear contrast with the softness of the floating petals.",
          "detail": "Copper and glass catch the light in this visual scene. Their reflections create a warm, clear contrast with the softness of the floating petals."
        },
        {
          "icon": "beaker",
          "pills": [
            "Pink Layers",
            "Transparency",
            "Depth"
          ],
          "title": "Solvent Extraction",
          "body": "A closer look at the pink layers, translucent surface and quiet movement. The composition explores depth through light and reflection.",
          "detail": "A closer look at the pink layers, translucent surface and quiet movement. The composition explores depth through light and reflection."
        },
        {
          "icon": "sparkles",
          "pills": [
            "Motion",
            "Light",
            "Atmosphere"
          ],
          "title": "CO₂ Extraction",
          "body": "Tiny floating details connect the foreground to the dark backdrop. The scene uses motion to suggest a delicate, atmospheric feeling.",
          "detail": "Tiny floating details connect the foreground to the dark backdrop. The scene uses motion to suggest a delicate, atmospheric feeling."
        }
      ]
    },
    {
      "id": 2,
      "navName": "The Structure",
      "counter": "/03",
      "eyebrow": "/03 — STRUCTURE",
      "materialHeader": "THE MATERIAL",
      "materialName": "/Olfactory<br/>Pyramid",
      "headline": "Top, Heart<br/>and Base",
      "watermark": "Structure",
      "ctaText": "READ THE PYRAMID",
      "description": "A warm copper silhouette takes the stage. Highlights travel across its curves while small golden particles rise through the dark. The image gives structure to the story: light, depth and character held in balance. Rosavia introduces itself through the confirmed signature on its label — Soft Feminine Scent — without assigning unconfirmed fragrance notes or performance claims.",
      "cardsCols": "md:grid-cols-3 max-w-6xl",
      "cards": [
        {
          "icon": "droplet",
          "pills": [
            "First Impression",
            "Light",
            "Space"
          ],
          "title": "Top Notes",
          "body": "The first visual impression: light, space and a restrained pink accent. This card describes the composition, not a list of Rosavia ingredients.",
          "detail": "The first visual impression: light, space and a restrained pink accent. This card describes the composition, not a list of Rosavia ingredients."
        },
        {
          "icon": "heart",
          "pills": [
            "Soft Feminine",
            "Character",
            "Rosavia"
          ],
          "title": "Heart Notes",
          "body": "The center of the story holds the identity printed on the bottle: Soft Feminine Scent. A quiet balance of pink light and warm shadow.",
          "detail": "The center of the story holds the identity printed on the bottle: Soft Feminine Scent. A quiet balance of pink light and warm shadow."
        },
        {
          "icon": "layers",
          "pills": [
            "Shadow",
            "Depth",
            "Balance"
          ],
          "title": "Base Notes",
          "body": "The dark background gives the bottle and its details room to stand out. This is the visual foundation of the story, not a longevity claim.",
          "detail": "The dark background gives the bottle and its details room to stand out. This is the visual foundation of the story, not a longevity claim."
        }
      ]
    },
    {
      "id": 3,
      "navName": "Maturation",
      "counter": "/04",
      "eyebrow": "/04 — MATURATION",
      "materialHeader": "THE MATERIAL",
      "materialName": "/Rosavia<br/>Flacon",
      "headline": "Rest,<br/>Filter,<br/>Bottle",
      "watermark": "Maturation",
      "ctaText": "FINISH THE PROCESS",
      "description": "The original Rosavia bottle comes into focus: a silver-colored cap, a soft pink label and an 18 mL flacon. Extrait de Parfume. Soft Feminine Scent. Explore the dark composition, switch to the pink studio, or open the original photograph of the bottle and box.",
      "cardsCols": "md:grid-cols-3 max-w-6xl",
      "cards": [
        {
          "icon": "moon",
          "pills": [
            "Pause",
            "Stillness",
            "Reveal"
          ],
          "title": "Maceration",
          "body": "A quiet pause before the final reveal. The stillness in this scene is an artistic choice, not a statement about manufacturing or maturation time.",
          "detail": "A quiet pause before the final reveal. The stillness in this scene is an artistic choice, not a statement about manufacturing or maturation time."
        },
        {
          "icon": "snowflake",
          "pills": [
            "Glass",
            "Silver",
            "Light"
          ],
          "title": "Cold Filtration",
          "body": "Light passes over the glass and silver-colored cap. Explore the clarity of the original photograph and the details of the Rosavia bottle.",
          "detail": "Light passes over the glass and silver-colored cap. Explore the clarity of the original photograph and the details of the Rosavia bottle."
        },
        {
          "icon": "sparkle",
          "pills": [
            "Extrait de Parfume",
            "18 mL",
            "Soft Feminine"
          ],
          "title": "Rosavia 18mL Bottle",
          "body": "The original Rosavia bottle and box. Extrait de Parfume · 18 mL · Soft Feminine Scent. Open the atelier to inspect the full photograph.",
          "detail": "The original Rosavia bottle and box. Extrait de Parfume · 18 mL · Soft Feminine Scent. Open the atelier to inspect the full photograph."
        }
      ]
    }
  ],
  "id": [
    {
      "id": 0,
      "navName": "Panen Mawar",
      "counter": "/01",
      "eyebrow": "/01 — PANEN MAWAR",
      "materialHeader": "BAHAN UTAMA",
      "materialName": "/Rosa<br/>Damascena",
      "headline": "Awal Mula<br/>Sebuah<br/>Parfum",
      "watermark": "Harvest",
      "ctaText": "LIHAT WAKTU PANEN",
      "description": "Sekuntum mawar hadir dalam ketenangan atelier yang gelap. Cahaya menyusuri kelopaknya, memperlihatkan lipatan, bayangan, dan rona pink yang lembut. Inilah pembuka visual Rosavia: sebuah cerita tentang kelembutan, sisi feminin, dan detail kecil yang menarik perhatian. Bunga menjadi metafora suasana, bukan pernyataan tentang formula parfum atau proses pembuatannya.",
      "cardsCols": "md:grid-cols-2 max-w-4xl",
      "cards": [
        {
          "icon": "leaf",
          "pills": [
            "Texture",
            "Contrast",
            "Rose"
          ],
          "title": "Terroir",
          "body": "Studi tekstur, bentuk alami, serta kontras kelopak pink dengan bayangan gelap. Mawar menjadi titik awal visual cerita ini.",
          "detail": "Studi tekstur, bentuk alami, serta kontras kelopak pink dengan bayangan gelap. Mawar menjadi titik awal visual cerita ini."
        },
        {
          "icon": "sun",
          "pills": [
            "Soft Light",
            "Petals",
            "Stillness"
          ],
          "title": "Petik Fajar",
          "body": "Cahaya lembut memperlihatkan lipatan bunga. Adegan ini merupakan interpretasi artistik dari ketenangan dan awal cerita Rosavia.",
          "detail": "Cahaya lembut memperlihatkan lipatan bunga. Adegan ini merupakan interpretasi artistik dari ketenangan dan awal cerita Rosavia."
        }
      ]
    },
    {
      "id": 1,
      "navName": "Ekstraksi",
      "counter": "/02",
      "eyebrow": "/02 — EKSTRAKSI",
      "materialHeader": "BAHAN UTAMA",
      "materialName": "/Copper<br/>Alembic",
      "headline": "Menangkap<br/>Esensi Wangi",
      "watermark": "Extraction",
      "ctaText": "BANDINGKAN METODE",
      "description": "Kelopak bergerak perlahan menuju bejana kaca saat cahaya menyentuh permukaannya. Refleksi, transparansi, dan gerakan yang tenang membentuk kesan esensi yang lembut. Bowl dan objek tembaga di adegan ini merupakan metafora visual, bukan dokumentasi bahan atau metode ekstraksi Rosavia.",
      "cardsCols": "md:grid-cols-3 max-w-6xl",
      "cards": [
        {
          "icon": "flask",
          "pills": [
            "Copper",
            "Glass",
            "Reflections"
          ],
          "title": "Distilasi Uap",
          "body": "Tembaga dan kaca memantulkan cahaya. Refleksinya menghadirkan kontras hangat dengan kelembutan kelopak yang mengambang.",
          "detail": "Tembaga dan kaca memantulkan cahaya. Refleksinya menghadirkan kontras hangat dengan kelembutan kelopak yang mengambang."
        },
        {
          "icon": "beaker",
          "pills": [
            "Pink Layers",
            "Transparency",
            "Depth"
          ],
          "title": "Ekstraksi Pelarut",
          "body": "Lihat lebih dekat lapisan pink, permukaan transparan, dan gerakan yang tenang. Komposisi ini mengeksplorasi cahaya dan refleksi.",
          "detail": "Lihat lebih dekat lapisan pink, permukaan transparan, dan gerakan yang tenang. Komposisi ini mengeksplorasi cahaya dan refleksi."
        },
        {
          "icon": "sparkles",
          "pills": [
            "Motion",
            "Light",
            "Atmosphere"
          ],
          "title": "Ekstraksi CO₂",
          "body": "Detail yang melayang menghubungkan objek depan dengan latar gelap. Gerakan membentuk suasana ringan dan lembut.",
          "detail": "Detail yang melayang menghubungkan objek depan dengan latar gelap. Gerakan membentuk suasana ringan dan lembut."
        }
      ]
    },
    {
      "id": 2,
      "navName": "Struktur Aroma",
      "counter": "/03",
      "eyebrow": "/03 — STRUKTUR AROMA",
      "materialHeader": "BAHAN UTAMA",
      "materialName": "/Olfactory<br/>Pyramid",
      "headline": "Top, Heart<br/>dan Base",
      "watermark": "Structure",
      "ctaText": "BACA PIRAMIDA AROMA",
      "description": "Siluet tembaga hangat menjadi pusat adegan. Cahaya menyusuri lengkungnya, sementara partikel keemasan bergerak perlahan di ruang gelap. Komposisi ini mempertemukan cahaya, kedalaman, dan karakter. Rosavia hadir dengan identitas yang tertera pada labelnya: Soft Feminine Scent.",
      "cardsCols": "md:grid-cols-3 max-w-6xl",
      "cards": [
        {
          "icon": "droplet",
          "pills": [
            "First Impression",
            "Light",
            "Space"
          ],
          "title": "Top Notes",
          "body": "Kesan visual pertama: cahaya, ruang, dan aksen pink. Kartu ini menjelaskan komposisi gambar, bukan daftar bahan Rosavia.",
          "detail": "Kesan visual pertama: cahaya, ruang, dan aksen pink. Kartu ini menjelaskan komposisi gambar, bukan daftar bahan Rosavia."
        },
        {
          "icon": "heart",
          "pills": [
            "Soft Feminine",
            "Character",
            "Rosavia"
          ],
          "title": "Heart Notes",
          "body": "Pusat cerita menghadirkan identitas pada botol: Soft Feminine Scent. Keseimbangan rona pink dengan bayangan hangat.",
          "detail": "Pusat cerita menghadirkan identitas pada botol: Soft Feminine Scent. Keseimbangan rona pink dengan bayangan hangat."
        },
        {
          "icon": "layers",
          "pills": [
            "Shadow",
            "Depth",
            "Balance"
          ],
          "title": "Base Notes",
          "body": "Latar gelap memberi ruang bagi detail botol. Ini merupakan fondasi visual, bukan klaim ketahanan parfum.",
          "detail": "Latar gelap memberi ruang bagi detail botol. Ini merupakan fondasi visual, bukan klaim ketahanan parfum."
        }
      ]
    },
    {
      "id": 3,
      "navName": "Maturasi & Botol",
      "counter": "/04",
      "eyebrow": "/04 — MATURASI",
      "materialHeader": "BAHAN UTAMA",
      "materialName": "/Rosavia<br/>Flacon",
      "headline": "Rest,<br/>Filter,<br/>Bottle",
      "watermark": "Maturation",
      "ctaText": "SELESAIKAN PROSES",
      "description": "Cerita berakhir pada botol Rosavia asli. Tutup silver, label pink, dan siluetnya hadir dalam sorotan. Extrait de Parfume dalam botol 18 mL, dengan identitas Soft Feminine Scent. Beralih antara komposisi noir dan foto studio pink, lalu lihat botol beserta kotaknya secara utuh di atelier.",
      "cardsCols": "md:grid-cols-3 max-w-6xl",
      "cards": [
        {
          "icon": "moon",
          "pills": [
            "Pause",
            "Stillness",
            "Reveal"
          ],
          "title": "Maserasi",
          "body": "Jeda tenang sebelum botol terungkap. Ketenangan adegan merupakan pilihan artistik, bukan klaim lama proses pematangan.",
          "detail": "Jeda tenang sebelum botol terungkap. Ketenangan adegan merupakan pilihan artistik, bukan klaim lama proses pematangan."
        },
        {
          "icon": "snowflake",
          "pills": [
            "Glass",
            "Silver",
            "Light"
          ],
          "title": "Filtrasi Dingin",
          "body": "Cahaya menyentuh kaca dan tutup berwarna silver. Amati kejernihan foto asli dan detail botol Rosavia.",
          "detail": "Cahaya menyentuh kaca dan tutup berwarna silver. Amati kejernihan foto asli dan detail botol Rosavia."
        },
        {
          "icon": "sparkle",
          "pills": [
            "Extrait de Parfume",
            "18 mL",
            "Soft Feminine"
          ],
          "title": "Botol Rosavia 18mL",
          "body": "Botol dan kotak Rosavia asli. Extrait de Parfume · 18 mL · Soft Feminine Scent. Buka atelier untuk melihat foto lengkap.",
          "detail": "Botol dan kotak Rosavia asli. Extrait de Parfume · 18 mL · Soft Feminine Scent. Buka atelier untuk melihat foto lengkap."
        }
      ]
    }
  ]
};

