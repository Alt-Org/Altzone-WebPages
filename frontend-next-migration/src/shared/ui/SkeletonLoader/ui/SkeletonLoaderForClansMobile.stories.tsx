import { Meta, StoryObj } from '@storybook/react';
import { SkeletonLoaderForClansMobile } from './SkeletonLoader';

const meta = {
    title: 'shared/ui/SkeletonLoader/SkeletonLoaderForClansMobile',
    component: SkeletonLoaderForClansMobile,
    argTypes: {
        numberOfCards: {
            control: 'number',
            description: 'Number of skeleton cards to render.',
            defaultValue: 10,
        },
        rating: {
            control: 'text',
            description: '"Rating" text for current selected language.',
            defaultValue: '',
        },
        className: {
            control: 'text',
            description:
                'Additional CSS class names to apply to the root container for custom styling.',
            defaultValue: '',
        },
        clan: {
            control: 'text',
            description: '"Clan" text for current selected language.',
            defaultValue: '',
        },
        clanMaster: {
            control: 'text',
            description: '"Clan Master" text for current selected language.',
            defaultValue: '',
        },
        coins: {
            control: 'text',
            description: '"Coins" text for current selected language.',
            defaultValue: '',
        },
        members: {
            control: 'text',
            description: '"Members" text for current selected language.',
            defaultValue: '',
        },
        tag: {
            control: 'text',
            description: '"Tag" text for current selected language.',
            defaultValue: '',
        },
        clansTitle: {
            control: 'text',
            description:
                ' Clans title text for current selected language. For example "All clans".',
            defaultValue: '',
        },
    },
    args: {
        numberOfCards: 10,
        rating: 'Rating',
        className: '',
        clan: 'Clan',
        clanMaster: 'Clan Master',
        coins: 'Coins',
        members: 'Members',
        tag: 'Tag',
        clansTitle: 'All clans',
    },
    tags: ['autodocs'],
    parameters: {
        backgrounds: {
            default: 'dark',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#333333' },
                { name: 'gray', value: '#dddddd' },
            ],
        },
        docs: {
            description: {
                component:
                    'The `SkeletonLoaderForClansMobile` component is designed to display loading animation for ClanAllSubPage when loading clan data and when the page is vieved in mobile size.',
            },
        },
    },
} satisfies Meta<typeof SkeletonLoaderForClansMobile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        numberOfCards: 3,
        rating: 'Rating',
        className: '',
        clan: 'Clan',
        clanMaster: 'Clan Master',
        coins: 'Coins',
        members: 'Members',
        tag: 'Tag',
        clansTitle: 'All clans',
    },
};
