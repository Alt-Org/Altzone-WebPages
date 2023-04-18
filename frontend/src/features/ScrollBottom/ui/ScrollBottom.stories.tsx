import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScrollBottomButton } from './ScrollBottom';

export default {
    title: 'features/ScrollBottom',
    component: ScrollBottomButton,
    args: {
        className: '',
        children: 'Watch'

    },
} as ComponentMeta<typeof ScrollBottomButton>;

const Template: ComponentStory<typeof ScrollBottomButton> = (args) => {
    return (
        <>
            <div style={{ height: '2000px' , textAlign: 'center', color: "white" , fontSize: '36px' ,paddingTop: '1rem'}}>Scroll down to see the button</div>
            <ScrollBottomButton {...args} />
        </>
    );
};

export const Default = Template.bind({});

