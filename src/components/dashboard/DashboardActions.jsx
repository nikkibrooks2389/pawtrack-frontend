import styled from "styled-components";
import StyledButton from "../StyledButton";

const ActionsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const DashboardActions = ({ onAddPet, onAddService, onAddBooking }) =>  {
  return (
    <ActionsRow>
      <StyledButton onClick={onAddPet}>+ Add Pet</StyledButton>
      <StyledButton onClick={onAddService}>+ Add Service</StyledButton>
      <StyledButton onClick={onAddBooking}>+ Create Booking</StyledButton>
    </ActionsRow>
  );
}

export default DashboardActions;