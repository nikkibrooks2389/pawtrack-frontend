import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7149/api",
});

export default apiClient;