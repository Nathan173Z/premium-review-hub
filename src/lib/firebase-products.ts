import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/data/products";

export type ProductInput = Omit<Product, "id"> & { id?: string };

function stripUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}

function sanitizeProductData(data: ProductInput) {
  const { id: _id, ...rest } = data;
  const base = {
    ...rest,
    pros: data.pros ?? [],
    cons: data.cons ?? [],
    specs: data.specs ?? {},
    accessories: data.accessories ?? [],
  };
  return stripUndefined(base);
}

export async function createProduct(data: ProductInput): Promise<string> {
  const sanitized = sanitizeProductData(data);
  const docRef = await addDoc(collection(db, "produtos"), sanitized);
  return docRef.id;
}

export async function updateProduct(id: string, data: Partial<ProductInput>): Promise<void> {
  const { id: _id, ...rest } = data as ProductInput & { id?: string };
  await updateDoc(doc(db, "produtos", id), rest);
}
