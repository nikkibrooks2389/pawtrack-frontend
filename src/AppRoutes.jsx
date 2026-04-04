import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import PetsPage from "./pages/PetsPage";
import PetFormPage from "./pages/PetFormPage";
import PetDetailsPage from "./pages/PetDetailsPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceFormPage from "./pages/ServiceFormPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import BookingsPage from "./pages/BookingsPage";
import BookingFormPage from "./pages/BookingFormPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import ReportsPage from "./pages/ReportsPage";

export default function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/pets" element={<PetsPage />} />
        <Route path="/pets/new" element={<PetFormPage />} />
        <Route path="/pets/:id" element={<PetDetailsPage />} />
        <Route path="/pets/:id/edit" element={<PetFormPage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/new" element={<ServiceFormPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/services/:id/edit" element={<ServiceFormPage />} />

        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/bookings/new" element={<BookingFormPage />} />
        <Route path="/bookings/:id" element={<BookingDetailsPage />} />
        <Route path="/bookings/:id/edit" element={<BookingFormPage />} />

        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </MainLayout>
  );
}