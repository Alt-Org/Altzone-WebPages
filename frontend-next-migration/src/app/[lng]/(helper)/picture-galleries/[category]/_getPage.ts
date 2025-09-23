import { createPage } from '@/app/_helpers';
import { PictureGalleryPageProps } from '@/preparedPages/PictureGalleryPages';
import { useServerTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { baseUrl } from '@/shared/seoConstants';

export async function _getPage(lng: string, category: string) {
    const { t } = await useServerTranslation(lng, 'picture-galleries');

    const categoryName = t(`categories.${category}.name`, category);
    const categoryDesc = t(`categories.${category}.description`, t('head-description'));

    const path = `/${lng}/picture-galleries/${category}`;
    const imagePath = '/images/opengraph-image.png';
    const imageAbs = `${baseUrl}${imagePath}`;

    return createPage<PictureGalleryPageProps>({
        buildPage: () => ({
            title: categoryName,
            infoText: t('info-text'),
            socialsText: t('socials-text'),
            socialMediaLinks: [
                AppExternalLinks.igPost1,
                AppExternalLinks.igPost2,
                AppExternalLinks.fbPost1,
            ],
            videoLink: AppExternalLinks.previewVideoYoutube,
        }),
        buildSeo: () => {
            const title = `${categoryName} — ${t('picture-galleries')}`;
            return {
                title,
                description: categoryDesc,
                keywords: `${categoryName}, ${t('head-keywords')}`,
                alternates: { canonical: path },
                openGraph: {
                    type: 'website',
                    title,
                    description: categoryDesc,
                    url: path,
                    images: [{ url: imageAbs, width: 1200, height: 630 }],
                },
            };
        },
    });
}
