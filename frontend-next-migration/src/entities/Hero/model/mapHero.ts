import type { HeroWithGroup, HeroGroup, HeroSlug, Stat, GroupInfo } from '../types/hero';
import type { StaticImageData } from 'next/image';
import { envHelper } from '@/shared/const/envHelper';

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
const languageCode = (locale: Locale): string => locale;

/** Pick the matching translation; fallback to first if none match */
function pickTranslationByLocale<T extends { languages_code?: string }>(
    arr: T[] | undefined,
    locale: Locale,
): T | undefined {
    if (!arr?.length) return undefined;
    return arr.find((t) => t?.languages_code === languageCode(locale)) ?? arr[0];
}

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

/** Mapper */
// eslint-disable-next-line complexity
export function mapHero(item: any, locale: Locale): HeroWithGroup {
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
