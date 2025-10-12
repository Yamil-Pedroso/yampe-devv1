import { useQuery } from "@tanstack/react-query";
import type { FeedItem } from "@/types/News&BlogsTypes";
import {
  fetchDevtoByTags,
  fetchDevtoByTag,
} from "@/components/features/news/api";

export function useDevtoByTag(tag: string, perPage = 12, page = 1) {
  return useQuery<FeedItem[]>({
    queryKey: ["devto", { tag, perPage, page }],
    queryFn: () => fetchDevtoByTag(tag, perPage, page),
    staleTime: 2 * 60_000,
    refetchInterval: 5 * 60_000,
    refetchOnWindowFocus: true,
  });
}

export function useDevtoByTags(tags: string[], perPerTag = 6) {
  return useQuery<FeedItem[]>({
    queryKey: ["devto", { v: 2, tags: [...tags].sort(), perPerTag }],
    queryFn: () => fetchDevtoByTags(tags, perPerTag),
    staleTime: 2 * 60_000,
    refetchInterval: 5 * 60_000,
    refetchOnWindowFocus: true,
    enabled: tags.length > 0,
  });
}
