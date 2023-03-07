import React from 'react'
import {
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    LineChart,
    ResponsiveContainer,
    ReferenceLine,
    Label
} from 'recharts'
import moment from 'moment'
import { todayTimestamp, verticalFillColors } from '../shared/helpers'

const LineDailyDisplay = ({data, timePeriod, scales}) => {
    const colors = ["#E6B8DF", "#A1D1AC"]
    const dateFormat = data.length > 7 ? 'dd D/M/YY' : 'dddd'
    const gridFillOpacity = 0.5;
    const xTickAngle = data.length > 7 ? -45 : 0;
    const xTickY = data.length > 7 ? 20 : 0;
    const xAxisHeight = data.length > 7 ? 60 : 30
    const chartHeight = 370 + xAxisHeight;

    return (
        <ResponsiveContainer width={"100%"} height={chartHeight}>
            <LineChart data={data} >
                <CartesianGrid strokeDasharray="3 3"
                    verticalFill={verticalFillColors(14)}
                    fillOpacity={gridFillOpacity}
                />
                <Tooltip contentStyle={{backgroundColor: '#121212'}}
                    labelFormatter = {(date) => moment.unix(date).format("dddd Do MMMM")}
                    formatter={(value) => value.toFixed(1) + " kg"}
                />
                {scales.map((scale, index) => {
                    return <Line 
                        isAnimationActive={false}
                        type="monotone"
                        key={scale.device_id}
                        stroke={colors[index]}
                        strokeWidth={1}
                        dataKey={scale.device_id}
                        dot={false}
                        name={scale.name}
                        />
                })}
                <XAxis 
                    dataKey="timestamp" 
                    tickFormatter = {(date) => moment.unix(date).format(dateFormat)}
                    domain={['dataMin', 'dataMax']}
                    interval={0}
                    angle={xTickAngle}
                    tick={{dy: xTickY, fill: 'white'}}
                    height={xAxisHeight}
                />
                <YAxis
                    label={{ value: 'kgs', angle: -90, position: 'insideLeft', fill: 'white' }}
                    tick={{ fill: 'white' }}
                    tickLine={{ stroke: 'white' }}
                />
                <Legend />
                <ReferenceLine x={todayTimestamp()} stroke="red" >
                    <Label value="Today" position="insideTop" fill='red'/>
                </ReferenceLine>
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineDailyDisplay