import { configureStore } from "@reduxjs/toolkit";

import roadWorks from "./roadWorks";
import trafficLights from "./trafficLights";

export default configureStore({
  reducer: {
    roadWorks,
    trafficLights,
  },
});
