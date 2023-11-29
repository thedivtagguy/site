import { timeParse, timeFormat} from 'd3';

export const getYearAndWeek = (dateString, week = true) => {
    const parseDate = timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
    const date = parseDate(dateString);

   // If week is true, return with week number otherwise return with year
    const formatYearWeek = timeFormat(week ? '%Y-%U' : '%Y');

    return formatYearWeek(date);
}
