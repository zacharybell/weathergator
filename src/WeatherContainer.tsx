import React, { useEffect } from 'react';
import Precipitation from './Precipitation';
import { fetchWeatherByCoordinates } from './redux/features/weather';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Temperature from './Temperature';

export default function WeatherContainer() {
    const coordinates = useAppSelector((state) => state.locations.coordinates);
    const dispatch = useAppDispatch();

    useEffect(() => {
        coordinates && dispatch(fetchWeatherByCoordinates(coordinates));
    }, [coordinates]);
    return (
        <>
            <Temperature />
            <Precipitation />
        </>
    );
}
