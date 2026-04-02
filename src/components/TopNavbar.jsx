import styled from "styled-components";
import { color } from "../styles/themeHelpers";
import DesktopNavbar from "./DesktopNavBar";
import MobileNavbar from "./MobileNavBar";

const NavWrapper = styled.header`
  width: 100%;
  background-color: ${color("white")};
  border-bottom: 1px solid ${color("border")};
`;

const NavInner = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Brand = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  color: ${color("text")};
`;

export default function TopNavbar() {
  return (
    <NavWrapper>
      <NavInner>
        <Brand>PawTrack</Brand>
        <DesktopNavbar />
        <MobileNavbar />
      </NavInner>
    </NavWrapper>
  );
}