import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import FeedbackCard from './FeedbackCard';

export default {
    title: 'features/feedback/FeedbackCard',
    component: FeedbackCard,
    args: {
        className: '',
    },
} as ComponentMeta<typeof FeedbackCard>;

const Template: ComponentStory<typeof FeedbackCard> = () => {
    return (
        <>
            {/*<div style={{ height: '2000px' , textAlign: 'center', color: "white" , fontSize: '36px' ,paddingTop: '1rem'}}></div>*/}
            <FeedbackCard />
        </>
    );
};

export const Default = Template.bind({});
