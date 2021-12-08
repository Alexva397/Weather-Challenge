import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentByName, getCurrentByCoords } from "./weatherAPI";

const initialState = {
    current: null,
    forecast: null,
    loading: false
};

export const fetchCurrentByName = createAsyncThunk(
    "weather/currentByName",
    async (cityName) => {
        try {
            const response = await getCurrentByName(cityName);       
            return response;
        } catch (err) {
            console.log(err);
        }
    }
);

export const fetchCurrentByCoords = createAsyncThunk(
    "weather/currentByCoords",
    async (req) => {
        try {
            const response = await getCurrentByCoords(req.lat, req.lon);
            return response;
        } catch (err) {
            console.log(err);
        }
    }
);


const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCurrentByName.pending]: (state) => {
            state.loading = true;
        },
        [fetchCurrentByName.fulfilled]: (state, action) => {
            state.loading = false;
            state.current = action.payload;
        },
        [fetchCurrentByName.rejected]: (state) => {
            state.loading = false;
        },
        [fetchCurrentByCoords.pending]: (state) => {
            state.loading = true;
        },
        [fetchCurrentByCoords.fulfilled]: (state, action) => {
            state.loading = false;
            state.current = action.payload;
        },
        [fetchCurrentByCoords.rejected]: (state) => {
            state.loading = false;
        }
    }
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;

