import { StoryObj } from '@storybook/react';
import { mockImagesFull, mockImagesPreview, ImageWall } from '@/entities/Gallery';

const meta = {
    title: 'entities/Gallery/ImageWall',
    component: ImageWall,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {
    args: {
        images: mockImagesFull,
        version: 'full',
    },
};

export const Preview: Story = {
    args: {
        images: mockImagesPreview,
        version: 'preview',
    },
};
