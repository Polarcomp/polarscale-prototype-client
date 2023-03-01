import React, { useEffect, useState } from 'react'
import { getLastestAll } from '../services/scaleReadings'
import LatestReadingsIndividual from './LatestReadingsIndividual';
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import { useInterval } from '../state/hooks/useInterval';
import { intervalPeriods } from '../shared/constants';

const flexBox = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
}

const scaleComponentArray = (data) => {
    return (data.map(scale=>{
        return <LatestReadingsIndividual
            key={scale.device_id} data={scale}
        />
    }))
}

const influxQuery = async (setData, userId) => {
    const response = await getLastestAll(userId);
    setData(response);
}

const LatestReadings = ({ userId }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        influxQuery(setData, userId);
    }, [userId]);
    useInterval(() => {
        influxQuery(setData, userId);
    }, intervalPeriods.halfHour);

    return (
        <Box textAlign={'center'} minWidth={'100%'}>
            <Typography m={2} variant="h4" component="h2">
                Total
            </Typography>
            <Box sx={flexBox}>
                {scaleComponentArray(data)}
            </Box>
        </Box>
    )
}

export default LatestReadings