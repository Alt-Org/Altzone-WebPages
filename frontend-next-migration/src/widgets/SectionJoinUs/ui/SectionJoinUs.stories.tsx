import { StoryObj } from '@storybook/react';
import { SectionJoinUs } from './SectionJoinUs';
import { BlockSection } from '../types';

const mockBlock: BlockSection[] = [
    {
        label: 'Block label',
        description: 'A block with unique content.',
        link: 'https://example.com/',
        linkText: 'Discover More',
    },
];

const meta = {
    title: 'widgets/JoinUs/SectionJoinUs',
    component: SectionJoinUs,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        blocks: mockBlock,
    },
    parameters: {
        layout: 'centered',
    },
};
