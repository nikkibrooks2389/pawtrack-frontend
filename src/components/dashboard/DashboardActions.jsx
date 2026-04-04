import styled from "styled-components";
import { Button } from "@mui/material";

const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const DashboardActions = ({ onAddPet, onAddService, onAddBooking }) => {
  return (
    <ActionsRow>
      <Button variant="contained" onClick={onAddPet}>
        + Add Pet
      </Button>

      <Button variant="contained" onClick={onAddService}>
        + Add Service
      </Button>

      <Button variant="contained" onClick={onAddBooking}>
        + Create Booking
      </Button>
    </ActionsRow>
  );
};

export default DashboardActions;