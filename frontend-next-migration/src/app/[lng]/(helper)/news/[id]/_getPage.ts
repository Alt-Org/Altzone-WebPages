import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { notFound } from 'next/navigation';
import { getRouteOneNewsPage } from '@/shared/appLinks/RoutePaths';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';

const toAbsolute = (src?: string | null) =>
    !src ? null : /^https?:\/\//i.test(src) ? src : `${baseUrl}${src}`;

// Normalize Directus host (strip trailing slashes). Falls back to empty if not set.
const HOST = (process.env.NEXT_PUBLIC_DIRECTUS_HOST || process.env.DIRECTUS_HOST || '').replace(
    /\/+$/,
    '',
);

// Tiny helper: fetch just the metadata we need for SEO (title, preview, OG image).
// Keeps the client UI logic separate; this is server-only and fast.
async function fetchNewsMeta(id: string, lng: string) {
    if (!HOST) return null;

    const url = new URL(`${HOST}/items/news/${id}`);
    // Ask Directus only for the fields we actually use in SEO → smaller payload, quicker render.
    url.searchParams.set(
        'fields',
        'translations.languages_code,translations.title,translations.preview_text,titlePicture.id',
    );

    try {
        const res = await fetch(url.toString(), { cache: 'no-store' });
        if (!res.ok) return null;

        const data = (await res.json())?.data as any;
        if (!data) return null;

        const want = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;
        const tr =
            data.translations?.find((t: any) => t.languages_code === want) ??
            data.translations?.[0];

        return {
            title: tr?.title,
            description: tr?.preview_text,
            imageUrl: data.titlePicture?.id ? `${HOST}/assets/${data.titlePicture.id}` : undefined,
        };
    } catch {
        // Silent fallback to defaults if Directus is down or the item is missing.
        return null;
    }
}

export async function _getPage(lng: string, id: string) {
    if (!id) notFound();
    const { t } = await useServerTranslation(lng, 'news');

    // Routes & SEO
    const relPath = getRouteOneNewsPage(encodeURIComponent(id));
    const path = `/${lng}${relPath}`;

    const meta = await fetchNewsMeta(id, lng);

    const title = meta?.title ?? t('head-title');
    const description = meta?.description ?? t('head-description');
    const keywords = t('head-keywords');

    const ogUrl = toAbsolute(meta?.imageUrl ?? defaultOpenGraph.images?.[0]?.url ?? null);
    const ogImages = ogUrl
        ? [{ url: ogUrl, alt: `${title} — ${t('head-title')}` }]
        : (defaultOpenGraph.images ?? []);

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
                images: ogImages,
            },
            alternates: { canonical: path },
        }),
    });
}
