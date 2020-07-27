import React from "react";
import { NavButton } from "./NavBarStyles";

const NavBar = () => {
  return (
    <div className="navigation-bar">
      <NavButton>Grid</NavButton>
      <NavButton>About</NavButton>
    </div>
  );
};

export default NavBar;
