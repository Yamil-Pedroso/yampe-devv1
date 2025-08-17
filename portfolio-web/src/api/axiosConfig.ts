import axios from "axios";
const baseURL = "http://localhost:3010/api";

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

export default apiClient;
