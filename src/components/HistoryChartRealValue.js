import React, { useEffect, useState } from 'react'
import { getHistory } from '../services/scaleReadings'
import { useInterval } from '../state/hooks/useInterval';
import HistoryChartLine from './HistoryChartLine'
import { intervalPeriods } from '../shared/constants';

const influxQuery = async (timeRange, setReadings, setTimePeriod, userId) => {
    const range = timeRange;
    const response = await getHistory({range, userId});
    setReadings(response.readings);
    setTimePeriod(response.timePeriod);
}

const HistoryChartRealValue = ({timeRange, userId}) => {
    const [readings, setReadings] = useState([]);
    const [timePeriod, setTimePeriod] = useState({});

    useEffect(() => {
        influxQuery(timeRange, setReadings, setTimePeriod, userId);
    }, [timeRange, userId]);
    useInterval(() => {
        influxQuery(timeRange, setReadings, setTimePeriod, userId);
    }, intervalPeriods.halfHour);

    return (
        <HistoryChartLine data={readings} timePeriod={timePeriod}/>
    )
}

export default HistoryChartRealValue