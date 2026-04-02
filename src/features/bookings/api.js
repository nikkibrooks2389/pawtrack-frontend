import apiClient from "../../lib/axios";

export const getBookings = () => apiClient.get("/bookings");