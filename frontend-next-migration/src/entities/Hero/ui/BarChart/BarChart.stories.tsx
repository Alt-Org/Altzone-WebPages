import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BarChart, BarChartProps } from './BarChart';

type StoryBookProps = BarChartProps & {
    width: string;
    height: number;
};

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
                value: 1,
                color: 'rgb(153,0,255)',
            },
            { name: 'hp', value: 2, color: 'rgb(0,255,0)' },
            { name: 'size', value: 3, color: 'rgb(224,102,102)' },
            { name: 'impactForce', value: 4, color: 'rgb(255,153,0)' },
            { name: 'speed', value: 5, color: 'rgb(0,255,255)' },
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