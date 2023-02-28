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

const queryTotal = async (setTotals, timeRange, userId) => {
    const range = timeRange;
    const response = await getTotals({ range, userId });
    setTotals(response.total);
}

const Totals = ({timeRange, userId}) => {
    const [totals, setTotals] = useState({});

    useEffect(() => {
        queryTotal(setTotals, timeRange, userId);
    }, [timeRange, userId]);
    console.log(totals);
    return (
        <Box textAlign={'center'} minWidth={'100%'}>
            <Typography m={2} variant="h4" component="h2">
    s           Total
            </Typography>
            <Box sx={flexBox}>
                TEST
            </Box>
        </Box>
    )
}

export default Totals