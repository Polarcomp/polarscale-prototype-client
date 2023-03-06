import React from 'react'
import ChartRangeControl from './ChartRangeControl'
import {Box, Typography} from '@mui/material'
import Totals from './Totals'
import Line from './Line'
import { getAccumulated } from '../services/scaleReadings'

const hourlyDisplayStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}

const Hourly = ({ userId, scales }) => {
    const [timeRange, setTimeRange] = React.useState(1);
    const chooseRange = (range) => {
        setTimeRange(range);
    }
    return (
        <Box sx={hourlyDisplayStyle}>
            <Typography variant="h4" component="h2">
                Current Hourly Total
            </Typography>
            <ChartRangeControl chooseRange={chooseRange}/>
            <Totals timeRange={timeRange} userId={userId} scales={scales}/>
            <Line
                timeRange={timeRange}
                userId={userId}
                scales={scales}
                fetchQuery={getAccumulated}/>
        </Box>
    )
}

export default Hourly