import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getDaily } from "../services/scaleReadings";
import PeriodicBarChart from "./PeriodicBarChart";

const dailyChartDisplay = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}

const influxQuery = async (setReadings, userId) => {
    const response = await getDaily({ userId });
    console.log(response);
    setReadings(response.readings);
}

const Daily = ({ userId, scales }) => {
    const [readings, setReadings] = useState([]);

    useEffect(() => {
        influxQuery(setReadings, userId);
    }, [userId]);

    if (!readings.length)
        return null;
    return (
        <Box sx={dailyChartDisplay}>
            <Typography variant="h4" component="h2">
                Daily Totals
            </Typography>
            <PeriodicBarChart data={readings} scales={scales}/>
        </Box>
    )
}

export default Daily;