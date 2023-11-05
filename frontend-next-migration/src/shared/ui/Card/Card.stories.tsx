import React from "react";
import { Card } from "./Card";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: "shared/Button",
    component: Card,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Card>;


const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
