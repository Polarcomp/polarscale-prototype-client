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
    YAxis }
from "recharts";

const BarDailyDisplay = ({ data, scales }) => {
    const colors = ["#E6B8DF", "#A1D1AC"]
    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip contentStyle={{backgroundColor: '#121212'}}
                    labelFormatter = {(date) => moment.unix(date).format("dddd")}
                    formatter={(value) => value.toFixed(1) + " kg"}
                />
                {scales.map((scale, index) => {
                    return <Bar
                        key={scale.device_id}
                        fill={colors[index]}
                        dataKey={scale.device_id}
                        name={scale.name}
                    />
                })}
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(date) => moment.unix(date).format("dddd")}
                />
                <YAxis
                    label={{ value: 'kgs', angle: -90, position: 'insideLeft', fill: 'white'}}
                    tick={{ fill: 'white' }}
                    tickLine={{ stroke: 'white' }}
                />
                <Legend />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarDailyDisplay;