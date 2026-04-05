import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import AppDataGrid from "../components/AppDataGrid";
import { formatDate, formatTime } from "../utils/dateUtils";
import CardList from "../components/CardList";
import BookingCard from "../components/bookings/BookingCard";
import { getPetById, deletePet } from "../features/pets/api";
import { getBookings } from "../features/bookings/api";
import { breakpoint } from "../styles/themeHelpers";
import { DesktopOnly, MobileOnly } from "../components/Responsive";

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

const PetName = styled.h2`
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



const SectionTitle = styled.h2`
  margin: 0;
`;

const TableNote = styled.p`
  margin-top: 0;
`;

export default function PetDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const backPath = location.state?.from || "/pets";

  const [pet, setPet] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const [petRes, bookingsRes] = await Promise.all([
          getPetById(id),
          getBookings(),
        ]);

        setPet(petRes.data);

        const filtered = bookingsRes.data.filter(
          (b) => b.petId === Number(id)
        );

        setBookings(filtered);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this pet?")) return;

    await deletePet(id);
    navigate("/pets");
  };

  const bookingRows = bookings.map((booking) => ({
  id: booking.id,
  service: booking.service?.name || "—",
  date: formatDate(booking.appointmentDate),
  time: formatTime(booking.appointmentDate),
  status: booking.status,
}));

const bookingColumns = [
  { field: "service", headerName: "Service", flex: 1.4 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "time", headerName: "Time", flex: 0.8 },
  { field: "status", headerName: "Status", flex: 1 },
];

  if (loading) return <PageWrapper title="Pet Details">Loading...</PageWrapper>;
  if (error) return <PageWrapper title="Pet Details">{error}</PageWrapper>;
  if (!pet) return <PageWrapper title="Pet Details">Not found</PageWrapper>;

  return (
    <PageWrapper title="Pet Details">
      <PageSection>
        <PageIntro backPath={backPath} subtitle="View this pet’s information." />

        <Header>
          <PetName>{pet.name} ({pet.type})</PetName>

          <Actions>
            <Button
              variant="outlined"
              onClick={() =>
                navigate(`/pets/${id}/edit`, {
                  state: { from: `/pets/${id}` },
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
            <BlockTitle>Pet Information</BlockTitle>
            <Text>Type: {pet.type}</Text>
            <Text>Age: {pet.age}</Text>
          </InfoBlock>

          <InfoBlock>
            <BlockTitle>Owner Information</BlockTitle>
            <Text>Name: {pet.ownerName || "—"}</Text>
            <Text>Phone: {pet.phone || "—"}</Text>
            <Text>Address: {pet.address || "—"}</Text>
          </InfoBlock>
        </DetailsGrid>

        <NotesBlock>
          <BlockTitle>Notes</BlockTitle>
          <Text>{pet.notes || "—"}</Text>
        </NotesBlock>
      </PageSection>

      <PageSection>
        <Header>

            
          <SectionTitle>Bookings</SectionTitle>

          <Button
            variant="contained"
            onClick={() =>
              navigate("/bookings/new", {
                state: { petId: pet.id, from: `/pets/${id}` },
              })
            }
          >
            + Create Booking
          </Button>
        </Header>

      

        {bookings.length === 0 ? (
          <Text>No bookings</Text>
        ) : (

            
          <>
            <DesktopOnly>
                  <TableNote>*Click row to view booking*</TableNote>
                <AppDataGrid
    rows={bookingRows}
    columns={bookingColumns}
    onRowClick={(params) =>
      navigate(`/bookings/${params.row.id}`, {
        state: { from: `/pets/${id}` },
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
            state: { from: `/pets/${id}` },
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