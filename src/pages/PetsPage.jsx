import { useEffect, useState } from "react";
import { getPets } from "../services/api";
import axios from "axios";
import PetCard from "../components/PetCard";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        console.log("Fetching pets...");
        const response = await getPets();  
        setPets(response.data);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to load pets");
      }
    };

    fetchPets();
  }, []);

  return (
    <div>
      <h1>Pets Page</h1>

      {error && <p>{error}</p>}

      {pets.length === 0 ? (
        <p>No pets found.</p>
      ) : (
        pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
        ))
      )}
    </div>
  );
}