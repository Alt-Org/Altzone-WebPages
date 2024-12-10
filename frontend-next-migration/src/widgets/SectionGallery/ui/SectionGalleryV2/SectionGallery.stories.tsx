import { StoryObj } from '@storybook/react';
import { getRouteGalleryPage } from '@/shared/appLinks/RoutePaths';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { SectionGallery } from './SectionGallery';
import { mockImagesFull, mockImagesPreview } from '@/entities/Gallery';

const meta = {
    title: 'widgets/Gallery/Version2/SectionGallery',
    component: SectionGallery,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {
    args: {
        version: 'full',
        socialMediaLinks: [
            AppExternalLinks.igPost1,
            AppExternalLinks.igPost2,
            AppExternalLinks.fbPost1,
        ],
        images: mockImagesFull,
    },
};

export const Preview: Story = {
    args: {
        version: 'preview',
        seeMoreLink: {
            href: getRouteGalleryPage(),
            text: 'See more',
        },
        socialMediaLinks: [
            AppExternalLinks.igPost1,
            AppExternalLinks.igPost2,
            AppExternalLinks.fbPost1,
        ],
        images: mockImagesPreview,
    },
};
