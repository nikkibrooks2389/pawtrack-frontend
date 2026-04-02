import styled from "styled-components";
import { color } from "../styles/themeHelpers";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  color: ${color("text")};
  font-size: 1.75rem;
`;

export default function PageWrapper({ title, children }) {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
      </Header>

      {children}
    </Wrapper>
  );
}