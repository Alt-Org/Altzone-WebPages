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
            <NewsCard
                bodyLength={3000}
                key={1}
                title={'News 1'}
                bodyPreview={'Body 1'}
                date={new Date('2024-01-01')}
                id={'1'}
            />,

            <NewsCard
                bodyLength={3000}
                key={2}
                title={'News 2'}
                bodyPreview={'Body 2'}
                date={new Date('2024-01-02')}
                id={'2'}
            />,

            <NewsCard
                bodyLength={3000}
                key={3}
                title={'News 3'}
                bodyPreview={'Body 3'}
                date={new Date('2024-01-03')}
                id={'3'}
            />,
        ],
    },
};
