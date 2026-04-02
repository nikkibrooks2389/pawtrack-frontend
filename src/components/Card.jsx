import styled from "styled-components";
import { color } from "../styles/themeHelpers";

const Wrapper = styled.div`
  background-color: ${color("background")};
  border: 1px solid ${color("border")};
  border-radius: 8px;
  padding: 16px;
`;

export default function Card({ children }) {
  return <Wrapper>{children}</Wrapper>;
}