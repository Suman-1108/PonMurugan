export const categories = [
  {
    id: "all",
    name: "All Fireworks",
    slug: "all",
    count: 102,
    icon: "Sparkles",
    tagline: "Explore our entire premium fireworks collection",
    image: "/assets/categories/ComboPack.png"
  },
  {
    id: "sparklers",
    name: "Sparklers",
    slug: "sparklers",
    description: "Vibrant, smokeless, and glittering handheld sparks for all ages.",
    image: "/assets/categories/sparkelers.png",
    gradient: "from-amber-500/30 to-yellow-600/10",
    count: 14,
    icon: "Flame"
  },
  {
    id: "flower-pots",
    name: "Flower Pots",
    slug: "flower-pots",
    description: "Classic glittering conical fountains showering cascades of golden and silver stars.",
    image: "/assets/categories/Flower_Pot.png",
    gradient: "from-orange-500/30 to-red-600/10",
    count: 18,
    icon: "Sparkle"
  },
  {
    id: "ground-chakkars",
    name: "Ground Chakkars",
    slug: "ground-chakkars",
    description: "High-speed spinning wheels forming dazzling luminous circles on the ground.",
    image: "/assets/categories/Ground_Chakkars.png",
    gradient: "from-yellow-500/30 to-amber-600/10",
    count: 10,
    icon: "Disc"
  },
  {
    id: "rockets",
    name: "Sky Rockets",
    slug: "rockets",
    description: "Swift ascending whistling rockets bursting into brilliant parachutes and double sounds.",
    image: "/assets/categories/rocket_crackers.png",
    gradient: "from-red-600/30 to-amber-600/10",
    count: 12,
    icon: "Zap"
  },
  {
    id: "aerial-shots",
    name: "Aerial Sky Shots",
    slug: "aerial-shots",
    description: "Multi-shot sky cakes and giant shells filling the night sky with thunderous colours.",
    image: "/assets/categories/Fancy.png",
    gradient: "from-rose-500/30 to-red-700/10",
    count: 24,
    icon: "Rocket"
  },
  {
    id: "sound-crackers",
    name: "Bijili & Sound Crackers",
    slug: "sound-crackers",
    description: "Traditional rhythmic burst crackers crafted to awaken festive cheer and auspicious celebration spirits.",
    image: "/assets/categories/bijili.png",
    gradient: "from-red-700/30 to-orange-600/10",
    count: 8,
    icon: "Zap"
  },
  {
    id: "gift-boxes",
    name: "Gift Boxes & Combos",
    slug: "gift-boxes",
    description: "Curated festival gift hampers packed with varieties for family celebrations.",
    image: "/assets/categories/gift_box.png",
    gradient: "from-yellow-400/30 to-red-700/10",
    count: 8,
    icon: "Gift"
  },
  {
    id: "fancy-novelty",
    name: "Celebration Combos & Fancy",
    slug: "fancy-novelty",
    description: "Colourful drones, helicopters, sirens, whistling fountains, and complete family assortments.",
    image: "/assets/categories/ComboPack.png",
    gradient: "from-purple-500/30 to-pink-600/10",
    count: 5,
    icon: "Star"
  }
];

export const getCategoryBySlug = (slug) => {
  return categories.find((c) => c.slug === slug);
};
