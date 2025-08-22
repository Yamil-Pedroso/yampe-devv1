import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

export default apiClient;
