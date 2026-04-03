import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7149/api",
});


// PETS

export const getPets = () => API.get("/pets");
export const getPetById = (id) => API.get(`/pets/${id}`);
export const createPet = (data) => API.post("/pets", data);
export const updatePet = (id, data) => API.put(`/pets/${id}`, data);
export const deletePet = (id) => API.delete(`/pets/${id}`);
export const searchPets = (name) => API.get(`/pets/search?name=${name}`);
export const getPetReport = () => API.get("/pets/report");

// BOOKINGS

export const getBookings = () => API.get("/bookings");
export const getBookingById = (id) => API.get(`/bookings/${id}`);
export const createBooking = (data) => API.post("/bookings", data);
export const updateBooking = (id, data) => API.put(`/bookings/${id}`, data);
export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);


// SERVICES

export const getServices = () => API.get("/services");
export const getServiceById = (id) => API.get(`/services/${id}`);
export const deleteService = (id) =>API.delete(`/services/${id}`);

// different service types
export const createDogWalkingService = (data) => API.post("/services/petwalking", data);

export const createPetSittingService = (data) =>API.post("/services/petsitting", data);

export const createTrainingService = (data) => API.post("/services/pettraining", data);