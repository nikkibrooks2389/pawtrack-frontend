import apiClient from "../../lib/axios";

export const getBookings = () => apiClient.get("/bookings");
export const getBookingById = (id) => apiClient.get(`/bookings/${id}`);
export const createBooking = (data) => apiClient.post("/bookings", data);
export const updateBooking = (id, data) => apiClient.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => apiClient.delete(`/bookings/${id}`);