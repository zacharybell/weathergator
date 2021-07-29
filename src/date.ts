import { DateTime } from 'luxon';

export function getDayIntervals(start: DateTime, end: DateTime) {
    let curr = start;
    const intervals = [];
    while (curr <= end) {
        intervals.push(curr.toSeconds());
        curr = curr.plus({ days: 1 });
    }
    return intervals;
}
