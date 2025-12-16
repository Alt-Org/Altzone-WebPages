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

export type Locale = 'en' | 'fi' | 'ru';

/** Relation field keys (O2M translations) */
const HERO_TR_KEYS = ['translations'] as const;
const GROUP_TR_KEYS = ['translations'] as const;

/** File field keys */
const HERO_IMG_KEYS = ['srcImg'] as const;
const HERO_GIF_KEYS = ['srcGif'] as const;
const GROUP_IMG_KEYS = ['srcImg'] as const;
const GROUP_LABEL_KEYS = ['label'] as const;

/** Stats relation key */
const STATS_KEYS = ['stats'] as const;

/** Build a public asset URL from a Directus file ID. */
const ASSET = (id?: string) =>
    id ? `${(envHelper.directusHost || '').replace(/\/$/, '')}/assets/${id}` : '';

/** Normalized languages_code in Directus */
function languageCode(locale: Locale): string {
    return locale;
}

/** Pick the matching translation; fallback to first if none match */
function pickTranslationByLocale<T extends { languages_code?: string }>(
    arr: T[] | undefined,
    locale: Locale,
): T | undefined {
    if (!arr?.length) return undefined;
    return arr.find((t) => t?.languages_code === languageCode(locale)) ?? arr[0];
}

/** Fields requested from Directus */
const FIELDS = [
    'id',
    'slug',
    'order',

    // hero files (id + width + height)
    ...HERO_IMG_KEYS.flatMap((key) => [`${key}.id`, `${key}.width`, `${key}.height`]),
    ...HERO_GIF_KEYS.flatMap((key) => [`${key}.id`, `${key}.width`, `${key}.height`]),

    // hero translations
    ...HERO_TR_KEYS.flatMap((key) => [
        `${key}.languages_code`,
        `${key}.title`,
        `${key}.description`,
        `${key}.alt`,
        `${key}.altGif`,
    ]),

    // hero rarity class
    'rarityClass',

    // group basics
    'group.id',
    'group.key',
    'group.bgColour',

    // group files
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

    // group translations
    ...GROUP_TR_KEYS.flatMap((key) => [
        `group.${key}.languages_code`,
        `group.${key}.name`,
        `group.${key}.description`,
    ]),

    // stats
    ...STATS_KEYS.flatMap((key) => [
        `${key}.name`,
        `${key}.rarityClass`,
        `${key}.defaultLevel`,
        `${key}.developmentLevel`,
        `${key}.order`,
    ]),
].join(',');

/** Utility helpers */
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

/** Helper to group heroes by their groupEnum */
function groupHeroesByGroup(heroes: HeroWithGroup[]): Record<HeroGroup, GroupInfo> {
    const groupsMap = new Map<HeroGroup, GroupInfo>();

    for (const hero of heroes) {
        const groupKey = hero.groupEnum;

        if (!groupsMap.has(groupKey)) {
            groupsMap.set(groupKey, {
                name: hero.groupName,
                description: hero.groupDescription,
                bgColour: hero.groupBgColour,
                srcImg: typeof hero.groupLabel === 'string' ? '' : hero.groupLabel || '',
                label: hero.groupLabel || '',
                heroes: [],
            });
        }

        const group = groupsMap.get(groupKey);
        if (group) {
            group.heroes.push({
                id: hero.id,
                slug: hero.slug,
                srcImg: hero.srcImg,
                srcGif: hero.srcGif,
                alt: hero.alt,
                altGif: hero.altGif,
                title: hero.title,
                rarityClass: hero.rarityClass || '',
                description: hero.description,
                stats: hero.stats,
            });
        }
    }

    const result = {} as Record<HeroGroup, GroupInfo>;
    Array.from(groupsMap.entries()).forEach(([key, value]) => {
        result[key] = value;
    });

    return result;
}

/** Mapper */
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
        rarityClass: item.rarityClass || '',
        stats,
        groupEnum: (item?.group?.key as HeroGroup) ?? 'RETROFLECTOR',
        groupName: group.name,
        groupDescription: group.description,
        groupBgColour: group.bgColour,
        groupLabel: group.label,
    };
}

/* RTK Query API */

export const heroApi = directusApi.injectEndpoints({
    endpoints: (build) => ({
        getHeroBySlug: build.query<HeroWithGroup | undefined, { slug: HeroSlug; locale?: Locale }>({
            query: ({ slug, locale = 'en' }) => {
                const params = new URLSearchParams();
                params.set('filter[slug][_eq]', slug);
                params.set('limit', '1');
                params.set('fields', FIELDS);
                params.set('sort', 'order');

                for (const key of HERO_TR_KEYS) {
                    params.set(`deep[${key}][filter][languages_code][_eq]`, languageCode(locale));
                }
                for (const key of GROUP_TR_KEYS) {
                    params.set(
                        `deep[group][${key}][filter][languages_code][_eq]`,
                        languageCode(locale),
                    );
                }

                return { url: `/items/heroes?${params.toString()}` };
            },
            transformResponse: (resp: any, _meta, args) => {
                const item = resp?.data?.[0];
                return item ? mapHero(item, (args?.locale ?? 'en') as Locale) : undefined;
            },
            providesTags: (_res, _err, args) => [{ type: 'Hero' as const, id: args.slug }],
        }),
        getAllHeroes: build.query<HeroWithGroup[], { locale?: Locale }>({
            query: ({ locale = 'en' }) => {
                const params = new URLSearchParams();
                params.set('fields', FIELDS);
                params.set('sort', 'order');
                params.set('limit', '-1');

                for (const key of HERO_TR_KEYS) {
                    params.set(`deep[${key}][filter][languages_code][_eq]`, languageCode(locale));
                }
                for (const key of GROUP_TR_KEYS) {
                    params.set(
                        `deep[group][${key}][filter][languages_code][_eq]`,
                        languageCode(locale),
                    );
                }

                return { url: `/items/heroes?${params.toString()}` };
            },
            transformResponse: (resp: any, _meta, args) => {
                const items = resp?.data || [];
                return items.map((item: any) => mapHero(item, (args?.locale ?? 'en') as Locale));
            },
            providesTags: () => [{ type: 'Hero' as const, id: 'LIST' }],
        }),
        getHeroGroups: build.query<Record<HeroGroup, GroupInfo>, { locale?: Locale }>({
            query: ({ locale = 'en' }) => {
                const params = new URLSearchParams();
                params.set('fields', FIELDS);
                params.set('sort', 'order');
                params.set('limit', '-1');

                for (const key of HERO_TR_KEYS) {
                    params.set(`deep[${key}][filter][languages_code][_eq]`, languageCode(locale));
                }
                for (const key of GROUP_TR_KEYS) {
                    params.set(
                        `deep[group][${key}][filter][languages_code][_eq]`,
                        languageCode(locale),
                    );
                }

                return { url: `/items/heroes?${params.toString()}` };
            },
            transformResponse: (resp: any, _meta, args) => {
                const items = resp?.data || [];
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

/* Plain fetch (SSR) */

export async function fetchHeroBySlug(
    slug: HeroSlug,
    locale: Locale = 'en',
): Promise<HeroWithGroup | undefined> {
    const base = (envHelper.directusHost || '').replace(/\/$/, '');
    const params = new URLSearchParams();
    params.set('filter[slug][_eq]', slug);
    params.set('limit', '1');
    params.set('fields', FIELDS);
    params.set('sort', 'order');

    for (const key of HERO_TR_KEYS) {
        params.set(`deep[${key}][filter][languages_code][_eq]`, languageCode(locale));
    }
    for (const key of GROUP_TR_KEYS) {
        params.set(`deep[group][${key}][filter][languages_code][_eq]`, languageCode(locale));
    }

    const res = await fetch(`${base}/items/heroes?${params.toString()}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) return undefined;

    const json = await res.json();
    const item = json?.data?.[0];
    return item ? mapHero(item, locale) : undefined;
}

/**
 * Fetch all heroes from Directus
 */
export async function fetchAllHeroes(locale: Locale = 'en'): Promise<HeroWithGroup[]> {
    const base = (envHelper.directusHost || '').replace(/\/$/, '');
    const params = new URLSearchParams();
    params.set('fields', FIELDS);
    params.set('sort', 'order');
    params.set('limit', '-1'); // Get all heroes

    for (const key of HERO_TR_KEYS) {
        params.set(`deep[${key}][filter][languages_code][_eq]`, languageCode(locale));
    }
    for (const key of GROUP_TR_KEYS) {
        params.set(`deep[group][${key}][filter][languages_code][_eq]`, languageCode(locale));
    }

    const res = await fetch(`${base}/items/heroes?${params.toString()}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) return [];

    const json = await res.json();
    const items = json?.data || [];
    return items.map((item: any) => mapHero(item, locale));
}

/**
 * Fetch all heroes grouped by their hero groups from Directus
 */
export async function fetchHeroGroups(
    locale: Locale = 'en',
): Promise<Record<HeroGroup, GroupInfo>> {
    const allHeroes = await fetchAllHeroes(locale);
    return groupHeroesByGroup(allHeroes);
}
