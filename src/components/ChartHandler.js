import React, { useEffect, useState } from 'react'
import { useInterval } from '../state/hooks/useInterval';
import LineHourlyDisplay from './LineHourlyDisplay'
import { intervalPeriods } from '../shared/constants.js';
import LineDailyDisplay from './LineDailyDisplay';
import BarDailyDisplay from './BarDailyDisplay';

const influxQuery = async (timeRange, userId, callbacks, endpoint) => {
    const range = timeRange;
    const response = await callbacks.fetchQuery({range, userId, endpoint});
    callbacks.setReadings(response.readings);
    callbacks.setTimePeriod(response.timePeriod);
}

const ChartHandler = ({timeRange, userId, scales, fetchQuery, endpoint}) => {
    const [readings, setReadings] = useState([]);
    const [timePeriod, setTimePeriod] = useState({});

    useEffect(() => {
        const callbacks = { setReadings, setTimePeriod, fetchQuery }
        influxQuery(timeRange, userId, callbacks, endpoint);
    }, [timeRange, userId, fetchQuery, endpoint]);
    useInterval(() => {
        const callbacks = { setReadings, setTimePeriod, fetchQuery }
        influxQuery(timeRange, userId, callbacks, endpoint);
    }, intervalPeriods.halfHour);

    switch (endpoint) {
        case 'accumulated':
            return (
                <LineHourlyDisplay data={readings} timePeriod={timePeriod} scales={scales}/>
            );
        case 'daily':
            return (
                <BarDailyDisplay data={readings} scales={scales} />
            );
        case 'dailyaccumulated':
            return (
                <LineDailyDisplay data={readings} timePeriod={timePeriod} scales={scales}/>
            );
        default:
            return null
    }

}

export default ChartHandler