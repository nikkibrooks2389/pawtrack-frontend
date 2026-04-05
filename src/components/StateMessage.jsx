import styled from "styled-components";
import { color } from "../styles/themeHelpers";

const MessageBox = styled.div`
  padding: 24px;
  border: 1px dashed ${color("border")};
  border-radius: 12px;
  background-color: ${color("white")};
  color: ${color("textLight")};
  text-align: center;
`;

export function LoadingState({ message = "Loading..." }) {
  return <MessageBox>{message}</MessageBox>;
}

export function EmptyState({ message = "No data found." }) {
  return <MessageBox>{message}</MessageBox>;
}

export function ErrorState({ message = "Something went wrong." }) {
  return <MessageBox>{message}</MessageBox>;
}