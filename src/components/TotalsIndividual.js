import React from "react";
import { Card, CardContent, Typography } from '@mui/material';

const round = (total) => {
    const rounded = Math.round(total * 10) / 10;
    return rounded.toFixed(1);
}

const TotalsIndividual = ({total}) => {
    return (
        <Card m={5}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {round(total.total)} kg
                </Typography>
                <Typography variant="body1" component="h3">
                    {total.name}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default TotalsIndividual;