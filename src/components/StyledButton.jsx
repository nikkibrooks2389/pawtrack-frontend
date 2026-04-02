import { color } from "../styles/themeHelpers";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid ${color("border")};
  background-color: ${color("white")};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${color("background")};
  }
`;

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}