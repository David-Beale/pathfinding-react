import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  setting: false,
};
const roadWorks = createSlice({
  name: "extracts",
  initialState,
  reducers: {
    drawRoadWorks(state) {
      state.setting = "draw";
    },
    removeRoadWorks(state) {
      state.setting = "remove";
    },
    disableRoadWorks(state) {
      state.setting = false;
    },
  },
});

export const {
  drawRoadWorks,
  removeRoadWorks,
  disableRoadWorks,
} = roadWorks.actions;

export default roadWorks.reducer;
