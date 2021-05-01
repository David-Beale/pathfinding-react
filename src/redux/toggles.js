import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  trafficLights: true,
  cameraLock: true,
};
const toggles = createSlice({
  name: "toggles",
  initialState,
  reducers: {
    toggleTrafficLights(state) {
      state.trafficLights = !state.trafficLights;
    },
    toggleCameraLock(state) {
      state.cameraLock = !state.cameraLock;
    },
  },
});

export const { toggleTrafficLights, toggleCameraLock } = toggles.actions;

export default toggles.reducer;
