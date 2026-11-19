export type Product = {
  id: string;
  name: string;
  category: string;
  color: string;
  price: number;
  image: string;
  tag: string;
  description: string;
  colors: string[];
  gallery?: string[];
};
export const products: Product[] = [
  {
    id: "roam",
    name: "The Roam",
    category: "Everyday",
    color: "Stone suede",
    price: 145,
    image: "shoe",
    gallery: ["shoe", "shoe-top", "women"],
    tag: "A new everyday",
    description:
      "An easy silhouette for unhurried days. Soft stone suede, a natural shape and just enough detail. Pair with your favourite denim, or take the long way home.",
    colors: ["#b1a18d", "#52483e", "#e8e0cc"],
  },
  {
    id: "moor",
    name: "The Moor",
    category: "Outdoors",
    color: "Chestnut leather",
    price: 195,
    image: "boot",
    gallery: ["boot", "boot-back", "men"],
    tag: "For the open air",
    description:
      "A considered walking boot with rich chestnut leather, understated hardware and a grounded profile. A companion for changing seasons and paths less familiar.",
    colors: ["#593c2d", "#2f3329", "#a18c70"],
  },
  {
    id: "ease",
    name: "The Ease",
    category: "Everyday",
    color: "Chalk leather",
    price: 155,
    image: "white",
    gallery: ["white", "white-top"],
    tag: "Quietly essential",
    description:
      "Clean lines. Warm chalk leather. A soft neutral that goes with almost everything. A pared-back take on the everyday sneaker.",
    colors: ["#e8e3d5", "#b1a18d", "#393930"],
  },
  {
    id: "still",
    name: "The Still",
    category: "Everyday",
    color: "Espresso suede",
    price: 165,
    image: "loafer",
    gallery: ["loafer", "loafer-top", "city"],
    tag: "A modern classic",
    description:
      "The familiar loafer, thoughtfully simplified. Deep espresso suede, a relaxed toe shape and a beautifully understated finish, from morning coffee to evening plans.",
    colors: ["#4b352a", "#a48a6f", "#252a25"],
  },
];
products.push(
  {
    id: "ridge",
    name: "The Ridge",
    category: "Outdoors",
    color: "Moss ripstop",
    price: 175,
    image: "trail",
    tag: "Off the beaten path",
    description:
      "Tonal moss ripstop meets soft suede in a considered trail silhouette. A generous shape, quiet orange detailing and a low, grounded profile.",
    colors: ["#565c3e"],
    gallery: ["trail", "forest"],
  },
  {
    id: "holt",
    name: "The Holt",
    category: "Everyday",
    color: "Dark oak leather",
    price: 185,
    image: "chelsea",
    tag: "The autumn essential",
    description:
      "An understated Chelsea boot in dark oak leather. Easy elastic side panels and a clean ankle line bring a familiar classic into your everyday wardrobe.",
    colors: ["#332d26"],
    gallery: ["chelsea", "city"],
  },
  {
    id: "cove",
    name: "The Cove",
    category: "Everyday",
    color: "Natural tan leather",
    price: 125,
    image: "sandals",
    tag: "Days in the sun",
    description:
      "Broad interwoven leather straps and a simple brass buckle. An open, easy fisherman sandal in warm tan, imagined for long lunches and coastal mornings.",
    colors: ["#b17d4b"],
    gallery: ["sandals", "shore"],
  },
  {
    id: "pace",
    name: "The Pace",
    category: "Outdoors",
    color: "Ecru / moss",
    price: 160,
    image: "runner",
    tag: "Find your rhythm",
    description:
      "Airy mesh, soft suede accents and a quietly nostalgic shape. An ecru and moss running-inspired sneaker for active days at your own pace.",
    colors: ["#dcd8c9"],
    gallery: ["runner", "forest"],
  },
  {
    id: "hearth",
    name: "The Hearth",
    category: "Everyday",
    color: "Tobacco suede",
    price: 115,
    image: "clog",
    tag: "At home, anywhere",
    description:
      "A broad suede upper and sculpted cork footbed. An uncomplicated backless clog with rich texture and an easy, familiar feel.",
    colors: ["#9b7045"],
    gallery: ["clog", "weekend"],
  },
  {
    id: "day",
    name: "The Day",
    category: "Everyday",
    color: "Sand canvas",
    price: 95,
    image: "canvas",
    tag: "Lightly does it",
    description:
      "Natural canvas, cream cotton laces and a fine rubber edge. A timeless low-top silhouette that feels right with just about everything.",
    colors: ["#d1bfa0"],
    gallery: ["canvas", "weekend"],
  },
  {
    id: "rib",
    name: "The Everyday Sock",
    category: "Accessories",
    color: "Oat / olive pair",
    price: 28,
    image: "socks",
    tag: "The finishing touch",
    description:
      "A softly ribbed crew sock pairing in oat and olive. A textural finishing touch to the considered everyday wardrobe.",
    colors: ["#d7d0bd", "#4b523d"],
    gallery: ["socks", "weekend"],
  },
  {
    id: "carry",
    name: "The Weekend Tote",
    category: "Accessories",
    color: "Olive canvas",
    price: 85,
    image: "tote",
    tag: "Room for the weekend",
    description:
      "Substantial olive canvas, brown leather handles and restrained brass details. An everyday carryall with room for a spontaneous change of plans.",
    colors: ["#53583b"],
    gallery: ["tote", "weekend"],
  },
);
export const stories = {
  philosophy: {
    eyebrow: "The FIELDEN philosophy",
    title: "A quieter way forward.",
    image: "hero",
    body: [
      "There is something good about taking your time. Noticing the light. Choosing the longer path. Finding the things you reach for, again and again.",
      "FIELDEN is a design exploration of that way of living: familiar silhouettes, earthy materials and room for the everyday to become a little more interesting.",
      "A considered collection, imagined for life at your own pace.",
    ],
  },
  materials: {
    eyebrow: "Considered in every detail",
    title: "Good things take feeling.",
    image: "craft",
    body: [
      "The warmth of suede. The character of leather. The simplicity of a well-placed stitch. Our material direction begins with things that feel as good as they look.",
      "This collection concept pairs soft uppers with restrained shapes and natural colours. Details are kept quiet, so texture can do the talking.",
      "These are illustrative product designs, created for this independent ecommerce concept.",
    ],
  },
  coast: {
    eyebrow: "Field notes · Places",
    title: "The art of taking the long way.",
    image: "hero",
    body: [
      "A path curves along the coast. The sea changes colour with every cloud. There is nowhere else you need to be.",
      "Our first visual story is an invitation to step outside and walk without a destination. A slower morning. An unfamiliar turning. A little more space to notice.",
      "Leave the itinerary at home. The best part might be the way there.",
    ],
  },
  wardrobe: {
    eyebrow: "Field notes · Everyday rituals",
    title: "Less, but a little better.",
    image: "women",
    body: [
      "The jacket by the door. The trousers softened by years. The shoes you slip into without a second thought.",
      "An everyday wardrobe is built around familiarity. Choose textures that feel good together, leave room to move and let simple pieces find their own rhythm.",
      "Our seasonal edit brings warm neutrals and tactile finishes together for that very reason.",
    ],
  },
  care: {
    eyebrow: "Field notes · Care",
    title: "Time well spent.",
    image: "craft",
    body: [
      "Let muddy shoes dry naturally, away from direct heat. Use a soft brush to remove surface dirt, following the grain of the material.",
      "For suede, a dedicated suede brush can help lift the nap. Always test a care product on an inconspicuous area first and follow its instructions.",
      "Small rituals make the things you love feel familiar again.",
    ],
  },
};
export type StoryKey = keyof typeof stories;
export function matchesProduct(product: Product, query: string) {
  const keywords: Record<string, string> = {
    roam: "sneakers trainers shoes",
    moor: "boots shoes",
    ease: "sneakers trainers shoes",
    still: "loafers slip-ons shoes",
  };
  const haystack =
    `${product.name} ${product.color} ${product.category} ${product.description} ${keywords[product.id] || ""}`.toLowerCase();
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}
