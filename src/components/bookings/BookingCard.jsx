import styled from "styled-components";
import { Button } from "@mui/material";
import Card from "../Card";
import { formatDate, formatTime } from "../../utils/dateUtils";

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

export default function BookingCard({ booking, onView }) {
  return (
    <Card>
      <Title>{booking.service?.name || "Booking"}</Title>

      <Text>Pet: {booking.pet?.name || "N/A"}</Text>
      <Text>Date: {formatDate(booking.appointmentDate)}</Text>
      <Text>Time: {formatTime(booking.appointmentDate)}</Text>
      <Text>Status: {booking.status}</Text>

      <Actions>
        <Button variant="outlined" onClick={() => onView(booking.id)}>
          View
        </Button>
      </Actions>
    </Card>
  );
}