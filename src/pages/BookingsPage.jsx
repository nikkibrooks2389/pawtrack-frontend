import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import AppDataGrid from "../components/AppDataGrid";
import CardList from "../components/CardList";
import BookingCard from "../components/bookings/BookingCard";
import { getBookings } from "../features/bookings/api";
import { formatDate, formatTime } from "../utils/dateUtils";
import { DesktopOnly, MobileOnly } from "../components/Responsive";

const Actions = styled.div`
  margin: 20px 0;
`;

export default function BookingsPage() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getBookings();
        setBookings(res.data);
      } catch (err) {
        console.error("Error loading bookings:", err);
        setError("Could not load bookings.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const rows = bookings.map((booking) => ({
    id: booking.id,
    pet: booking.pet?.name || "—",
    service: booking.service?.name || "—",
    date: formatDate(booking.appointmentDate),
    time: formatTime(booking.appointmentDate),
    status: booking.status,
  }));

  const columns = [
    { field: "pet", headerName: "Pet", flex: 1 },
    { field: "service", headerName: "Service", flex: 1.4 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 0.8 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <PageWrapper title="Bookings">
      <PageSection>
        <PageIntro subtitle="View and manage all bookings" />

        <Actions>
          <Button
            variant="contained"
            onClick={() =>
              navigate("/bookings/new", {
                state: { from: "/bookings" },
              })
            }
          >
            + Add Booking
          </Button>
        </Actions>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && bookings.length === 0 && (
          <p>No bookings found.</p>
        )}

        {!loading && !error && bookings.length > 0 && (
          <>
            <DesktopOnly>
              <AppDataGrid
                rows={rows}
                columns={columns}
                onRowClick={(params) =>
                  navigate(`/bookings/${params.row.id}`, {
                    state: { from: "/bookings" },
                  })
                }
                height={400}
                pageSize={5}
              />
            </DesktopOnly>

            <MobileOnly>
              <CardList>
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onView={(id) =>
                      navigate(`/bookings/${id}`, {
                        state: { from: "/bookings" },
                      })
                    }
                  />
                ))}
              </CardList>
            </MobileOnly>
          </>
        )}
      </PageSection>
    </PageWrapper>
  );
}