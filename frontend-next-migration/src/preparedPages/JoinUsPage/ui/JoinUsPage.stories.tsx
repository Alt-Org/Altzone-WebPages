import { StoryObj } from '@storybook/nextjs';
import { JoinUsPage } from './JoinUsPage';
import { BlockSection } from '../types';

const mockDiscordBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    links: [
        {
            text: 'Example Link',
            url: 'https://example.com/',
            isExternal: true,
        },
    ],
    img: 'https://example.com/image.png',
};

const mockTeachersBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    links: [
        {
            text: 'Open link',
            url: 'https://example.com/',
            isExternal: true,
        },
    ],
    img: 'https://example.com/image.png',
};

const mockFeedbackBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    links: [
        {
            text: 'Open link',
            url: 'https://example.com/',
            isExternal: true,
        },
    ],
    img: 'https://example.com/image.png',
};

const mockDuunitoriBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    links: [
        {
            text: 'Open link',
            url: 'https://example.com/',
            isExternal: true,
        },
    ],
    img: 'https://example.com/image.png',
};

const mockInstagramBlock: BlockSection = {
    label: 'Label',
    description: 'Description here',
    links: [
        {
            text: 'Open link',
            url: 'https://example.com/',
            isExternal: true,
        },
    ],
    img: 'https://example.com/image.png',
};

const mockConnectionBlock: BlockSection = {
    label: 'Connection Label',
    description: 'Connection description here',
    links: [
        {
            text: 'Connection Link',
            url: 'https://example.com/',
            isExternal: true,
        },
    ],
    img: 'https://example.com/connection-image.png',
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
    connectionBlock: mockConnectionBlock,
    instagramBlock: mockInstagramBlock,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Join Us!',
        discordBlock: mockDiscordBlock,
        // redditBlock: mockRedditBlock,
        teachersBlock: mockTeachersBlock,
        feedbackBlock: mockFeedbackBlock,
        duunitoriBlock: mockDuunitoriBlock,
        connectionBlock: mockConnectionBlock,
        instagramBlock: mockInstagramBlock,
    },
    parameters: {
        layout: 'fullscreen',
    },
};
