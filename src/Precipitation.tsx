import React from 'react';
import WeatherChart from './WeatherChart';

export default function Precipitation() {
    return (
        <WeatherChart
            lines={[
                {
                    name: '% chance of precipitation',
                    key: 'precipitation',
                    color: 'blue',
                },
            ]}
            domain={[0, 1]}
            yAxisTickFormatter={(ratio) => ratio * 100 + '%'}
        />
    );
}
