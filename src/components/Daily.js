import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { getDaily } from "../services/scaleReadings";
import ChartHandler from './ChartHandler';

const dailyChartDisplay = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}

const Daily = ({ userId, scales }) => {
    return (
        <Box sx={dailyChartDisplay}>
            <Typography variant="h4" component="h2">
                Daily Totals
            </Typography>
            <ChartHandler
                timeRange={0}
                userId={userId}
                scales={scales}
                fetchQuery={getDaily}
                endpoint='daily'
            />
            <br />
            <ChartHandler 
                timeRange={0}
                userId={userId}
                scales={scales}
                fetchQuery={getDaily}
                endpoint='dailyaccumulated'
            />
        </Box>
    )
}

export default Daily;