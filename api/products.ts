import { pb } from "@/lib/pocketbase";

export interface Product {
  id: string;
  collectionId: string;
  collectionName: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string | string[];
  category: string;
  is_active: boolean;
  sort: number;
  notes: string[];
  brew_for: string[];
  formats: string[];
  origin: string;
  roast: string;
  badge: string;
}

export async function getProducts(): Promise<Product[]> {
  const records = await pb.collection("products").getFullList<Product>({
    sort: "sort,title",
    filter: "is_active = true",
  });
  return records;
}
