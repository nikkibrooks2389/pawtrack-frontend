import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import AppDataGrid from "../components/AppDataGrid";
import { breakpoint } from "../styles/themeHelpers";
import StatCard from "../components/dashboard/StatCard";
import DashboardActions from "../components/dashboard/DashboardActions";
import CardList from "../components/CardList";
import BookingCard from "../components/bookings/BookingCard";
import { getPets } from "../features/pets/api";
import { getBookings } from "../features/bookings/api";
import {
  getBookingsTodayCount,
  getUpcomingBookings,
} from "../features/dashboard/utils";
import { formatDate, formatTime } from "../utils/dateUtils";

const StatsGrid = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media ${breakpoint("tablet")} {
    flex-direction: column;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 16px;
`;

const TableNote = styled.p`
  text-align: center;
  margin-top: 0;
`;

const DesktopOnly = styled.div`
  display: block;

  @media ${breakpoint("mobile")} {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;

  @media ${breakpoint("mobile")} {
    display: block;
  }
`;

export default function DashboardPage() {
  const navigate = useNavigate();

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

  const bookingsToday = getBookingsTodayCount(bookings);
  const totalBookings = bookings.length;
  const upcomingBookings = getUpcomingBookings(bookings);

  const bookingRows = upcomingBookings.map((booking) => ({
    id: booking.id,
    pet: booking.pet?.name || "—",
    service: booking.service?.name || "—",
    date: formatDate(booking.appointmentDate),
    time: formatTime(booking.appointmentDate),
    status: booking.status,
  }));

  const bookingColumns = [
    { field: "pet", headerName: "Pet", flex: 0.9 },
    { field: "service", headerName: "Service", flex: 1.4 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 0.8 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  if (isLoading) {
    return <PageWrapper title="Dashboard">Loading...</PageWrapper>;
  }

  if (error) {
    return <PageWrapper title="Dashboard">{error}</PageWrapper>;
  }

  return (
    <PageWrapper title="Dashboard">
      <PageSection>
        <StatsGrid>
          <StatCard title="Bookings Today" value={bookingsToday} />
          <StatCard title="Total Bookings" value={totalBookings} />
          <StatCard title="Total Pets" value={petCount} />
        </StatsGrid>
      </PageSection>

      <PageSection>
        <DashboardActions
          onAddPet={() =>
            navigate("/pets/new", { state: { from: "/" } })
          }
          onAddService={() =>
            navigate("/services/new", { state: { from: "/" } })
          }
          onAddBooking={() =>
            navigate("/bookings/new", { state: { from: "/" } })
          }
        />
      </PageSection>

      <PageSection>
        <SectionTitle>Upcoming Bookings</SectionTitle>
        <TableNote>*Selecting a row opens the booking details page*</TableNote>

        <DesktopOnly>
          <AppDataGrid
            rows={bookingRows}
            columns={bookingColumns}
            onRowClick={(params) =>
              navigate(`/bookings/${params.row.id}`, {
                state: { from: "/" },
              })
            }
            height={400}
            pageSize={5}
          />
        </DesktopOnly>

        <MobileOnly>
          <CardList>
            {upcomingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onView={(id) =>
                  navigate(`/bookings/${id}`, {
                    state: { from: "/" },
                  })
                }
              />
            ))}
          </CardList>
        </MobileOnly>
      </PageSection>
    </PageWrapper>
  );
}