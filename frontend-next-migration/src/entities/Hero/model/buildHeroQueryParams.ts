import type { Locale } from './heroApi';

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

/** Normalized languages_code in Directus */
const languageCode = (locale: Locale): string => locale;

/** Fields requested from Directus */
export const FIELDS = [
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
    'rarityClass',
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

/**
 * Build query parameters for Directus hero API calls
 */
export function buildHeroQueryParams(
    locale: Locale,
    options?: { slug?: string; limit?: string },
): URLSearchParams {
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
