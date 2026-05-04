import { pb } from "@/lib/pocketbase";

export interface PageSection {
  id: string;
  collectionId: string;
  collectionName: string;
  slug: string;
  page: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  image_alt: string;
  layout: string;
  is_active: boolean;
  sort: number;
}

export async function getPageSections(page: string): Promise<PageSection[]> {
  const records = await pb.collection("page_sections").getFullList<PageSection>({
    filter: `page = "${page}" && is_active = true`,
    sort: "sort",
  });
  return records;
}
