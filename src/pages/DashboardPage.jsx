import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import { getPets, getBookings } from "../services/api";
import { color, breakpoint } from "../styles/themeHelpers";
import StyledButton from "../components/StyledButton";
import AppDataGrid from "../components/AppDataGrid";

const StatCard = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: ${color("background")};
  border: 1px solid ${color("border")};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatTitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${color("textLight")};
`;

const StatNumber = styled.h2`
  margin: 12px 0 0 0;
  font-size: 2rem;
  color: ${color("text")};
`;

const StatsGrid = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media ${breakpoint("tablet")} {
    flex-direction: column;
  }
`;

const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 16px;
`;

const TableNote = styled.p`
  text-align: center;
  margin-top: 0;
  color: ${color("textLight")};
`;

const DashboardPage = () => {
  const navigate = useNavigate();
  const [petCount, setPetCount] = useState(0);
  const [bookings, setBookings] = useState([]);

  const bookingsToday = bookings.filter((booking) => {
    const today = new Date();
    const date = new Date(booking.appointmentDate);

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }).length;

  const totalBookings = bookings.length;

  const upcomingBookings = bookings
    .filter((booking) => new Date(booking.appointmentDate) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime()
    )
    .slice(0, 5);

  const bookingRows = upcomingBookings.map((booking) => ({
    id: booking.id,
    pet: booking.pet?.name || "N/A",
    service: booking.service?.name || "N/A",
    date: new Date(booking.appointmentDate).toLocaleDateString(),
    time: new Date(booking.appointmentDate).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    }),
    status: booking.status,
  }));

  const bookingColumns = [
  { field: "pet", headerName: "Pet", flex: 0.9 },
  { field: "service", headerName: "Service", flex: 1.4 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 0.8 },
  { field: "status", headerName: "Status", flex: 1 },
];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsRes, bookingsRes] = await Promise.all([
          getPets(),
          getBookings(),
        ]);

        setPetCount(petsRes.data.length);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <PageWrapper title="Dashboard">
      <PageSection>
        <StatsGrid>
          <StatCard>
            <StatTitle>Bookings Today</StatTitle>
            <StatNumber>{bookingsToday}</StatNumber>
          </StatCard>

          <StatCard>
            <StatTitle>Total Bookings</StatTitle>
            <StatNumber>{totalBookings}</StatNumber>
          </StatCard>

          <StatCard>
            <StatTitle>Total Pets</StatTitle>
            <StatNumber>{petCount}</StatNumber>
          </StatCard>
        </StatsGrid>
      </PageSection>

      <PageSection>
        <ActionsRow>
          <StyledButton>+ Add Pet</StyledButton>
          <StyledButton>+ Add Service</StyledButton>
          <StyledButton>+ Create Booking</StyledButton>
        </ActionsRow>
      </PageSection>

      <PageSection>
        <SectionTitle>Upcoming Bookings</SectionTitle>
        <TableNote>*Selecting a row opens the booking details page*</TableNote>

        <AppDataGrid
          rows={bookingRows}
          columns={bookingColumns}
          onRowClick={(params) => {
            navigate(`/bookings/${params.row.id}`);
          }}
        />
      </PageSection>
    </PageWrapper>
  );
};

export default DashboardPage;