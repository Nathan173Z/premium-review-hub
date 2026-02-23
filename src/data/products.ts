export interface Accessory {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  images?: string[];
  image?: string;
  shortDesc: string;
  fullReview: string;
  pros?: string[];
  cons?: string[];
  specs?: Record<string, string>;
  affiliateLink: string;
  mlLink?: string;
  comparison?: {
    competitor: string;
    items: { feature: string; ours: string; theirs: string }[];
  };
  accessories?: Accessory[];
}

export const categories = [
  { id: "all", name: "Todos", icon: "Grid3X3" },
  { id: "audio", name: "Áudio", icon: "Headphones" },
  { id: "wearable", name: "Wearables", icon: "Watch" },
  { id: "computador", name: "Computadores", icon: "Laptop" },
  { id: "energia", name: "Energia", icon: "Zap" },
];
