import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weather/weatherSlice";
import pinnedReducer from "./features/pinned/pinnedSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    pinned: pinnedReducer,
  },
});
