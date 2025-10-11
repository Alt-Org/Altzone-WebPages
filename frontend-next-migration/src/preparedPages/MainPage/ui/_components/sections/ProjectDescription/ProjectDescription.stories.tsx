import { Meta, StoryObj } from '@storybook/nextjs';
import { ProjectDescription } from './index';

export default {
    title: 'widgets/DescriptionWithNav/Main',
    component: ProjectDescription,
} as Meta<typeof ProjectDescription>;

export const Default: StoryObj<typeof ProjectDescription> = {};
