import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { toggleCameraLock } from "../../../../redux/toggles";
import { StyledIconButton } from "../ToggleButtonStyle";

export default function ToggleCameraLock() {
  const dispatch = useDispatch();
  const enabled = useSelector(({ toggles }) => toggles.cameraLock);

  const onClick = () => {
    dispatch(toggleCameraLock());
  };
  return (
    <>
      <Tooltip title="Toggle camera lock">
        <StyledIconButton enabled={enabled ? 1 : 0} onClick={onClick}>
          <PhotoCameraIcon fontSize="large" />
        </StyledIconButton>
      </Tooltip>
    </>
  );
}
