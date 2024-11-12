import { StoryObj } from '@storybook/react';
import { JoinUsPage } from './JoinUsPage';
import { BlockSection } from '../types';

const mockDiscordBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    link: 'https://example.com/',
    linkText: 'Open link',
};

const mockRedditBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    link: 'https://example.com/',
    linkText: 'Open link',
};

const mockTeachersBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    link: 'https://example.com/',
    linkText: 'Open link',
};

const mockFeedbackBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    link: 'https://example.com/',
    linkText: 'Open link',
};

const mockDuunitoriBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    link: 'https://example.com/',
    linkText: 'Open link',
};

const mockInstagramBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    link: 'https://example.com/',
    linkText: 'Open link',
};

const meta = {
    title: 'pages/JoinUsPage',
    component: JoinUsPage,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The JoinUsPage component is a page layout that includes a customizable title and multiple Block components for different information sections. It is designed to consolidate key onboarding information, such as community links and job requirements, into a single, visually cohesive page.',
            },
        },
    },
    argTypes: {
        title: {
            description: 'Title for the page',
        },
        discordBlock: {
            description: 'An object that contains information about Discord.',
        },
        redditBlock: {
            description: 'An object that contains information about Reddit.',
        },
        teachersBlock: {
            description:
                'An object that contains information about the teaching package for teachers.',
        },
        feedbackBlock: {
            description: 'An object that contains the feedback form',
        },
        duunitoriBlock: {
            description: 'An object that contains information about Duunitori.',
        },
        instagramBlock: {
            description: 'An object that contains the Alt Zones Instagram account.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Join Us!',
        discordBlock: mockDiscordBlock,
        redditBlock: mockRedditBlock,
        teachersBlock: mockTeachersBlock,
        feedbackBlock: mockFeedbackBlock,
        duunitoriBlock: mockDuunitoriBlock,
        instagramBlock: mockInstagramBlock,
    },
    parameters: {
        layout: 'fullscreen',
    },
};
