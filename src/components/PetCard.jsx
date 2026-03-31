import styled from "styled-components";
import { color } from "../styles/themeHelpers";

const Card = styled.div`
  background-color: ${color("white")};
  border: 1px solid ${color("border")};
  border-radius: 10px;
  padding: 16px;
`;

const PetName = styled.h3`
  margin: 0 0 8px 0;
  color: ${color("text")};
`;

const PetText = styled.p`
  margin: 0 0 4px 0;
  color: ${color("textLight")};
`;

export default function PetCard({ pet }) {
  return (
    <Card>
      <PetName>{pet.name}</PetName>
      <PetText>Type: {pet.type}</PetText>
      <PetText>Age: {pet.age}</PetText>
      <PetText>Owner: {pet.ownerName}</PetText>
      <PetText>Notes: {pet.notes || "—"}</PetText>
    </Card>
  );
}