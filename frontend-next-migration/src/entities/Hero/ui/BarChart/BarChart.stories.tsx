import { Meta } from '@storybook/react';
import React from 'react';
import { BarChart, BarChartProps } from './BarChart';

const meta: Meta<typeof BarChart> = {
    title: '@/entities/Hero/ui/BarChart/BarChart',
    component: BarChart,
    argTypes: {
        width: {
            description: 'width of bar chart',
        },
        height: {
            description: 'height of bar chart',
        },
        stats: {
            description: 'stats',
        },
    },
    args: {
        width: 400,
        height: 230,
        stats: {
            resistance: 3,
            hp: 4,
            size: 7,
            impactForce: 5,
            speed: 3,
        },
    },
    tags: ['autodocs'],
};

export default meta;

export const Chart = (args: BarChartProps) => <BarChart {...args} />;
