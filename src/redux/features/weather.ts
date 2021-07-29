import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Daily, getOneCall, Hourly, OneCall } from '../../open-weather';
import { Coordinates } from './location';

export interface Weather {
    time: number;
    temperature?: number;
    feelsLike?: number;
    pressure?: number;
    humidity?: number;
    dewPoint?: number;
    uvi?: number;
    clouds?: number;
    visibility?: number;
    wind?: {
        speed: number;
        degree: number;
        gust: number;
    };
    precipitation?: number;
}

export interface WeatherState {
    byId: {
        [index: number]: Weather;
    };
    allIds: number[];
}

const initialState: WeatherState = {
    byId: {},
    allIds: [],
};

const fetchWeatherByCoordinates = createAsyncThunk(
    'weather/fetchWeatherByCoordinates',
    async (coordinates: Coordinates, thunkAPI) => {
        const response = await getOneCall(coordinates);
        return response.data;
    }
);

function normalizeOneCall(oneCall: OneCall) {
    const normalized = {} as {
        [index: number]: Weather;
    };

    oneCall.daily
        .flatMap((day) => mapDaily(day))
        .forEach((item) => {
            normalized[item.time] = item;
        });

    oneCall.hourly
        .flatMap((hour) => mapHourly(hour))
        .forEach((item) => {
            normalized[item.time] = item;
        });

    return normalized;
}

function getSortedKeys(normalized: { [index: number]: any }) {
    return Object.keys(normalized)
        .map((key) => parseInt(key, 10))
        .sort((a, b) => a - b);
}

function mapHourly(hour: Hourly) {
    return {
        time: hour.dt,
        temperature: hour.temp,
        feelsLike: hour.feels_like,
        precipitation: hour.pop,
    } as Weather;
}

function mapDaily(day: Daily) {
    const dailyWeather = [];

    dailyWeather.push({
        time: day.dt - 21600,
        temperature: day.temp.morn,
        feelsLike: day.feels_like.morn,
    } as Weather);

    dailyWeather.push({
        time: day.dt,
        temperature: day.temp.day,
        feelsLike: day.feels_like.day,
        precipitation: day.pop,
    } as Weather);

    dailyWeather.push({
        time: day.dt + 21600,
        temperature: day.temp.eve,
        feelsLike: day.feels_like.eve,
    } as Weather);

    dailyWeather.push({
        time: day.dt + 43200,
        temperature: day.temp.night,
        feelsLike: day.feels_like.night,
    } as Weather);

    return dailyWeather;
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherByCoordinates.pending, (state, action) => {
            state.byId = {};
            state.allIds = [];
        });
        builder.addCase(
            fetchWeatherByCoordinates.fulfilled,
            (state, action) => {
                const normalized = normalizeOneCall(action.payload);
                state.byId = normalized;
                state.allIds = getSortedKeys(normalized);
            }
        );
    },
});

export { fetchWeatherByCoordinates };
export default weatherSlice.reducer;
