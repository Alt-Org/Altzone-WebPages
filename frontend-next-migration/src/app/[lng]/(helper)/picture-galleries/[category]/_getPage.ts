import { createPage } from '@/app/_helpers';
import { PictureGalleryPageProps } from '@/preparedPages/PictureGalleryPages';
import { useServerTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { getRouteGalleryCategoryPage } from '@/shared/appLinks/RoutePaths';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string, category: string) {
    const { t } = await useServerTranslation(lng, 'picture-galleries');

    const categoryName = t(`categories.${category}.name`, category);
    const categoryDesc = t(`categories.${category}.description`, t('head-description'));

    const relPath = getRouteGalleryCategoryPage(encodeURIComponent(category));
    const path = `/${lng}${relPath}`;

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
                openGraph: {
                    ...defaultOpenGraph,
                    type: 'website',
                    title,
                    description: categoryDesc,
                    url: path,
                },
                alternates: { canonical: path },
            };
        },
    });
}
