import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  enabled: true,
};
const trafficLights = createSlice({
  name: "trafficLights",
  initialState,
  reducers: {
    toggleTrafficLights(state) {
      state.enabled = !state.enabled;
    },
  },
});

export const { toggleTrafficLights } = trafficLights.actions;

export default trafficLights.reducer;
