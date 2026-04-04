import styled from "styled-components";
import { color } from "../styles/themeHelpers";

const Wrapper = styled.div`
   border: 1px solid ${color("border")};
  border-radius: 12px;
  padding: 16px;
  background-color: ${color("white")};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export default function Card({ children }) {
  return <Wrapper>{children}</Wrapper>;
}