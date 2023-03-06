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


const LineDailyDisplay = ({data, timePeriod, scales}) => {
    const colors = ["#E6B8DF", "#A1D1AC"]
    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <LineChart data={data} >
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip contentStyle={{backgroundColor: '#121212'}}
                    labelFormatter = {(date) => moment.unix(date).format("dddd")}
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
                    tickFormatter = {(date) => moment.unix(date).format("dddd")}
                    domain={['dataMin', 'dataMax']}
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

export default LineDailyDisplay