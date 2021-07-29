import React from 'react';
import WeatherChart from './WeatherChart';

function kelvinToFahrenheit(kelvin: number) {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
}

export default function Temperature() {
    return (
        <WeatherChart
            lines={[
                {
                    name: 'Temperature',
                    key: 'temperature',
                    color: '#82ca9d',
                },
                {
                    name: 'Feels Like',
                    key: 'feelsLike',
                    color: '#8884d8',
                },
            ]}
            domain={['dataMin', 'dataMax']}
            yAxisTickFormatter={(temp) => kelvinToFahrenheit(temp) + ''}
        />
    );
}
