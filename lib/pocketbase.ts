import PocketBase from "pocketbase";

const PB_URL = process.env.NEXT_PUBLIC_PB_URL || "http://127.0.0.1:8090";

export const pb = new PocketBase(PB_URL);

export function getFileUrl(record: { id: string; collectionId?: string; collectionName?: string }, filename: string): string {
  if (!filename) return "";
  return pb.files.getURL(record, filename);
}
