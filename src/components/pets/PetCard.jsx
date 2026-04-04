import styled from "styled-components";
import { Button } from "@mui/material";
import Card from "../Card";

const Title = styled.h3`
  margin: 0 0 8px 0;
  text-align: center;
`;

const Text = styled.p`
  margin: 4px 0;
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`;

export default function PetCard({ pet, onView }) {
  return (
    <Card>
      <Title>{pet.name}</Title>

      <Text>Type: {pet.type}</Text>
      <Text>Age: {pet.age}</Text>
      <Text>Owner: {pet.ownerName || "N/A"}</Text>

      <Actions>
        <Button variant="outlined" onClick={() => onView(pet.id)}>
          View
        </Button>
      </Actions>
    </Card>
  );
}