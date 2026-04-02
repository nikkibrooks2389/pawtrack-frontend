import styled from "styled-components";
import { color } from "../styles/themeHelpers";

const Section = styled.section`
  background-color: ${color("white")};
  border: 1px solid ${color("border")};
  border-radius: 12px;
  padding: 24px;
`;

export default function PageSection({ children }) {
  return <Section>{children}</Section>;
}