import apiClient from "../api/axiosConfig";
import type { CommonContent } from "@/types/Types";

export const getAboutMe = async (): Promise<CommonContent> => {
  const { data } = await apiClient.get<CommonContent>("/about");
  return data;
};
