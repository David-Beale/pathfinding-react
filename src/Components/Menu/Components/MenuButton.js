import React from "react";
import { Tooltip } from "@material-ui/core";

import { Icon } from "../MenuStyle";

export default function MenuButton({ setMenuOpen, menuOpen }) {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <Tooltip title={menuOpen ? "" : "Open Menu"}>
      <Icon open={menuOpen} onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </Icon>
    </Tooltip>
  );
}
