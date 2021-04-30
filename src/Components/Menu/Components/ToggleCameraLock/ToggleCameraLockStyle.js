import styled from "styled-components";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

export const StyledCameraIcon = styled(PhotoCameraIcon)`
  color: black;
  box-shadow: ${(props) =>
    props.enabled ? "0px 0px 10px 5px cornflowerblue" : ""};
  border-radius: 50%;
  &:hover {
    box-shadow: 0px 0px 10px 10px cornflowerblue;
  }
  z-index: 2;
`;
