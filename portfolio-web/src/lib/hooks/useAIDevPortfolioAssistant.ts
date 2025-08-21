// src/lib/hooks/useAIDevPortfolioAssistant.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import AIDevPortfolioAssistantService, {
  ChatResponse,
  HealthResponse,
} from "@/services/AIDevPorfolioAssistantService";

export const QUERY_KEYS = {
  health: ["portfolio-assistant", "health"] as const,
};

export function useAssistantHealth(enabled = true) {
  return useQuery<HealthResponse>({
    queryKey: QUERY_KEYS.health,
    queryFn: () => AIDevPortfolioAssistantService.getMessages(),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAskAssistant() {
  return useMutation<
    ChatResponse,
    Error,
    { userId?: string | number; message: string } // ← opcional + union
  >({
    mutationFn: ({ userId, message }) =>
      AIDevPortfolioAssistantService.sendMessage(message, userId), // ← message primero
  });
}
