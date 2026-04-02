import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { color, breakpoint } from "../styles/themeHelpers";

const NavLinks = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;

  @media ${breakpoint("tablet")} {
    display: none;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${color("text")};
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    background-color: ${color("background")};
  }

  &.active {
    background-color: ${color("border")};
  }
`;

export default function DesktopNavbar() {
  return (
    <NavLinks>
      <StyledLink to="/">Dashboard</StyledLink>
      <StyledLink to="/pets">Pets</StyledLink>
      <StyledLink to="/services">Services</StyledLink>
      <StyledLink to="/bookings">Bookings</StyledLink>
      <StyledLink to="/reports">Reports</StyledLink>
    </NavLinks>
  );
}