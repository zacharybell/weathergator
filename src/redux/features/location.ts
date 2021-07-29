import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeatherByCoordinates } from './weather';

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface LocationState {
    coordinates?: Coordinates;
    timeZone?: string;
}

const initialState: LocationState = {};

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<Coordinates>) => {
            state.coordinates = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchWeatherByCoordinates.fulfilled,
            (state, action) => {
                state.timeZone = action.payload.timezone;
            }
        );
        builder.addCase(fetchWeatherByCoordinates.pending, (state, action) => {
            delete state.timeZone;
        });
    },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
