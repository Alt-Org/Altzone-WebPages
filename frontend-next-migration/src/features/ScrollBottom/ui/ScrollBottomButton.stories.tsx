import { StoryObj, Meta } from '@storybook/nextjs';
import React from 'react';
import { ScrollBottomButton } from './ScrollBottomButton';

export default {
    title: 'features/ScrollBottom',
    component: ScrollBottomButton,
    args: {
        className: '',
    },
} as Meta<typeof ScrollBottomButton>;

export const Default: StoryObj<typeof ScrollBottomButton> = {
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
            <ScrollBottomButton {...args} />
        </>
    ),
};
