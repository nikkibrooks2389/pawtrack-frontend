import { useEffect, useState } from "react";
import { getPets } from "../pets/api";
import { getBookings } from "../bookings/api";

export function useDashboardData() {
  const [petCount, setPetCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [petsRes, bookingsRes] = await Promise.all([
          getPets(),
          getBookings(),
        ]);

        setPetCount(petsRes.data.length);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  return {
    petCount,
    bookings,
    isLoading,
    error,
  };
}