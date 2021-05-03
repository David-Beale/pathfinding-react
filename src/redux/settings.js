import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  trafficLights: true,
  cameraLock: false,
  collisionBoxes: false,
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
    toggleCollisionBoxes(state) {
      state.collisionBoxes = !state.collisionBoxes;
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
  toggleCollisionBoxes,
} = settings.actions;

export default settings.reducer;
