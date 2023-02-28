import React, { useEffect, useState } from "react";
import { getTotals } from "../services/scaleReadings";
import {Box, Typography} from '@mui/material'

const flexBox = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
}

const queryTotal = async (setTotals, timeRange, userId, scales) => {
    const range = timeRange;
    const response = await getTotals({ range, userId });
    const result = scales.map(scale => {
        const strId = 'id_' + scale.device_id.toString();
        return { ...scale, total: response.total[strId]};
    })
    setTotals(result);
}

const Totals = ({timeRange, userId, scales}) => {
    const [totals, setTotals] = useState({});
    useEffect(() => {
        queryTotal(setTotals, timeRange, userId, scales);
    }, [timeRange, userId, scales]);
    console.log(totals);
    return (
        <Box textAlign={'center'} minWidth={'100%'}>
            <Typography m={2} variant="h4" component="h2">
               Total
            </Typography>
            <Box sx={flexBox}>
                TEST
            </Box>
        </Box>
    )
}

export default Totals