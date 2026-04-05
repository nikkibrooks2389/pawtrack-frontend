import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import { getBookingById, deleteBooking } from "../features/bookings/api";
import { breakpoint } from "../styles/themeHelpers";
import { formatDate, formatTime } from "../utils/dateUtils";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;

  @media ${breakpoint("mobile")} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BookingTitle = styled.h2`
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media ${breakpoint("tablet")} {
    grid-template-columns: 1fr;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BlockTitle = styled.h3`
  margin-bottom: 8px;
`;

const Text = styled.p`
  margin: 0;
`;

const NotesBlock = styled.div`
  margin-bottom: 24px;
`;

export default function BookingDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const backPath = location.state?.from || "/bookings";

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getBookingById(id);
        setBooking(res.data);
      } catch (err) {
        console.error("Error loading booking:", err);
        setError("Could not load booking.");
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await deleteBooking(id);
      navigate("/bookings");
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Could not delete booking.");
    }
  };

  if (loading) {
    return <PageWrapper title="Booking Details">Loading...</PageWrapper>;
  }

  if (error) {
    return <PageWrapper title="Booking Details">{error}</PageWrapper>;
  }

  if (!booking) {
    return <PageWrapper title="Booking Details">Not found</PageWrapper>;
  }

  return (
    <PageWrapper title="Booking Details">
      <PageSection>
        <PageIntro
          backPath={backPath}
          subtitle="View this booking’s information."
        />

        <Header>
          <BookingTitle>{booking.service?.name || "Booking"}</BookingTitle>

          <Actions>
            <Button
              variant="outlined"
              onClick={() =>
                navigate(`/bookings/${id}/edit`, {
                  state: { from: `/bookings/${id}` },
                })
              }
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Actions>
        </Header>

        <DetailsGrid>
          <InfoBlock>
            <BlockTitle>Booking Information</BlockTitle>
            <Text>Pet: {booking.pet?.name || "—"}</Text>
            <Text>Service: {booking.service?.name || "—"}</Text>
            <Text>Date: {formatDate(booking.appointmentDate)}</Text>
            <Text>Time: {formatTime(booking.appointmentDate)}</Text>
            <Text>Status: {booking.status}</Text>
          </InfoBlock>

          <InfoBlock>
            <BlockTitle>Related Details</BlockTitle>
            <Text>Pet Type: {booking.pet?.type || "—"}</Text>
            <Text>Service Type: {booking.service?.serviceType || "—"}</Text>
            <Text>Price: {booking.service?.price != null ? `$${booking.service.price}` : "—"}</Text>
          </InfoBlock>
        </DetailsGrid>

        <NotesBlock>
          <BlockTitle>Notes</BlockTitle>
          <Text>{booking.notes || "—"}</Text>
        </NotesBlock>
      </PageSection>
    </PageWrapper>
  );
}