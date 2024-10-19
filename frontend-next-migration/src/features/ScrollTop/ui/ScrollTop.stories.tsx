import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ScrollTop } from './ScrollTop';

export default {
    title: 'features/ScrollTop',
    component: ScrollTop,
    args: {
        className: '',
        children: 'UP',
    },
} as ComponentMeta<typeof ScrollTop>;

const Template: ComponentStory<typeof ScrollTop> = (args) => {
    return (
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
    );
};

export const Default = Template.bind({});
