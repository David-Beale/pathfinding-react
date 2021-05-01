import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TrafficIcon from "@material-ui/icons/Traffic";

import { toggleTrafficLights } from "../../../../redux/toggles";

import {
  StyledIconButton,
  ToggleButtonContainer,
  ToggleButtonText,
} from "../ToggleButtonStyle";
import { RedLight, GreenLight, YellowLight } from "./ToggleTrafficLightsStyle";

export default function ToggleTrafficLights() {
  const dispatch = useDispatch();
  const enabled = useSelector(({ toggles }) => toggles.trafficLights);

  const onClick = () => {
    dispatch(toggleTrafficLights());
  };
  return (
    <ToggleButtonContainer>
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
      <ToggleButtonText>Toggle traffic lights</ToggleButtonText>
    </ToggleButtonContainer>
  );
}
