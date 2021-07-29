import { DateTime } from 'luxon';
import React from 'react';
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { AxisDomain } from 'recharts/types/util/types';
import { Weather, WeatherState } from './redux/features/weather';
import { useAppSelector } from './redux/hooks';

interface Props {
    lines: LineConfig[];
    yAxisTickFormatter?: (tick: number) => string;
    domain?: AxisDomain;
}

interface LineConfig {
    name: string;
    key: string;
    color: string;
}

function mapWeatherToChartData(weather: WeatherState) {
    const chartData: Weather[] = [];
    weather.allIds.forEach((key) => {
        chartData.push(weather.byId[key]);
    });
    return chartData;
}

function getDailyOffsetTimeIntervals(
    range: [number, number],
    timeZone: string
) {
    const first = DateTime.fromSeconds(range[0]).setZone(timeZone);

    const start = first.equals(first.startOf('day'))
        ? first
        : first.endOf('day').plus({ milliseconds: 1 });
    const end = DateTime.fromSeconds(range[1]).setZone(timeZone).startOf('day');

    const intervals = [];

    let current = start;
    while (current < end) {
        intervals.push(current.toSeconds());
        current = current.plus({ days: 1 });
    }

    return intervals;
}

export default function WeatherChart(props: Props) {
    const weather = useAppSelector((state) => state.weather);
    const timeZone = useAppSelector((state) => state.locations.timeZone);
    const times = weather.allIds;

    const intervals: number[] =
        times.length > 1
            ? getDailyOffsetTimeIntervals(
                  [times[0], times[times.length - 1]],
                  timeZone!
              )
            : [];

    const chartData = mapWeatherToChartData(weather);
    return (
        <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis
                dataKey="time"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(time) =>
                    DateTime.fromSeconds(time)
                        .setZone(timeZone!)
                        .toFormat('M/dd')
                }
                scale="time"
                ticks={intervals}
            />
            <YAxis
                domain={props.domain}
                tickFormatter={props.yAxisTickFormatter}
                scale="linear"
            />
            <Tooltip
                formatter={props.yAxisTickFormatter}
                labelFormatter={(time) =>
                    DateTime.fromSeconds(time)
                        .setZone(timeZone!)
                        .toFormat('h a')
                }
            />
            <Legend />
            {props.lines.map((config) => {
                return (
                    <Line
                        connectNulls
                        key={config.key}
                        name={config.name}
                        type="natural"
                        dataKey={config.key}
                        stroke={config.color}
                    />
                );
            })}
        </LineChart>
    );
}
