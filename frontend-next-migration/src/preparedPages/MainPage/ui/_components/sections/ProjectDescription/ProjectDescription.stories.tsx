import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProjectDescription } from './index';

export default {
    title: 'widgets/DescriptionWithNav/Main',
    component: ProjectDescription,
} as ComponentMeta<typeof ProjectDescription>;

const Template: ComponentStory<typeof ProjectDescription> = (args) => <ProjectDescription {...args} />;

export const Default = Template.bind({});
Default.args = {};
