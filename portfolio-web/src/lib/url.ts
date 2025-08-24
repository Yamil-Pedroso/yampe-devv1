import apiClient from "@/api/axiosConfig";
const RAW = (apiClient.defaults.baseURL ?? "").replace(/\/$/, "");
const API_ORIGIN = RAW.replace(/\/api$/, "");

export const toAbs = (u?: string) =>
  !u
    ? ""
    : /^https?:\/\//i.test(u)
      ? u
      : `${API_ORIGIN}${u.startsWith("/") ? u : `/${u}`}`;
