import { StoryObj, Meta } from '@storybook/react';
import { MasonryWrapper } from './MasonryWrapper';
import Image from 'next/image';

const meta: Meta<typeof MasonryWrapper> = {
    title: 'shared/MasonryWrapper',
    component: MasonryWrapper,
};
export default meta;

type Story = StoryObj<typeof meta>;

const mockImages: Record<string, { src: string; width: number; height: number }> = {
    image1: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    image2: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 283,
    },
    image3: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    image4: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 183,
    },
    image5: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    image6: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 283,
    },
    image7: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    image8: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 183,
    },
    image9: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    image10: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 283,
    },
    image11: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/PlaceholderLC.png',
        width: 275,
        height: 275,
    },
    image12: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s',
        width: 275,
        height: 183,
    },
};

export const Default: Story = {
    render: () => (
        <MasonryWrapper>
            {Object.keys(mockImages).map((key) => (
                <div
                    key={key}
                    style={{ margin: '10px' }}
                >
                    <Image
                        src={mockImages[key].src}
                        alt={`Image ${key}`}
                        width={mockImages[key].width}
                        height={mockImages[key].height}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            ))}
        </MasonryWrapper>
    ),
};
