import styled from "styled-components";
import { color, breakpoint } from "../styles/themeHelpers";
import TopNavbar from "../components/TopNavBar";
const LayoutWrapper = styled.div`
  min-height: 100vh;
  background-color: ${color("background")};
`;

const PageContent = styled.main`
  width: 100%;
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
      <TopNavbar />
      <PageContent>{children}</PageContent>
    </LayoutWrapper>
  );
}