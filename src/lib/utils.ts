import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getProductImages(product: {
  images?: string[];
  image?: string;
}): string[] {
  if (product.images?.length) return product.images;
  if (product.image) return [product.image];
  return [];
}
