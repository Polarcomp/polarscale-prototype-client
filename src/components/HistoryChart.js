import React from 'react'
import HistoryChartRealValue from '../components/HistoryChartRealValue'
import ChartRangeControl from './ChartRangeControl'
import {Box, Typography} from '@mui/material'
import HistoryChartAccumulated from './HistoryChartAccumulated'
import Totals from './Totals'

const historyChartDisplay = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}

const HistoryChart = ({ userId, scales }) => {
    const [timeRange, setTimeRange] = React.useState(1);
    const chooseRange = (range) => {
        setTimeRange(range);
    }
    return (
        <Box sx={historyChartDisplay}>
            <Typography variant="h4" component="h2">
                History
            </Typography>
            <ChartRangeControl chooseRange={chooseRange}/>
            <Totals timeRange={timeRange} userId={userId} scales={scales}/>
            <Typography variant="h5" component="h3">
                Running Totals
            </Typography>
            <HistoryChartAccumulated timeRange={timeRange} userId={userId}/>
            <Typography variant="h5" component="h3">
                Live Values
            </Typography>
            <HistoryChartRealValue timeRange={timeRange} userId={userId}/>
        </Box>
    )
}

export default HistoryChart