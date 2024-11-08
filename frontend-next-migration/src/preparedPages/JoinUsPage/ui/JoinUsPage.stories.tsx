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
    label: 'label',
    description: 'Description here',
    link: 'https://example.com/',
    linkText: 'Open link',
};

const meta = {
    title: 'pages/JoinUsPage',
    component: JoinUsPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Join Us',
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
