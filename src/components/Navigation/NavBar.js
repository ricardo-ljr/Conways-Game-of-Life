import React from "react";
import { NavDiv, NavButton } from "./NavBarStyles";

const NavBar = () => {
  return (
    <NavDiv>
      <NavButton>Grid</NavButton>
      <NavButton>About</NavButton>
    </NavDiv>
  );
};

export default NavBar;
