import styled from "styled-components";
import { color } from "../../styles/themeHelpers";

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: ${color("background")};
  border: 1px solid ${color("border")};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${color("textLight")};
`;

const Number = styled.h2`
  margin: 12px 0 0 0;
  font-size: 2rem;
  color: ${color("text")};
`;

export default function StatCard({ title, value }) {
  return (
    <Card>
      <Title>{title}</Title>
      <Number>{value}</Number>
    </Card>
  );
}