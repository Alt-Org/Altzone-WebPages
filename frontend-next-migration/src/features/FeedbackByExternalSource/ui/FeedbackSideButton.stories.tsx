import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { FeedbackSideButton } from "./FeedbackSideButton";

export default {
    title: 'features/FeedbackByExternalSource/SideButton',
    component: FeedbackSideButton,
    args: {
        className: '',

    },
} as ComponentMeta<typeof FeedbackSideButton>;

const Template: ComponentStory<typeof FeedbackSideButton> = () => {
    return (
        <>
            {/*<div style={{ height: '2000px' , textAlign: 'center', color: "white" , fontSize: '36px' ,paddingTop: '1rem'}}></div>*/}
            <FeedbackSideButton/>
        </>
    );
};

export const Default = Template.bind({});

