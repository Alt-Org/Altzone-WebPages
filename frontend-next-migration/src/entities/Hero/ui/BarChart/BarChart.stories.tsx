import { Meta } from '@storybook/react';
import React from 'react';
import { BarChart, BarChartProps } from './BarChart';

const meta: Meta<typeof BarChart> = {
    title: 'Entities/Hero/BarChart',
    component: BarChart,

    argTypes: {
        stats: {
            description: 'stats',
            control: 'object',
            defaultValue: [],
        },
    },
    tags: ['autodocs'],

    args: {
        stats: [
            {
                name: 'resistance',
                defaultLevel: 1,
                color: 'rgb(153,0,255)',
            },
            { name: 'hp', defaultLevel: 2, color: 'rgb(0,255,0)' },
            { name: 'size', defaultLevel: 3, color: 'rgb(224,102,102)' },
            { name: 'impactForce', defaultLevel: 4, color: 'rgb(255,153,0)' },
            { name: 'speed', defaultLevel: 5, color: 'rgb(0,255,255)' },
        ],
    },
};

export default meta;

export const Chart = (args: BarChartProps) => (
    <div
        style={{
            width: '50%',
            height: '300px',
        }}
    >
        <BarChart {...args} />
    </div>
);
