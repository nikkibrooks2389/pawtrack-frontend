import apiClient from "../../lib/axios";

export const getPets = () => apiClient.get("/pets");
export const getPetById = (id) => apiClient.get(`/pets/${id}`);
export const createPet = (data) => apiClient.post("/pets", data);
export const updatePet = (id, data) => apiClient.put(`/pets/${id}`, data);
export const deletePet = (id) => apiClient.delete(`/pets/${id}`);
export const searchPets = (name) => apiClient.get(`/pets/search?name=${name}`);
export const getPetReport = () => apiClient.get("/pets/report");