import apiClient from "../../lib/axios";

export const getPets = () => apiClient.get("/pets");
export const getPetReport = () => apiClient.get("/pets/report");
export const searchPets = (name) =>
  apiClient.get(`/pets/search?name=${encodeURIComponent(name)}`);