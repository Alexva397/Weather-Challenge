import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities: []
};

const pinnedSlice = createSlice({
    name: "pinned",
    initialState,
    reducers: {
        addCity (state, action) {
            state.cities.push(action.payload);
        },
        removeCity (state, action) {
            const index = state.cities.indexOf(action.payload);
            state.cities.splice(index, 1);
        }
    }
});

export const { addCity, removeCity } = pinnedSlice.actions;

export default pinnedSlice.reducer;