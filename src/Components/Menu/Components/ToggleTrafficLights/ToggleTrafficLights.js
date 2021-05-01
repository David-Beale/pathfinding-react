import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-ui/core";
import TrafficIcon from "@material-ui/icons/Traffic";

import { toggleTrafficLights } from "../../../../redux/toggles";

import { StyledIconButton } from "../ToggleButtonStyle";
import { RedLight, GreenLight, YellowLight } from "./ToggleTrafficLightsStyle";

export default function ToggleTrafficLights() {
  const dispatch = useDispatch();
  const enabled = useSelector(({ toggles }) => toggles.trafficLights);

  const onClick = () => {
    dispatch(toggleTrafficLights());
  };
  return (
    <>
      <Tooltip title="Toggle traffic lights">
        <StyledIconButton enabled={enabled ? 1 : 0} onClick={onClick}>
          <TrafficIcon fontSize="large" />
          {enabled && (
            <>
              <RedLight />
              <YellowLight />
              <GreenLight />
            </>
          )}
        </StyledIconButton>
      </Tooltip>
    </>
  );
}
