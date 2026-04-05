import styled from "styled-components";
import { breakpoint } from "../styles/themeHelpers";

export const DesktopOnly = styled.div`
  display: block;

  @media ${breakpoint("mobile")} {
    display: none;
  }
`;

export const MobileOnly = styled.div`
  display: none;

  @media ${breakpoint("mobile")} {
    display: block;
  }
`;