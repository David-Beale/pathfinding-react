import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";

import { toggleTrafficLights } from "../../../../redux/trafficLights";

import {
  StyledTrafficIcon,
  RedLight,
  GreenLight,
  YellowLight,
} from "./ToggleTrafficLightsStyle";

export default function ToggleTrafficLights() {
  const dispatch = useDispatch();
  const enabled = useSelector(({ trafficLights }) => trafficLights.enabled);

  const onClick = () => {
    dispatch(toggleTrafficLights());
  };
  return (
    <>
      <Tooltip title="Toggle traffic lights">
        <IconButton onClick={onClick}>
          <StyledTrafficIcon enabled={enabled} fontSize="large" />
          {enabled && (
            <>
              <RedLight />
              <YellowLight />
              <GreenLight />
            </>
          )}
        </IconButton>
      </Tooltip>
    </>
  );
}