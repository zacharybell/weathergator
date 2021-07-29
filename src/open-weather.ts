import axios from 'axios';
import { Coordinates } from './redux/features/location';

export interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pop: number;
}

export interface Daily {
    dt: number;
    temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
    };
    feels_like: {
        day: number;
        eve: number;
        morn: number;
        night: number;
    };
    pop: number;
}

export interface OneCall {
    timezone: string;
    timezone_offset: number;
    hourly: [Hourly];
    daily: [Daily];
}

const openWeatherClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    timeout: 5000,
});

export async function getOneCall(coordinates: Coordinates) {
    return openWeatherClient.get<OneCall>(
        `/onecall?appid=<apikey>&lat=${coordinates.latitude}&lon=${coordinates.longitude}`
    );
}
