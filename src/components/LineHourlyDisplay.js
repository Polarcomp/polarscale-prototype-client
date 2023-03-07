import React from 'react'
import {
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    LineChart,
    ResponsiveContainer
} from 'recharts'
import moment from 'moment'
import { chartColors } from '../shared/constants'

const constructTicks = (timePeriod) => {
    const intervals = 6;
    const periodLength = (timePeriod.stop - timePeriod.start) / intervals;
    const timestamp = timePeriod.start;
    const result = [];
    for (let index = 0; index < intervals; index++)
        result.push(timestamp + periodLength * index);
    result.push(timePeriod.stop);
    return (result);
}

const LineHourlyDisplay = ({data, timePeriod, scales}) => {
    const ticks = constructTicks(timePeriod);
    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <LineChart data={data} >
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip contentStyle={{backgroundColor: '#121212'}}
                    labelFormatter = {(date) => moment.unix(date).format("HH:mm")}
                    formatter={(value) => value.toFixed(1) + " kg"}
                />
                {scales.map((scale, index) => {
                    return <Line 
                        isAnimationActive={false}
                        type="monotone"
                        key={scale.device_id}
                        stroke={chartColors[index]}
                        strokeWidth={1}
                        dataKey={scale.device_id}
                        dot={false}
                        name={scale.name}
                        />
                })}
                <XAxis 
                    dataKey="timestamp" 
                    type='number'
                    tickFormatter = {(date) => moment.unix(date).format("HH:mm")}
                    domain={['dataMin', 'dataMax']}
                    tickCount='7'
                    ticks={ticks}
                />
                <YAxis
                    label={{ value: 'kgs', angle: -90, position: 'insideLeft', fill: 'white' }}
                    tick={{ fill: 'white' }}
                    tickLine={{ stroke: 'white' }}
                />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineHourlyDisplay