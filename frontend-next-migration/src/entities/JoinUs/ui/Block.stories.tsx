import { StoryObj } from '@storybook/react';
import { Block } from './Block';
import { BlockSection } from '../types';

const mockBlock: BlockSection = {
    label: 'Block Label',
    description: 'A description for this section',
    link: 'https://example.com',
    linkText: 'More details',
};

const meta = {
    title: 'entities/JoinUs/Block',
    component: Block,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        block: mockBlock,
    },
    parameters: {
        layout: 'centered',
    },
};
