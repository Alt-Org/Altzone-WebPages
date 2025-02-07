import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import FeedbackCard from './FeedbackCard';

//line 70 in FeedbackCard causes issues in stories: "<h3 className={`${cls.feedbackTitle} ${sedgwickFont.className}`}>{t('title')}</h3>"
//remove ${sedgwickFont.className} to continue
export default {
    title: 'features/v2/feedback/FeedbackCard',
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
