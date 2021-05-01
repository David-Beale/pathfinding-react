import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  trafficLights: true,
  cameraLock: false,
  computerNumber: 15,
};
const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTrafficLights(state) {
      state.trafficLights = !state.trafficLights;
    },
    toggleCameraLock(state) {
      state.cameraLock = !state.cameraLock;
    },
    changeComputerNumber(state, action) {
      state.computerNumber = action.payload;
    },
  },
});

export const {
  toggleTrafficLights,
  toggleCameraLock,
  changeComputerNumber,
} = settings.actions;

export default settings.reducer;
