import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color } from "../styles/themeHelpers";

const Wrapper = styled.div`
  margin-bottom: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-bottom: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${color("text")};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${color("textLight")};
`;

export default function PageIntro({
  backPath,
  subtitle,
  backLabel = "Back",
}) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {backPath && (
        <BackButton type="button" onClick={() => navigate(backPath)}>
          ← {backLabel}
        </BackButton>
      )}

      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
}