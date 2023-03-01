import React from "react";
import { Card, CardContent, Typography } from '@mui/material';

const TotalsIndividual = ({total}) => {
    return (
        <Card m={5}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {total.total.toFixed(1)} kg
                </Typography>
                <Typography variant="body1" component="h3">
                    {total.name}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default TotalsIndividual;