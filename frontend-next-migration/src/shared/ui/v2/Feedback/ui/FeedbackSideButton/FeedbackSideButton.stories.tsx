import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { default as FeedbackSideButton } from './FeedbackSideButton';

export default {
    title: 'features/v2/FeedbackByExternalSource/SideButton',
    component: FeedbackSideButton,
    args: {
        className: '',
    },
} as ComponentMeta<typeof FeedbackSideButton>;

const Template: ComponentStory<typeof FeedbackSideButton> = () => {
    return (
        <>
            {/*<div style={{ height: '2000px' , textAlign: 'center', color: "white" , fontSize: '36px' ,paddingTop: '1rem'}}></div>*/}
            <FeedbackSideButton />
        </>
    );
};

export const Default = Template.bind({});
