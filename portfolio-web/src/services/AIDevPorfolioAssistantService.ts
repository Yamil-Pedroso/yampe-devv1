// src/services/AIDevPortfolioAssistantService.ts
import apiClient from "@/api/axiosConfig";
import { getClientId } from "@/lib/clientId";

export interface ChatResponse {
  reply?: string;
  error?: string;
}
export interface HealthResponse {
  message: string;
}

const AIDevPortfolioAssistantService = {
  getMessages: async (signal?: AbortSignal): Promise<HealthResponse> => {
    const { data } = await apiClient.get<HealthResponse>(
      "/portfolio-assistant",
      { signal }
    );
    return data;
  },

  // 👉 firma recomendada: message primero, userId opcional
  sendMessage: async (
    message: string,
    userId?: string | number,
    signal?: AbortSignal
  ): Promise<ChatResponse> => {
    const text = message?.trim();
    if (!text) throw new Error("Message is required");

    const id = String(userId ?? getClientId()); // ← normaliza aquí a string
    const { data } = await apiClient.post<ChatResponse>(
      "/portfolio-assistant/chat",
      { userId: id, message: text },
      { signal }
    );
    return data;
  },
};

export default AIDevPortfolioAssistantService;
