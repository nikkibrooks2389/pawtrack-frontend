import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7149/api",
});

export const getPets = () => API.get("/pets");
export const getBookings = () => API.get("/bookings");
export const getServices = () => API.get("/services");
export const getPetReport = () => API.get("/pets/report");
export const searchPets = (name) => API.get(`/pets/search?name=${name}`);