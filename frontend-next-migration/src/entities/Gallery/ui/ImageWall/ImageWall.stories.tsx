import { StoryObj } from '@storybook/react';
import { ImageWall } from './ImageWall';
import { ImageData } from '@/entities/Gallery';

const meta = {
    title: 'entities/Gallery/ImageWall',
    component: ImageWall,
};
export default meta;

type Story = StoryObj<typeof meta>;

const mockImages: ImageData[] = [
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 283,
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 183,
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 283,
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 183,
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 283,
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 183,
    },
];

export const Full: Story = {
    args: {
        images: mockImages,
    },
};

export const Preview: Story = {
    args: {
        images: mockImages,
    },
};
