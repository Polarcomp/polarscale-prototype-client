import React, { useEffect, useState } from "react";
import { getQuery } from "../services/scaleReadings";
import { Box } from '@mui/material'
import TotalsIndividual from "./TotalsIndividual";
import { useInterval } from "../state/hooks/useInterval";
import { intervalPeriods } from "../shared/constants";

const flexBox = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
}

const queryTotal = async (setTotals, timeRange, userId, scales) => {
    const range = timeRange;
    const response = await getQuery({ range, userId, endpoint: 'total'});
    if (!response.total)
        return
    const result = scales.map(scale => {
        return { ...scale, total: response.total[scale.device_id]};
    })
    setTotals(result);
}

const scaleComponentArray = (totals) => {
    if (!totals.length)
        return (null);
    return (totals.map(total=>{
        if (!total.total)
            return null;
        return <TotalsIndividual
            key={total.device_id} total={total}
        />
    }))
}

const Totals = ({timeRange, userId, scales}) => {
    const [totals, setTotals] = useState([]);
    useEffect(() => {
        queryTotal(setTotals, timeRange, userId, scales);
    }, [timeRange, userId, scales]);
    useInterval(() => {
        queryTotal(setTotals, timeRange, userId, scales);
    }, intervalPeriods.halfHour)
    return (
        <Box textAlign={'center'} minWidth={'100%'}>
            <Box sx={flexBox}>
                {scaleComponentArray(totals)}
            </Box>
        </Box>
    )
}

export default Totals