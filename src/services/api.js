import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7149/api",
});

export const getPets = () => API.get("/pets");