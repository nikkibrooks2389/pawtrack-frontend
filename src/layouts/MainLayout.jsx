import styled from "styled-components";
import { color, breakpoint } from "../styles/themeHelpers";
import TopNavBar from "../components/TopNavBar";
const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${color("background")};
`;

const PageContent = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

 @media ${breakpoint("tablet")} {
    padding: 16px;
  }

  @media ${breakpoint("mobile")} {
    padding: 12px;
  }

  
`;

export default function MainLayout({ children }) {
  return (
    <LayoutWrapper>
      <TopNavBar />
      <PageContent>{children}</PageContent>
    </LayoutWrapper>
  );
}