import apiClient from "../../lib/axios";

export const getServices = () => apiClient.get("/services");