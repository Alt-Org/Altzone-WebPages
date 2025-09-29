import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { getRouteOneNewsPage } from '@/shared/appLinks/RoutePaths';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string, id: string) {
    const { t } = await useServerTranslation(lng, 'news');

    if (!id) {
        notFound();
    }

    // Routes & SEO
    const relPath = getRouteOneNewsPage(encodeURIComponent(id));
    const path = `/${lng}${relPath}`;
    const title = t('head-title');
    const description = t('head-description');
    const keywords = t('head-keywords');

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            title,
            description,
            keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'article',
                title,
                description,
                url: path,
            },
            alternates: { canonical: path },
        }),
    });
}
