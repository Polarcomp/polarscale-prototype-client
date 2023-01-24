import React from 'react'
import HistoryChart from '../components/HistoryChart'
import LatestReadings from '../components/LatestReadings'
import {Box, Typography} from '@mui/material'
import useMqtt from '../state/hooks/useMqtt'

const dashboardStyle = {
    minHeight: '100%',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

const Dashboard = () => {
    const topic = 'testuser1/+'
    useMqtt({topic});
    return (
        <Box m="auto" sx={dashboardStyle}>
            <Typography variant="h2" component="h1">
                Your Scales
            </Typography>
        </Box>
    )
}

export default Dashboard