import { createMuiTheme } from "@material-ui/core/styles";

export const makeMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiDrawer: {
        paper: {
          background:
            "linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1))",
          backdropFilter: "blur(1rem)",
          backgroundColor: "transparent",
        },
        paperAnchorDockedLeft: {
          borderRight: "none",
        },
      },
    },
  });
