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
};
export const products: Product[] = [
  {
    id: "roam",
    name: "The Roam",
    category: "Everyday",
    color: "Stone suede",
    price: 145,
    image: "shoe",
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
    tag: "A modern classic",
    description:
      "The familiar loafer, thoughtfully simplified. Deep espresso suede, a relaxed toe shape and a beautifully understated finish, from morning coffee to evening plans.",
    colors: ["#4b352a", "#a48a6f", "#252a25"],
  },
];
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
    `${product.name} ${product.color} ${product.category} ${product.description} ${keywords[product.id]}`.toLowerCase();
  return query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}
