import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Box } from "@mui/system";
import React, {useState} from "react";
import { getDaily } from "../services/scaleReadings";
import ChartHandler from './ChartHandler';
import Totals from './Totals';
import { getLastMonday } from '../shared/helpers'
import { secondsInHour, hoursInWeek } from '../shared/constants'

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

const hoursOfWeekNow = () => {
    const now = Math.floor(Date.now() / 1000);
    const monday = getLastMonday().getTime() / 1000;
    return (Math.round((now - monday) / secondsInHour));
}

const Daily = ({ userId, scales }) => {
    const [weeks, setWeeks] = useState(1);
    const weeksInHours = hoursOfWeekNow() + (weeks - 1) * hoursInWeek;

    return (
        <Box sx={dailyChartDisplay}>
            <Typography variant="h4" component="h2">
                Weekly Totals
            </Typography>
            <WeeksSelection weeks={weeks} setWeeks={setWeeks} />
            <Totals timeRange={weeksInHours} userId={userId} scales={scales}/>
            <ChartHandler 
                timeRange={weeks}
                userId={userId}
                scales={scales}
                fetchQuery={getDaily}
                endpoint='dailyaccumulated'
            />
            <br />
            <ChartHandler
                timeRange={weeks}
                userId={userId}
                scales={scales}
                fetchQuery={getDaily}
                endpoint='daily'
            />
        </Box>
    )
}

export default Daily;