import React from 'react'
import { PieChart, Pie, Cell, Label } from 'recharts'
import { Card, CardContent, Typography } from '@mui/material';

const LatestReadingsIndividual = ({data}) => {
    const capacity = 100;
    const test = [];
    test.push(data);
    test.push({weight: capacity - data.weight});
    return (
        <Card m={5} >
            <CardContent>
                <Typography variant="h5" component="h3">
                    {data.device_id}
                </Typography>
                <PieChart width={200} height={200}>
                    <Pie
                        data={test}
                        cx="50%"
                        cy="50%"
                        dataKey="weight"
                        innerRadius={60}
                        outerRadius={80}
                    >
                        {test.map((_, index) => {
                            if (index === 1) {
                                return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
                            }
                            return <Cell key={`cell-${index}`} fill="green" />;
                        })}
                        <Label
                            value={test[0].weight.toFixed(1) + " kgs"}
                            position="center"
                            fill="white"
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                                fontFamily: "Roboto"
                            }}
                        />
                    </Pie>
                </PieChart>
            </CardContent>
        </Card>
    )
}

export default LatestReadingsIndividual