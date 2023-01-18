import React, { useEffect, useState } from 'react'
import { getTotal } from '../services/scaleReadings'
import { useInterval } from '../state/hooks/useInterval';
import HistoryChartLine from './HistoryChartLine'

const influxQuery = async (timeRange, setReadings, setTimePeriod) => {
    const range = timeRange;
    const response = await getTotal({range});
    setReadings(response.readings);
    setTimePeriod(response.timePeriod);
}

const HistoryChartTotal = ({timeRange}) => {
    const [readings, setReadings] = useState([]);
    const [timePeriod, setTimePeriod] = useState({});

    useEffect(() => {
        influxQuery(timeRange, setReadings, setTimePeriod);
    }, [timeRange]);
    useInterval(() => {
        influxQuery(timeRange, setReadings, setTimePeriod)
    }, 1000);

    return (
        <HistoryChartLine data={readings} timePeriod={timePeriod}/>
    )
}

export default HistoryChartTotal