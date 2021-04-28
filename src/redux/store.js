import { configureStore } from "@reduxjs/toolkit";

import roadWorks from "./roadWorks";

export default configureStore({
  reducer: {
    roadWorks,
  },
});
