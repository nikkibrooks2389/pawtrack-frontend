import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";
import PageSection from "../components/PageSection";
import PageIntro from "../components/PageIntro";
import PetCard from "../components/pets/PetCard";
import CardList from "../components/CardList";
import AppDataGrid from "../components/AppDataGrid";
import { getPets } from "../features/pets/api";
import { breakpoint } from "../styles/themeHelpers";
import { Button} from "@mui/material";

const Actions = styled.div`
  margin: 20px 0;
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



export default function PetsPage() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getPets();
        setPets(res.data);
      } catch (err) {
        console.error("Error loading pets:", err);
        setError("Could not load pets.");
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  const rows = pets.map((pet) => ({
    id: pet.id,
    name: pet.name,
    type: pet.type,
    age: pet.age,
    ownerName: pet.ownerName || "—",
    phone: pet.phone || "—",
  }));

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "ownerName", headerName: "Owner", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
  ];

  return (
    <PageWrapper title="Pets">
      <PageSection>
        <PageIntro subtitle="View and manage all pets" />

        <Actions>
          <Button variant="contained"
            onClick={() =>
              navigate("/pets/new", {
                state: { from: "/pets" },
              })
            }
          >
            + Add Pet
          </Button>
        </Actions>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && pets.length === 0 && <p>No pets found.</p>}

        {!loading && !error && pets.length > 0 && (
          <>
            <DesktopOnly>
              <AppDataGrid
                rows={rows}
                columns={columns}
                onRowClick={(params) =>
                  navigate(`/pets/${params.row.id}`, {
                    state: { from: "/pets" },
                  })
                }
                height={400}
                pageSize={5}
              />
            </DesktopOnly>

            <MobileOnly>
            <MobileOnly>
  <CardList>
    {pets.map((pet) => (
      <PetCard
        key={pet.id}
        pet={pet}
        onView={(id) =>
          navigate(`/pets/${id}`, {
            state: { from: "/pets" },
          })
        }
      />
    ))}
  </CardList>
</MobileOnly>
            </MobileOnly>
          </>
        )}
      </PageSection>
    </PageWrapper>
  );
}