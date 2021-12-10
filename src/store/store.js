import { configureStore, } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import weatherReducer from "./features/weather/weatherSlice";
import pinnedReducer from "./features/pinned/pinnedSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, pinnedReducer);

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    pinned: persistedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});
