import React, { useEffect, useState } from 'react'
import Hourly from '../components/Hourly'
import Daily from '../components/Daily'
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
    let scales = await getScales(user_id)
    scales = scales.map(scale => {
        return { ...scale, device_id: 'id_' + scale.device_id.toString()}
    })
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
            <Hourly userId={userId} scales={scales}/>
            <br />
            <Daily userId={userId} scales={scales}/>
        </Box>
    )
}

export default Dashboard