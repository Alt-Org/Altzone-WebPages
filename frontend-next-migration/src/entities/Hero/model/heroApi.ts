/**
 * Hero API (Directus) — resilient mapping with locale filtering (normalized locales)
 */

import { directusApi } from '@/shared/api/directusApi';
import { envHelper } from '@/shared/const/envHelper';
import type {
    HeroWithGroup,
    HeroGroup,
    HeroSlug,
    Stat,
    GroupInfo,
} from '@/entities/Hero/types/hero';
import type { StaticImageData } from 'next/image';
import { groupHeroesByGroup } from './groupHeroesByGroup';

export type Locale = 'en' | 'fi' | 'ru';

const HERO_TR_KEYS = ['translations'] as const;
const GROUP_TR_KEYS = ['translations'] as const;
const HERO_IMG_KEYS = ['srcImg'] as const;
const HERO_GIF_KEYS = ['srcGif'] as const;
const GROUP_IMG_KEYS = ['srcImg'] as const;
const GROUP_LABEL_KEYS = ['label'] as const;
const STATS_KEYS = ['stats'] as const;

const ASSET = (id?: string) =>
    id ? `${(envHelper.directusHost || '').replace(/\/$/, '')}/assets/${id}` : '';
const languageCode = (locale: Locale): string => locale;

function pickTranslationByLocale<T extends { languages_code?: string }>(
    arr: T[] | undefined,
    locale: Locale,
): T | undefined {
    if (!arr?.length) return undefined;
    return arr.find((t) => t?.languages_code === languageCode(locale)) ?? arr[0];
}

const FIELDS = [
    'id',
    'slug',
    'order',
    ...HERO_IMG_KEYS.flatMap((key) => [`${key}.id`, `${key}.width`, `${key}.height`]),
    ...HERO_GIF_KEYS.flatMap((key) => [`${key}.id`, `${key}.width`, `${key}.height`]),
    ...HERO_TR_KEYS.flatMap((key) => [
        `${key}.languages_code`,
        `${key}.title`,
        `${key}.description`,
        `${key}.alt`,
        `${key}.altGif`,
    ]),
    'group.id',
    'group.key',
    'group.bgColour',
    ...GROUP_IMG_KEYS.flatMap((key) => [
        `group.${key}.id`,
        `group.${key}.width`,
        `group.${key}.height`,
    ]),
    ...GROUP_LABEL_KEYS.flatMap((key) => [
        `group.${key}.id`,
        `group.${key}.width`,
        `group.${key}.height`,
    ]),
    ...GROUP_TR_KEYS.flatMap((key) => [
        `group.${key}.languages_code`,
        `group.${key}.name`,
        `group.${key}.description`,
    ]),
    ...STATS_KEYS.flatMap((key) => [
        `${key}.name`,
        `${key}.rarityClass`,
        `${key}.defaultLevel`,
        `${key}.developmentLevel`,
        `${key}.order`,
    ]),
].join(',');

const firstKey = (obj: any, keys: readonly string[]) =>
    keys.find((key) => key && obj?.[key] !== undefined);
const firstArray = (obj: any, keys: readonly string[]) =>
    (keys
        .filter(Boolean)
        .map((key) => obj?.[key])
        .find((value) => Array.isArray(value)) as any[]) || [];
const mkStaticImage = (id?: string, width?: number, height?: number): StaticImageData | '' =>
    id
        ? ({ src: ASSET(id), width: width || 1, height: height || 1 } as unknown as StaticImageData)
        : '';

const mapRarityClass = (val: number | string | undefined): string =>
    typeof val === 'number' ? ({ 0: 'common', 1: 'rare', 2: 'epic' }[val] ?? '') : (val ?? '');

// eslint-disable-next-line complexity
function mapHero(item: any, locale: Locale): HeroWithGroup {
    // translations
    const heroTranslationsArr = firstArray(item, HERO_TR_KEYS);
    const groupTranslationsArr = firstArray(item?.group ?? {}, GROUP_TR_KEYS);

    const heroTr = pickTranslationByLocale(heroTranslationsArr, locale) ?? {};
    const groupTr = pickTranslationByLocale(groupTranslationsArr, locale) ?? {};

    // hero images
    const heroImgKey = firstKey(item, HERO_IMG_KEYS);
    const heroGifKey = firstKey(item, HERO_GIF_KEYS);
    const heroImgMeta = heroImgKey ? item?.[heroImgKey] : undefined;
    const heroGifMeta = heroGifKey ? item?.[heroGifKey] : undefined;

    const srcImg = mkStaticImage(heroImgMeta?.id, heroImgMeta?.width, heroImgMeta?.height);
    const srcGif = mkStaticImage(heroGifMeta?.id, heroGifMeta?.width, heroGifMeta?.height);

    // group images
    const groupImgKey = firstKey(item?.group ?? {}, GROUP_IMG_KEYS);
    const groupLabelKey = firstKey(item?.group ?? {}, GROUP_LABEL_KEYS);
    const groupImgMeta = groupImgKey ? item?.group?.[groupImgKey] : undefined;
    const groupLabelMeta = groupLabelKey ? item?.group?.[groupLabelKey] : undefined;

    const groupSrcImg = mkStaticImage(groupImgMeta?.id, groupImgMeta?.width, groupImgMeta?.height);
    const groupLabel = mkStaticImage(
        groupLabelMeta?.id,
        groupLabelMeta?.width,
        groupLabelMeta?.height,
    );

    // stats
    const statsArr = firstArray(item, STATS_KEYS);
    const stats: Stat[] = (statsArr || [])
        .slice()
        .sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0))
        .map((statItem: any) => ({
            name: statItem?.name,
            rarityClass: statItem?.rarityClass,
            defaultLevel: statItem?.defaultLevel,
            developmentLevel: statItem?.developmentLevel ?? undefined,
        }));

    const group: GroupInfo = {
        name: groupTr?.name ?? item?.group?.key ?? 'UNKNOWN',
        description: groupTr?.description ?? '',
        bgColour: item?.group?.bgColour ?? '#000',
        srcImg: groupSrcImg,
        label: groupLabel,
        heroes: [],
    };

    return {
        id: item.id,
        slug: item.slug as HeroSlug,
        srcImg,
        srcGif,
        alt: heroTr?.alt ?? '',
        altGif: heroTr?.altGif ?? '',
        title: heroTr?.title ?? item.slug,
        description: heroTr?.description ?? '',
        rarityClass: mapRarityClass(item.rarityClass), // TODO: Fetch from heroes_stats collection if needed
        stats,
        groupEnum: (item?.group?.key as HeroGroup) ?? 'RETROFLECTOR',
        groupName: group.name,
        groupDescription: group.description,
        groupBgColour: group.bgColour,
        groupLabel: group.label,
    };
}

function buildParams(locale: Locale, options?: { slug?: string; limit?: string }) {
    const params = new URLSearchParams();
    if (options?.slug) params.set('filter[slug][_eq]', options.slug);
    if (options?.limit) params.set('limit', options.limit);
    params.set('fields', FIELDS);
    params.set('sort', 'order');
    for (const key of HERO_TR_KEYS) {
        params.set(`deep[${key}][filter][languages_code][_eq]`, languageCode(locale));
    }
    for (const key of GROUP_TR_KEYS) {
        params.set(`deep[group][${key}][filter][languages_code][_eq]`, languageCode(locale));
    }
    return params;
}

export const heroApi = directusApi.injectEndpoints({
    endpoints: (build) => ({
        getHeroBySlug: build.query<HeroWithGroup | undefined, { slug: HeroSlug; locale?: Locale }>({
            query: ({ slug, locale = 'en' }) => ({
                url: `/items/heroes?${buildParams(locale, { slug, limit: '1' }).toString()}`,
            }),
            transformResponse: (resp: any, _meta, args) => {
                const item = resp?.data?.[0];
                return item ? mapHero(item, (args?.locale ?? 'en') as Locale) : undefined;
            },
            providesTags: (_res, _err, args) => [{ type: 'Hero' as const, id: args.slug }],
        }),
        getAllHeroes: build.query<HeroWithGroup[], { locale?: Locale }>({
            query: ({ locale = 'en' }) => ({
                url: `/items/heroes?${buildParams(locale, { limit: '-1' }).toString()}`,
            }),
            transformResponse: (resp: any, _meta, args) => {
                const items = resp?.data || [];
                return items.map((item: any) => mapHero(item, (args?.locale ?? 'en') as Locale));
            },
            providesTags: () => [{ type: 'Hero' as const, id: 'LIST' }],
        }),
        getHeroGroups: build.query<Record<HeroGroup, GroupInfo>, { locale?: Locale }>({
            query: ({ locale = 'en' }) => ({
                url: `/items/heroes?${buildParams(locale, { limit: '-1' }).toString()}`,
            }),
            transformResponse: (resp: any, _meta, args) => {
                const items = resp?.data || [];
                if (items.length === 0) {
                    // eslint-disable-next-line no-console
                    console.warn('[getHeroGroups] Directus returned empty array');
                    return {} as Record<HeroGroup, GroupInfo>;
                }
                const heroes = items.map((item: any) =>
                    mapHero(item, (args?.locale ?? 'en') as Locale),
                );
                return groupHeroesByGroup(heroes);
            },
            providesTags: () => [{ type: 'Hero' as const, id: 'GROUPS' }],
        }),
    }),
});

export const { useGetHeroBySlugQuery, useGetAllHeroesQuery, useGetHeroGroupsQuery } = heroApi;

export async function fetchHeroBySlug(
    slug: HeroSlug,
    locale: Locale = 'en',
): Promise<HeroWithGroup | undefined> {
    const base = (envHelper.directusHost || '').replace(/\/$/, '');
    if (!base) {
        // eslint-disable-next-line no-console
        console.warn(
            '[fetchHeroBySlug] Directus host not configured - check NEXT_PUBLIC_DIRECTUS_HOST env var',
        );
        return undefined;
    }

    const params = buildParams(locale, { slug, limit: '1' });

    try {
        const url = `${base}/items/heroes?${params.toString()}`;
        // eslint-disable-next-line no-console
        console.log(`[fetchHeroBySlug] Fetching "${slug}" from Directus`);

        const res = await fetch(url, { next: { revalidate: 60 } });
        // eslint-disable-next-line no-console
        console.log(`[fetchHeroBySlug] Response status: ${res.status} ${res.statusText}`);

        if (!res.ok) {
            const errorText = await res.text().catch(() => '');
            // eslint-disable-next-line no-console
            console.warn(
                `[fetchHeroBySlug] Directus error ${res.status} for "${slug}": ${errorText.substring(0, 200)}`,
            );
            return undefined;
        }

        const json = await res.json();
        const item = json?.data?.[0];
        if (!item) {
            // eslint-disable-next-line no-console
            console.warn(
                `[fetchHeroBySlug] No hero found in Directus for slug "${slug}" (response had ${json?.data?.length || 0} items)`,
            );
            return undefined;
        }

        // eslint-disable-next-line no-console
        console.log(`[fetchHeroBySlug] ✓ Successfully fetched "${slug}" from Directus`);
        return mapHero(item, locale);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
            `[fetchHeroBySlug] ✗ Error fetching "${slug}":`,
            error instanceof Error ? error.message : error,
        );
        return undefined;
    }
}

export async function fetchAllHeroes(locale: Locale = 'en'): Promise<HeroWithGroup[]> {
    const base = (envHelper.directusHost || '').replace(/\/$/, '');
    if (!base) {
        // eslint-disable-next-line no-console
        console.warn(
            '[fetchAllHeroes] Directus host not configured - check NEXT_PUBLIC_DIRECTUS_HOST env var',
        );
        return [];
    }

    const params = buildParams(locale, { limit: '-1' });

    try {
        const url = `${base}/items/heroes?${params.toString()}`;
        // eslint-disable-next-line no-console
        console.log(`[fetchAllHeroes] Fetching from: ${base}/items/heroes (locale: ${locale})`);

        const res = await fetch(url, { next: { revalidate: 60 } });
        // eslint-disable-next-line no-console
        console.log(`[fetchAllHeroes] Response status: ${res.status} ${res.statusText}`);

        if (!res.ok) {
            const errorText = await res.text().catch(() => '');
            // eslint-disable-next-line no-console
            console.warn(
                `[fetchAllHeroes] Directus error ${res.status}: ${errorText.substring(0, 200)}`,
            );
            return [];
        }

        const json = await res.json();
        const items = json?.data || [];
        // eslint-disable-next-line no-console
        console.log(`[fetchAllHeroes] Received ${items.length} items from Directus`);

        if (items.length === 0) {
            // eslint-disable-next-line no-console
            console.warn('[fetchAllHeroes] Directus returned empty array - check data in CMS');
            return [];
        }

        // eslint-disable-next-line no-console
        console.log(`[fetchAllHeroes] ✓ Successfully mapped ${items.length} heroes from Directus`);
        return items.map((item: any) => mapHero(item, locale));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
            '[fetchAllHeroes] ✗ Fetch error:',
            error instanceof Error ? error.message : error,
        );
        return [];
    }
}

export async function fetchHeroGroups(
    locale: Locale = 'en',
): Promise<Record<HeroGroup, GroupInfo>> {
    const allHeroes = await fetchAllHeroes(locale);
    return groupHeroesByGroup(allHeroes);
}
