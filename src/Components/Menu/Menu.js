import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";

import MenuButton from "./Components/MenuButton/MenuButton";

import { Container } from "./MenuStyle";
import ToggleTrafficLights from "./Components/ToggleTrafficLights/ToggleTrafficLights";
import ToggleCameraLock from "./Components/ToggleCameraLock/ToggleCameraLock";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <MenuButton setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Drawer variant="persistent" anchor="left" open={menuOpen}>
        <Container>
          <ToggleTrafficLights />
          <ToggleCameraLock />
        </Container>
      </Drawer>
    </>
  );
}
