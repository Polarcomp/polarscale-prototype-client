import React, { useEffect, useState } from 'react'
import { useInterval } from '../state/hooks/useInterval';
import LineDisplay from './LineDisplay'
import { intervalPeriods } from '../shared/constants.js';

const influxQuery = async (timeRange, userId, callbacks) => {
    const range = timeRange;
    const response = await callbacks.fetchQuery({range, userId});
    callbacks.setReadings(response.readings);
    callbacks.setTimePeriod(response.timePeriod);
}

const Line = ({timeRange, userId, scales, fetchQuery}) => {
    const [readings, setReadings] = useState([]);
    const [timePeriod, setTimePeriod] = useState({});
    const callbacks = { setReadings, setTimePeriod, fetchQuery }

    useEffect(() => {
        influxQuery(timeRange, userId, callbacks);
    }, [timeRange, userId]);
    useInterval(() => {
        influxQuery(timeRange, setReadings, setTimePeriod, userId);
    }, intervalPeriods.halfHour);

    return (
        <LineDisplay data={readings} timePeriod={timePeriod} scales={scales}/>
    )
}

export default Line