import { Meta, StoryObj } from '@storybook/react';
import { CustomSlider } from './CustomSlider';
import NewsCard from '@/widgets/SectionNewsPreview/ui/NewsCard/NewsCard';

const meta = {
    title: 'shared/ui/CustomSlider',
    component: CustomSlider,
    argTypes: {
        className: {
            control: 'text',
            description:
                'Additional CSS class names to apply to the root container for custom styling.',
            defaultValue: '',
        },
        children: {
            control: 'text',
            description: 'The content of the link.',
            defaultValue: '',
        },
    },
    args: {
        className: '',
        children: '',
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
                    'The `CustomSlider` component is a reusable component that renders a horizontally scrollable container. We use `NewsCard` components in this example so we have something content inside of slider',
            },
        },
    },
} satisfies Meta<typeof CustomSlider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: [
            <div
                style={{ width: '280%' }}
                key={1}
            >
                <NewsCard
                    bodyLength={3000}
                    title={'News 1'}
                    bodyPreview={'Body 1'}
                    date={new Date('2024-01-01')}
                    id={'1'}
                />
            </div>,
            <div
                style={{ width: '280%' }}
                key={2}
            >
                <NewsCard
                    bodyLength={3000}
                    title={'News 2'}
                    bodyPreview={'Body 2'}
                    date={new Date('2024-01-02')}
                    id={'2'}
                />
            </div>,
            <div
                style={{ width: '' }}
                key={3}
            >
                <NewsCard
                    bodyLength={3000}
                    title={'News 3'}
                    bodyPreview={'Body 3'}
                    date={new Date('2024-01-03')}
                    id={'3'}
                />
            </div>,
        ],
    },
};
