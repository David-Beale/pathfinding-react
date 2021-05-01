import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const StyledIconButton = styled(IconButton)`
  color: black;
  box-shadow: ${(props) =>
    props.enabled
      ? "inset -4px -4px 8px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(0, 0, 0, 0.2)"
      : "-6px -6px 10px rgba(255, 255, 255, 0.7), 6px 6px 10px rgba(0, 0, 0, 0.3)"};
  position: absolute;
  left: 10px;
`;
export const ToggleButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  padding: 5px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px -1px slategray;
  height: 70px;
`;
export const ToggleButtonText = styled.div`
  margin-left: 20px;
`;
