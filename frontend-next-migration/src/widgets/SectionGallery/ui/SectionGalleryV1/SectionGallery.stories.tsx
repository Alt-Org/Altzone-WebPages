import { StoryObj } from '@storybook/react';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { SectionGallery } from './SectionGallery';

const meta = {
    title: 'widgets/Gallery/Version1/SectionGallery',
    component: SectionGallery,
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {
    args: {
        socialMediaLinks: [
            AppExternalLinks.igPost1,
            AppExternalLinks.igPost2,
            AppExternalLinks.fbPost1,
        ],
        videoLink: AppExternalLinks.previewVideoYoutube,
    },
};

export const Preview: Story = {
    args: {
        socialMediaLinks: [
            AppExternalLinks.igPost1,
            AppExternalLinks.igPost2,
            AppExternalLinks.fbPost1,
        ],
        videoLink: AppExternalLinks.previewVideoYoutube,
        seeMoreLink: {
            text: 'See more',
            href: RoutePaths.PICTURE_GALLERY,
        },
    },
};
