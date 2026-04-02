import styled from "styled-components";
import { color } from "../styles/themeHelpers";
import Card from "./Card";
import StyledButton from "./StyledButton";

const Row = styled.p`
  margin: 0 0 8px 0;
  color: ${color("text")};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Actions = styled.div`
  margin-top: 12px;
`;

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function BookingCard({ booking, onView }) {
  return (
    <Card>
      <Row><strong>Pet:</strong> {booking.pet?.name || "N/A"}</Row>
      <Row><strong>Service:</strong> {booking.service?.name || "N/A"}</Row>
      <Row><strong>Date:</strong> {formatDate(booking.appointmentDate)}</Row>
      <Row><strong>Time:</strong> {formatTime(booking.appointmentDate)}</Row>
      <Row><strong>Status:</strong> {booking.status}</Row>

      <Actions>
        <StyledButton onClick={() => onView(booking.id)}>
          View Booking
        </StyledButton>
      </Actions>
    </Card>
  );
}