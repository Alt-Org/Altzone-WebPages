import { StoryObj } from '@storybook/react';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { SectionGallery } from './SectionGallery';

const meta = {
    title: 'widgets/Gallery/Version2/SectionGallery',
    component: SectionGallery,
};
export default meta;

type Story = StoryObj<typeof meta>;

const mockImages = {
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
    imgae5: {
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

export const Full: Story = {
    args: {
        version: 'full',
        socialMediaLinks: [
            AppExternalLinks.igPost1,
            AppExternalLinks.igPost2,
            AppExternalLinks.fbPost1,
        ],
        mockImages,
    },
};

export const Preview: Story = {
    args: {
        version: 'preview',
        seeMoreLink: {
            href: RoutePaths.PICTURE_GALLERY,
            text: 'See more',
        },
        socialMediaLinks: [
            AppExternalLinks.igPost1,
            AppExternalLinks.igPost2,
            AppExternalLinks.fbPost1,
        ],
        mockImages,
    },
};
