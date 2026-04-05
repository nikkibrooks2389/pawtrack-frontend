import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { color, breakpoint } from "../styles/themeHelpers";

const MobileWrapper = styled.div`
  display: none;

  @media ${breakpoint("tablet")} {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: ${color("text")};
`;

const MobileMenu = styled.div`
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 12px;
  padding-top: 12px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: ${color("text")};
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 500;
  text-align: right;

  &:hover {
    background-color: ${color("background")};
  }

  &.active {
    background-color: ${color("border")};
  }
`;

export default function MobileNavBar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <MobileWrapper>
      <MenuButton type="button" onClick={() => setOpen((prev) => !prev)}>
        ☰
      </MenuButton>

      <MobileMenu $open={open}>
        <StyledLink to="/" onClick={closeMenu}>
          Dashboard
        </StyledLink>
        <StyledLink to="/pets" onClick={closeMenu}>
          Pets
        </StyledLink>
        <StyledLink to="/services" onClick={closeMenu}>
          Services
        </StyledLink>
        <StyledLink to="/bookings" onClick={closeMenu}>
          Bookings
        </StyledLink>
        <StyledLink to="/reports" onClick={closeMenu}>
          Reports
        </StyledLink>
      </MobileMenu>
    </MobileWrapper>
  );
}