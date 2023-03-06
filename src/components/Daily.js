import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Box } from "@mui/system";
import React, {useState} from "react";
import { getDaily } from "../services/scaleReadings";
import ChartHandler from './ChartHandler';

const dailyChartDisplay = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}

const WeeksSelection = ({weeks, setWeeks}) => {
    const handleChange = (event, newWeek) => {
        setWeeks(newWeek);
    }
    return (
        <ToggleButtonGroup
            value={weeks}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value={1}>Current week</ToggleButton>
            <ToggleButton value={2}>2 weeks</ToggleButton>
            <ToggleButton value={3}>3 weeks</ToggleButton>
            <ToggleButton value={4}>4 weeks</ToggleButton>
        </ToggleButtonGroup>
    )
}

const Daily = ({ userId, scales }) => {
    const [weeks, setWeeks] = useState(1);

    return (
        <Box sx={dailyChartDisplay}>
            <Typography variant="h4" component="h2">
                Daily Totals
            </Typography>
            <WeeksSelection weeks={weeks} setWeeks={setWeeks} />
            <ChartHandler
                timeRange={weeks}
                userId={userId}
                scales={scales}
                fetchQuery={getDaily}
                endpoint='daily'
            />
            <br />
            <ChartHandler 
                timeRange={weeks}
                userId={userId}
                scales={scales}
                fetchQuery={getDaily}
                endpoint='dailyaccumulated'
            />
        </Box>
    )
}

export default Daily;