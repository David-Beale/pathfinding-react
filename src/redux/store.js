import { configureStore } from "@reduxjs/toolkit";

import roadWorks from "./roadWorks";
import toggles from "./toggles";

export default configureStore({
  reducer: {
    roadWorks,
    toggles,
  },
});
