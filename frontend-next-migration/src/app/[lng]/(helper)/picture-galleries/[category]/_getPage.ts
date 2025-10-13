import { createPage } from '@/app/_helpers';
import { PictureGalleryPageProps } from '@/preparedPages/PictureGalleryPages';
import { getServerTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { getRouteGalleryCategoryPage } from '@/shared/appLinks/RoutePaths';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'picture-galleries');

    const name = t(`categories.${category}.name`, category);
    const desc = t(`categories.${category}.description`, t('head-description'));

    // Routes & SEO
    const relPath = getRouteGalleryCategoryPage(encodeURIComponent(category));
    const path = `/${lng}${relPath}`;
    const title = `${name} — ${t('picture-galleries')}`;
    const keywords = `${t('head-keywords')}, ${name}`;

    // OG image: default only (no category-specific image exists)
    const defaultOg = defaultOpenGraph.images?.[0]?.url ?? null;
    const ogUrl = toAbsolute(defaultOg);
    const ogImages = ogUrl
        ? [{ url: ogUrl, alt: `${name} — ${t('picture-galleries')}` }]
        : (defaultOpenGraph.images ?? []);

    return createPage<PictureGalleryPageProps>({
        buildPage: () => ({
            title,
            infoText: t('info-text'),
            socialsText: t('socials-text'),
            socialMediaLinks: [
                AppExternalLinks.igPost1,
                AppExternalLinks.igPost2,
                AppExternalLinks.fbPost1,
            ],
            videoLink: AppExternalLinks.previewVideoYoutube,
        }),
        buildSeo: () => ({
            title,
            description: desc,
            keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'website',
                title,
                description: desc,
                url: path,
                images: ogImages,
            },
            alternates: { canonical: path },
        }),
    });
}
