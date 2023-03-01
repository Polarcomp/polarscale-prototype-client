import React, { useEffect, useState } from 'react'
import HistoryChart from '../components/HistoryChart'
import LatestReadings from '../components/LatestReadings'
import {Box, Typography} from '@mui/material'
import { getScales } from '../services/user'

const dashboardStyle = {
    minHeight: '100%',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
}

const queryScales = async (setScales, user_id) => {
    const scales = await getScales(user_id)
    setScales(scales);
}

const Dashboard = () => {
    const userId = 'e32f5583-c101-4bac-97eb-b77fe01109f1';
    const [scales, setScales] = useState([]);
    useEffect(() => {
        queryScales(setScales, userId);
    }, [])
    return (
        <Box m="auto" sx={dashboardStyle}>
            <Typography variant="h2" component="h1">
                Hello Nolla!
            </Typography>
            <HistoryChart userId={userId} scales={scales}/>
        </Box>
    )
}

export default Dashboard