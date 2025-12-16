import { type GroupInfo, HeroGroup } from '../types/hero';
import { buildHeroGroups } from '@/entities/Hero/model/heroGroupsData';
import { fetchHeroGroups, type Locale } from './heroApi';

/**
 * Initialize hero groups from static data (legacy, for fallback)
 */
export const initializeHeroGroups = (t: (key: string) => string): Record<HeroGroup, GroupInfo> => {
    // Local data or overrides specific to initialize step can be defined here and merged in.
    const localData: Partial<Record<HeroGroup, GroupInfo>> = {};

    return {
        ...buildHeroGroups(t),
        ...localData,
    } as Record<HeroGroup, GroupInfo>;
};

/**
 * Initialize hero groups from Directus (async)
 */
export async function initializeHeroGroupsFromDirectus(
    locale: Locale = 'en',
): Promise<Record<HeroGroup, GroupInfo>> {
    try {
        const groups = await fetchHeroGroups(locale);
        return groups;
    } catch (error) {
        console.error('Failed to fetch hero groups from Directus:', error);
        // Return empty record as fallback
        return {} as Record<HeroGroup, GroupInfo>;
    }
}
