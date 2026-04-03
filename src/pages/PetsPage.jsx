import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPets } from "../services/api";
import PetCard from "../components/PetCard";
import { color } from "../styles/themeHelpers";


const Header = styled.h1`
  color: ${color("primary")};
  margin-bottom: 16px;
`;

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getPets();
        setPets(response.data);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to load pets.");
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
    
        <Header>Pets</Header>
     

      {error && <span>{error}</span>}

      {pets.length === 0 ? (
        <span>No pets found.</span>
      ) : (
       <div>
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}

{/* <button
  onClick={() =>
    navigate("/pets/new", {
      state: { from: "/pets" }
    })
  }
>
  Add Pet
</button> */}