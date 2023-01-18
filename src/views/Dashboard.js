import React from 'react'
import HistoryChart from '../components/HistoryChart'
import LatestReadings from '../components/LatestReadings'
import {Box, Typography} from '@mui/material'

const dashboardStyle = {
    minHeight: '100%',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

const Dashboard = () => {
    return (
        <Box m="auto" sx={dashboardStyle}>
            <Typography variant="h2" component="h1">
                Your Scales
            </Typography>
            <LatestReadings />
            <HistoryChart />
        </Box>
    )
}

export default Dashboard