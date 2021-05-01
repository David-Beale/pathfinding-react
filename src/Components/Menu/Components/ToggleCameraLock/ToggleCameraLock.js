import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { toggleCameraLock } from "../../../../redux/toggles";
import {
  StyledIconButton,
  ToggleButtonContainer,
  ToggleButtonText,
} from "../ToggleButtonStyle";

export default function ToggleCameraLock() {
  const dispatch = useDispatch();
  const enabled = useSelector(({ toggles }) => toggles.cameraLock);

  const onClick = () => {
    dispatch(toggleCameraLock());
  };
  return (
    <ToggleButtonContainer>
      <StyledIconButton enabled={enabled ? 1 : 0} onClick={onClick}>
        <PhotoCameraIcon fontSize="large" />
      </StyledIconButton>
      <ToggleButtonText>Toggle camera lock</ToggleButtonText>
    </ToggleButtonContainer>
  );
}
