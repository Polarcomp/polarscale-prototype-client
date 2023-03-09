import React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const ChartRangeControl = ({chooseRange}) => {
    const marks = [
        { value: 1, scaledValue: 1, label: '1 hr' },
        { value: 2, scaledValue: 2, label: '2 hrs' },
        { value: 3, scaledValue: 4, label: '4 hrs' },
        { value: 4, scaledValue: 8, label: '8 hrs' },
        { value: 5, scaledValue: 12, label: '12 hrs' },
        { value: 6, scaledValue: 24, label: '24 hrs' }
    ];
    const scale = value => {
        const index = value - 1;
        return marks[index].scaledValue;
    }
    const valueFormat = value => {
        if (value === 1)
            return '1 hr'
        return `${value} hrs`
    }
    return (
        <div>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="time-period-range"
                    aria-labelledby="time-period-range-slider"
                    defaultValue={1}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valueFormat}
                    marks={marks}
                    scale={scale}
                    step={null}
                    min={1}
                    max={6}
                    onChange={(_, value) => chooseRange(scale(value)) }
                />
            </Box>
        </div>
    )
}

export default ChartRangeControl