import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PetsPage from "./pages/PetsPage";

function DashboardPage() {
  return <h1>Dashboard</h1>;
}

function ServicesPage() {
  return <h1>Services</h1>;
}

function BookingsPage() {
  return <h1>Bookings</h1>;
}

function ReportsPage() {
  return <h1>Reports</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;