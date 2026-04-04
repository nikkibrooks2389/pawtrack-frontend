import apiClient from "../../lib/axios";

export const getServices = () => apiClient.get("/services");
export const getServiceById = (id) => apiClient.get(`/services/${id}`);
export const deleteService = (id) => apiClient.delete(`/services/${id}`);

export const createPetWalkingService = (data) =>
  apiClient.post("/services/petwalking", data);

export const createPetSittingService = (data) =>
  apiClient.post("/services/petsitting", data);

export const createPetTrainingService = (data) =>
  apiClient.post("/services/pettraining", data);

export const updatePetWalkingService = (id, data) =>
  apiClient.put(`/services/petwalking/${id}`, data);

export const updatePetSittingService = (id, data) =>
  apiClient.put(`/services/petsitting/${id}`, data);

export const updatePetTrainingService = (id, data) =>
  apiClient.put(`/services/pettraining/${id}`, data);