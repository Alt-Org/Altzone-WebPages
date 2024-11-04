import { Meta, StoryObj } from '@storybook/react';
import { Card, CardTheme } from './Card'; // Import your component

const meta = {
    title: 'shared/ui/Card',
    component: Card,
    argTypes: {
        className: {
            control: 'text',
            description: 'Additional CSS class names to apply for custom styling.',
            defaultValue: '',
        },
        theme: {
            control: { type: 'select', options: Object.values(CardTheme) },
            description: 'Theme for the Card.',
            defaultValue: CardTheme.PRIMARY,
        },
        children: {
            control: 'text',
            description: 'The content inside the Card.',
        },
    },
    args: {
        className: '',
        theme: CardTheme.PRIMARY,
        children: 'Card Content',
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
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The `Card` component is a versatile container with customizable subcomponents for Title, Body, Date, and ReadMoreLink.',
            },
        },
    },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: 'customClass',
        theme: CardTheme.PRIMARY,
        children: [
            <Card.Title key={1}>Card Title</Card.Title>,
            <Card.Body key={2}>Card Body</Card.Body>,
            <Card.Date key={3}>2023-10-01</Card.Date>,
            <Card.ReadMoreLink
                key={4}
                path="/details"
                withScalableLink
            >
                Read More
            </Card.ReadMoreLink>,
        ],
    },
};

export const WithCustomLink: Story = {
    args: {
        className: 'customClass',
        theme: CardTheme.PRIMARY,
        children: (
            <>
                <Card.Title>Another Card</Card.Title>
                <Card.Body>This is another example of card content.</Card.Body>
                <Card.Date>2023-11-05</Card.Date>
                <Card.ReadMoreLink
                    path="https://example.com"
                    isExternal
                >
                    Visit External Link
                </Card.ReadMoreLink>
            </>
        ),
    },
};
