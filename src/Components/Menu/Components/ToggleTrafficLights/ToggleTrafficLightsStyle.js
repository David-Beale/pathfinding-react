import styled from "styled-components";
import TrafficIcon from "@material-ui/icons/Traffic";

export const StyledTrafficIcon = styled(TrafficIcon)`
  color: black;
  box-shadow: ${(props) =>
    props.enabled ? "0px 0px 10px 5px cornflowerblue" : ""};
  border-radius: 50%;
  &:hover {
    box-shadow: 0px 0px 10px 10px cornflowerblue;
  }
  z-index: 2;
`;

const Light = styled.div`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
`;
export const RedLight = styled(Light)`
  background-color: red;
  top: 19px;
`;
export const YellowLight = styled(Light)`
  background-color: yellow;
`;
export const GreenLight = styled(Light)`
  background-color: green;
  top: 34px;
`;
