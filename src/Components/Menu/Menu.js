import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";

import MenuButton from "./Components/MenuButton/MenuButton";

import { Container } from "./MenuStyle";
import ToggleTrafficLights from "./Components/ToggleTrafficLights/ToggleTrafficLights";
import ToggleCameraLock from "./Components/ToggleCameraLock/ToggleCameraLock";
import ComputerNumber from "./Components/ComputerNumber/ComputerNumber";
import ToggleCollisionBoxes from "./Components/ToggleCollisionBoxes/ToggleCollisionBoxes";
import AddRoadWorks from "./Components/AddRoadWorks/AddRoadWorks";
import RemoveRoadWorks from "./Components/RemoveRoadWorks/RemoveRoadWorks";
import ToggleTrafficConditions from "./Components/ToggleTrafficConditions/ToggleTrafficConditions";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <MenuButton setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Drawer variant="persistent" anchor="left" open={menuOpen}>
        <Container>
          <ToggleTrafficLights />
          <ToggleCameraLock />
          <ToggleCollisionBoxes />
          <ToggleTrafficConditions />
          <AddRoadWorks />
          <RemoveRoadWorks />
          <ComputerNumber />
        </Container>
      </Drawer>
    </>
  );
}
