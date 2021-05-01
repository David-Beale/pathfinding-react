import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const StyledIconButton = styled(IconButton)`
  margin: 5px 0;
  color: black;
  box-shadow: ${(props) =>
    props.enabled
      ? "inset -4px -4px 8px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(0, 0, 0, 0.2)"
      : "-6px -6px 10px rgba(255, 255, 255, 0.7), 6px 6px 10px rgba(0, 0, 0, 0.3)"};
`;
export const ToggleButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
export const ToggleButtonText = styled.div`
  margin-left: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: darkslategray;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
