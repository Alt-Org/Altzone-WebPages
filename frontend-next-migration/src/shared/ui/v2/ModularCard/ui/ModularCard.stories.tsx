import { Meta, StoryObj } from '@storybook/react';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import ModularCard, { ModularCardTheme } from './ModularCard'; // Import your component

const meta = {
    title: 'shared/ui/v2/ModularCard',
    component: ModularCard,
    argTypes: {
        className: {
            control: 'text',
            description: 'Additional CSS class names to apply for custom styling.',
            defaultValue: '',
        },
        theme: {
            control: { type: 'select', options: Object.values(ModularCardTheme) },
            description: 'Theme for the Card.',
            defaultValue: ModularCardTheme.PRIMARY,
        },
        path: {
            control: 'text',
            description: 'URL to navigate to when the link is clicked.',
            defaultValue: undefined,
        },
        isExternal: {
            control: 'boolean',
            description: 'Whether the link is an external link.',
            defaultValue: false,
        },
        withScalableLink: {
            control: 'boolean',
            description: 'If true, applies scalable link behavior to the button.',
            defaultValue: false,
        },
        children: {
            control: 'text',
            description: 'The content inside the Card.',
        },
    },
    args: {
        className: '',
        theme: ModularCardTheme.PRIMARY,
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
} satisfies Meta<typeof ModularCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: 'customClass',
        theme: ModularCardTheme.NEWSCARD,
        path: '/details',
        withScalableLink: true,
        children: (
            <>
                <ModularCard.Texts>
                    <ModularCard.Texts.Title>
                        Hello HelloHello Hello HelloHello
                    </ModularCard.Texts.Title>
                    <ModularCard.Texts.Body>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni assumenda,
                        perspiciatis quidem neque minus, aperiam a reiciendis nesciunt ea
                        perferendis quisquam explicabo reprehenderit consequatur? Eligendi vel
                        tenetur molestias corporis! Ab! molestias corporis! Ab! molestias corporis!
                        Ab! molestias corporis! Ab! molestias corporis! Ab! explicabo reprehenderit
                        consequatur? Eligendi vel tenetur molestias corporis! Ab! molestias
                        corporis! Ab! molestias corporis! Ab! molestias corporis! Ab! molestias
                        corporis! Ab!
                    </ModularCard.Texts.Body>
                    <ModularCard.Texts.Footnote>22.1.2025 11.27</ModularCard.Texts.Footnote>
                </ModularCard.Texts>
                <ModularCard.Image>
                    <ModularCard.Image.Triangle />
                    <ModularCard.Image.Image
                        className=""
                        src={hannu}
                        alt="hannu"
                    />
                </ModularCard.Image>
            </>
        ),
    },
};

export const TitleImage: Story = {
    args: {
        className: 'customClass',
        theme: ModularCardTheme.TITLEIMAGE,
        path: 'https://altzone.fi',
        isExternal: true,
        withScalableLink: true,
        children: (
            <>
                <ModularCard.Texts>
                    <ModularCard.Texts.Title>Hello</ModularCard.Texts.Title>
                </ModularCard.Texts>
                <ModularCard.Image>
                    <ModularCard.Image.Triangle />
                    <ModularCard.Image.Image
                        className=""
                        src={hannu}
                        alt="hannu"
                    />
                </ModularCard.Image>
            </>
        ),
    },
};
