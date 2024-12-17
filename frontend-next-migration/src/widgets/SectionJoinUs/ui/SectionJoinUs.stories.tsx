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
    {
        label: 'Block label',
        description: 'A block with unique content.',
        link: 'https://example.com/',
        linkText: 'Discover More',
    },
    {
        label: 'Block label',
        description: 'A block with unique content.',
        link: 'https://example.com/',
        linkText: 'Discover More',
    },
    {
        label: 'Block label',
        description: 'A block with unique content.',
        link: 'https://example.com/',
        linkText: 'Discover More',
    },
    {
        label: 'Block label',
        description: 'A block with unique content.',
        link: 'https://example.com/',
        linkText: 'Discover More',
    },
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
    tags: ['autodocs'],
    argTypes: {
        blocks: {
            description: 'An array of BlockSection objects.',
        },
    },
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The SectionJoinUs component organizes and displays a series of Block components in a structured layout, with each block representing an individual section within the Join Us page.',
            },
        },
    },
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
