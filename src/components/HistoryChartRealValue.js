import React, { useEffect, useState } from 'react'
import { getHistory } from '../services/scaleReadings'
import { useInterval } from '../state/hooks/useInterval';
import HistoryChartLine from './HistoryChartLine'
import { intervalPeriods } from '../shared/constants';

const influxQuery = async (timeRange, setReadings, setTimePeriod) => {
    const range = timeRange;
    const response = await getHistory({range});
    setReadings(response.readings);
    setTimePeriod(response.timePeriod);
}

const HistoryChartRealValue = ({timeRange}) => {
    const [readings, setReadings] = useState([]);
    const [timePeriod, setTimePeriod] = useState({});

    useEffect(() => {
        influxQuery(timeRange, setReadings, setTimePeriod);
    }, [timeRange]);
    useInterval(() => {
        influxQuery(timeRange, setReadings, setTimePeriod)
    }, intervalPeriods.halfHour);

    return (
        <HistoryChartLine data={readings} timePeriod={timePeriod}/>
    )
}

export default HistoryChartRealValue