import React from 'react'
import HistoryChartRealValue from '../components/HistoryChartRealValue'
import ChartRangeControl from './ChartRangeControl'
import {Box, Typography} from '@mui/material'
import HistoryChartTotal from './HistoryChartTotal'

const historyChartDisplay = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}

const HistoryChart = ({ userId }) => {
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
            <Typography variant="h5" component="h3">
                Live Values
            </Typography>
            <HistoryChartRealValue timeRange={timeRange} userId={userId}/>
            <Typography variant="h5" component="h3">
                Live Totals
            </Typography>
            <HistoryChartTotal timeRange={timeRange} userId={userId}/>
        </Box>
    )
}

export default HistoryChart