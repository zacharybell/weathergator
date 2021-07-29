import { DateTime } from 'luxon';
import { getDayIntervals } from './date';

test('creates daily intervals', () => {
    const now = DateTime.fromSeconds(0);
    const later = now.plus({ days: 5 });
    const intervals = getDayIntervals(now, later);

    expect(intervals).toEqual([0, 86400, 172800, 259200, 345600, 432000]);
});
