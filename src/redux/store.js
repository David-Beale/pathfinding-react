import { configureStore } from "@reduxjs/toolkit";

import roadWorks from "./roadWorks";
import settings from "./settings";

export default configureStore({
  reducer: {
    roadWorks,
    settings,
  },
});
