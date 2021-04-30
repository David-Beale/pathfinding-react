import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";

import { toggleCameraLock } from "../../../../redux/toggles";

import { StyledCameraIcon } from "./ToggleCameraLockStyle";

export default function ToggleCameraLock() {
  const dispatch = useDispatch();
  const enabled = useSelector(({ toggles }) => toggles.cameraLock);

  const onClick = () => {
    dispatch(toggleCameraLock());
  };
  return (
    <>
      <Tooltip title="Toggle camera lock">
        <IconButton onClick={onClick}>
          <StyledCameraIcon enabled={enabled} fontSize="large" />
        </IconButton>
      </Tooltip>
    </>
  );
}
