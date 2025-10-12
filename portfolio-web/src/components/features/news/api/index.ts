import type { FeedItem } from "@/types/News&BlogsTypes";
import { fetchDevtoArticles } from "./devto.client";

// Una sola tag
export async function fetchDevtoByTag(
  tag: string,
  perPage = 12,
  page = 1
): Promise<FeedItem[]> {
  const articles = await fetchDevtoArticles({ tag, per_page: perPage, page });
  return articles.map((item) => ({
    ...item,
    categories: [],
  }));
}

// Varias tags (mezcla + dedup por id + orden por fecha desc)
export async function fetchDevtoByTags(
  tags: string[],
  perPerTag = 6
): Promise<FeedItem[]> {
  const results = await Promise.all(
    tags.map((t) => fetchDevtoArticles({ tag: t, per_page: perPerTag }))
  );
  const merged = results.flat();

  const seen = new Set<string>();
  const dedup = merged.filter((i) =>
    seen.has(i.id) ? false : (seen.add(i.id), true)
  );

  return dedup
    .sort((a, b) => {
      const A = a.publishedAt?.getTime() ?? 0;
      const B = b.publishedAt?.getTime() ?? 0;
      return B - A;
    })
    .map((item) => ({
      ...item,
      categories: [],
    }));
}
