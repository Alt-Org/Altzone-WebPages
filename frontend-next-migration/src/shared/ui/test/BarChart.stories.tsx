import React from 'react';
import BarChart from './BarChart';
import { Meta, StoryFn } from '@storybook/react';

export default {
    title: 'shared/ui/BarChart',
    component: BarChart,
    parameters: {
        layout: 'fullscreen',
    },
} as Meta;

const Template: StoryFn<typeof BarChart> = (args) => (
    <div style={{ width: '100%', height: '100%' }}>
        <BarChart {...args} />
    </div>
);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    return `#${Array.from({ length: 6 })
        .map(() => letters[Math.floor(Math.random() * 16)])
        .join('')}`;
};

export const Default = Template.bind({});
Default.args = {
    data: [
        { value: 10, color: 'red' },
        { value: 40, color: 'green' },
        { value: 25, color: 'blue' },
        { value: 60, color: 'orange' },
        { value: 90, color: 'purple' },
        { value: 75, color: 'teal' },
    ],
};

export const LargeDataset = Template.bind({});
LargeDataset.args = {
    data: Array.from({ length: 20 }, (_, i) => ({
        value: Math.random() * 100,
        color: getRandomColor(),
    })),
};

export const SmallDataset = Template.bind({});
SmallDataset.args = {
    data: [
        { value: 10, color: 'pink' },
        { value: 20, color: 'cyan' },
    ],
};
