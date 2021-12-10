import { configureStore, getDefaultMiddleware, } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import weatherReducer from "./features/weather/weatherSlice";
import pinnedReducer from "./features/pinned/pinnedSlice";

const reducers = combineReducers({
  weather: weatherReducer,
  pinned: pinnedReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});
