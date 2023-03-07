import React from "react";
import moment from 'moment'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    XAxis,
    YAxis, 
    ReferenceLine,
    Label}
from "recharts";
import { todayTimestamp, verticalFillColors } from "../shared/helpers";
import { chartColors } from '../shared/constants'

const BarDailyDisplay = ({ data, scales }) => {
    const dateFormat = data.length > 7 ? 'dd D/M/YY' : 'dddd';
    const gridFillOpacity = 0.7;
    const xTickAngle = data.length > 7 ? -45 : 0;
    const xTickY = data.length > 7 ? 20 : 0;
    const xAxisHeight = data.length > 7 ? 60 : 30
    const chartHeight = 370 + xAxisHeight;

    return (
        <ResponsiveContainer width={"100%"} height={chartHeight}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3"
                    verticalFill={verticalFillColors()}
                    fillOpacity={gridFillOpacity}
                />
                <Tooltip contentStyle={{backgroundColor: '#121212'}}
                    labelFormatter = {(date) => moment.unix(date).format("dddd Do MMMM")}
                    formatter={(value) => value.toFixed(1) + " kg"}
                />
                {scales.map((scale, index) => {
                    return <Bar
                        key={scale.device_id}
                        fill={chartColors[index]}
                        dataKey={scale.device_id}
                        name={scale.name}
                    />
                })}
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(date) => moment.unix(date).format(dateFormat)}
                    interval={0}
                    angle={xTickAngle}
                    tick={{dy: xTickY, fill: 'white'}}
                    height={xAxisHeight}
                />
                <YAxis
                    label={{ value: 'kgs', angle: -90, position: 'insideLeft', fill: 'white'}}
                    tick={{ fill: 'white' }}
                    tickLine={{ stroke: 'white' }}
                />
                <Legend />
                <ReferenceLine x={todayTimestamp()} stroke="red">
                    <Label value="Today" position="insideTop" fill='red'/>
                </ReferenceLine>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarDailyDisplay;