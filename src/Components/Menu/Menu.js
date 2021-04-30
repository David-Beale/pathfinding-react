import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";

import MenuButton from "./Components/MenuButton";

import { Container } from "./MenuStyle";
import ToggleTrafficLights from "./Components/ToggleTrafficLights/ToggleTrafficLights";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <MenuButton setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Drawer variant="persistent" anchor="left" open={menuOpen}>
        <Container>
          <ToggleTrafficLights />
        </Container>
      </Drawer>
    </>
  );
}