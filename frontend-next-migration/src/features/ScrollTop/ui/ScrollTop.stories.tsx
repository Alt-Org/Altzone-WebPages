import { StoryObj, Meta } from '@storybook/nextjs';
import React from 'react';
import { ScrollTop } from './ScrollTop';

export default {
    title: 'features/ScrollTop',
    component: ScrollTop,
    args: {
        className: '',
        children: 'UP',
    },
} as Meta<typeof ScrollTop>;

export const Default: StoryObj<typeof ScrollTop> = {
    render: (args) => (
        <>
            <div
                style={{
                    height: '2000px',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '36px',
                    paddingTop: '1rem',
                }}
            >
                Scroll down to see the button
            </div>
            <ScrollTop {...args} />
        </>
    ),
};
