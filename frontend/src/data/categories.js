export const categories = [
  {
    id: "all",
    name: "All Fireworks",
    slug: "all",
    count: 99,
    icon: "Sparkles",
    tagline: "Explore our entire premium fireworks collection (99 Varieties)",
    image: "/assets/categories/ComboPack.png"
  },
  {
    id: "sparklers",
    name: "Sparklers",
    slug: "sparklers",
    description: "Vibrant, smokeless, and glittering handheld sparks for all ages (S.No 1 - 19).",
    image: "/assets/categories/sparkelers.png",
    gradient: "from-amber-500/30 to-yellow-600/10",
    count: 19,
    icon: "Flame"
  },
  {
    id: "chorsa-kurvi",
    name: "Chorsa & Kurvi",
    slug: "chorsa-kurvi",
    description: "Traditional rhythmic crackling chorsas and heritage kurvi crackers (S.No 20 - 25).",
    image: "/assets/categories/bijili.png",
    gradient: "from-red-600/30 to-amber-600/10",
    count: 6,
    icon: "Zap"
  },
  {
    id: "twinkling-pencils",
    name: "Twinkling & Pencils",
    slug: "twinkling-pencils",
    description: "Sparkling silver fountains and pencil flares showering long golden sparks (S.No 26 - 29).",
    image: "/assets/categories/sparkelers.png",
    gradient: "from-yellow-400/30 to-amber-500/10",
    count: 4,
    icon: "Sparkle"
  },
  {
    id: "bijli-sound",
    name: "Bijli & Sound",
    slug: "bijli-sound",
    description: "High-octane sound crackers, Titanic, Jurassic, and fast-burst bijili packs (S.No 30 - 37).",
    image: "/assets/categories/bijili.png",
    gradient: "from-red-700/30 to-orange-600/10",
    count: 8,
    icon: "Zap"
  },
  {
    id: "bombs-rockets",
    name: "Bombs & Rockets",
    slug: "bombs-rockets",
    description: "Whistling ascending sky rockets, double sound, and thunder bombs (S.No 38 - 44).",
    image: "/assets/categories/rocket_crackers.png",
    gradient: "from-red-600/30 to-amber-600/10",
    count: 7,
    icon: "Rocket"
  },
  {
    id: "flower-pots",
    name: "Flower Pots & Tins",
    slug: "flower-pots",
    description: "Glittering conical fountains and giant Ashok flower pots (S.No 45 - 48).",
    image: "/assets/categories/Flower_Pot.png",
    gradient: "from-orange-500/30 to-red-600/10",
    count: 4,
    icon: "Sparkle"
  },
  {
    id: "single-sound",
    name: "Single Sound & Walas",
    slug: "single-sound",
    description: "Giant aerial single sound shots and long celebration garland walas (S.No 62 - 72).",
    image: "/assets/categories/Ground_Chakkars.png",
    gradient: "from-amber-600/30 to-red-600/10",
    count: 11,
    icon: "Disc"
  },
  {
    id: "shots-set-outs",
    name: "Shots & Set Outs",
    slug: "shots-set-outs",
    description: "Multi-shot sky cakes, 12 to 240 celestial bursts, and grand set outs (S.No 73 - 85).",
    image: "/assets/categories/Fancy.png",
    gradient: "from-rose-500/30 to-red-700/10",
    count: 13,
    icon: "Star"
  },
  {
    id: "fancy-kids",
    name: "Fancy & Kids",
    slug: "fancy-kids",
    description: "Peacock fountains, drones, helicopters, sirens, and cheerful kids novelties (S.No 91 - 104).",
    image: "/assets/categories/ComboPack.png",
    gradient: "from-purple-500/30 to-pink-600/10",
    count: 14,
    icon: "Sparkles"
  },
  {
    id: "bank-new-items",
    name: "Bank & New Items",
    slug: "bank-new-items",
    description: "Latest 2026 trending innovations, colour smoke, ring cap guns, and money bank novelties (S.No 105 - 112).",
    image: "/assets/categories/ComboPack.png",
    gradient: "from-emerald-500/30 to-teal-600/10",
    count: 8,
    icon: "Gem"
  },
  {
    id: "gift-boxes",
    name: "Gift Boxes",
    slug: "gift-boxes",
    description: "Curated 20 to 65 item luxury Diwali celebration hampers and family gift packs (S.No 113 - 117).",
    image: "/assets/categories/gift_box.png",
    gradient: "from-yellow-400/30 to-red-700/10",
    count: 5,
    icon: "Gift"
  }
];

export const getCategoryBySlug = (slug) => {
  return categories.find((c) => c.slug === slug);
};
