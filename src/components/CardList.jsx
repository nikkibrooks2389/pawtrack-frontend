import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default function CardList({ children }) {
  return <List>{children}</List>;
}