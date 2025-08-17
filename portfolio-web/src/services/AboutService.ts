import apiClient from "../api/axiosConfig";
import type { CommonContent } from "@/types/Types";

type AboutApiResponse = {
  status: "success" | "error";
  header: string;
  description: string;
  title?: string;
};

export const getAboutMe = async (): Promise<CommonContent> => {
  const { data } = await apiClient.get<AboutApiResponse>("/about");
  // mapear a tu DTO de frontend
  return {
    header: data.header,
    title: data.title,
    description: data.description,
  };
};
