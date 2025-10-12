import { useQuery } from "@tanstack/react-query";
import { fetchDevtoArticleById } from "@/components/features/news/api/devto.client";

export function useDevtoArticle(numericId: number) {
  return useQuery({
    queryKey: ["devto:article", numericId],
    queryFn: () => fetchDevtoArticleById(numericId),
    enabled: Number.isFinite(numericId),
    staleTime: 5 * 60_000,
  });
}
