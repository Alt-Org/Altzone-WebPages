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
    tags: ['autodocs'],
    argTypes: {
        block: {
            description:
                'An object containing the label, description, link and link text for the Block component.',
        },
    },
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The Block component is used to display individual sections within the Join Us page. Each block presents a labeled section with a brief description and a link. This component is designed to support sections such as "Discord," "Reddit," and "Duunitori" with consistent styling and layout, integrating seamlessly into larger page structures like JoinUsPage',
            },
        },
    },
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
