import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { ScrollTop } from './ScrollTop';

export default {
    title: 'features/ScrollTopV2',
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
            <div
                style={{
                    backgroundColor: '#FFA100',
                    color: 'white',
                    fontSize: '50px',
                    textAlign: 'center',
                    borderRadius: '15px',
                    opacity: '0.1',
                    position: 'fixed',
                    right: '32px',
                    bottom: '32px',
                    width: '70px',
                    height: '70px',
                }}
            >
                &#9743;
            </div>
        </>
    );
};

export const Default = Template.bind({});
