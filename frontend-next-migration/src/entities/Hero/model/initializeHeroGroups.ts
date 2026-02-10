import { type GroupInfo, HeroGroup } from '../types/hero';
import { buildHeroGroups } from '@/entities/Hero/model/heroGroupsData';
import { fetchAllHeroes, type Locale } from './heroApi';
import { groupHeroesByGroup } from './groupHeroesByGroup';

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
        const heroes = await fetchAllHeroes(locale);
        return groupHeroesByGroup(heroes);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
            '[initializeHeroGroupsFromDirectus] Failed to fetch hero groups from Directus:',
            error,
        );
        // Return empty record - caller should check and keep static data
        return {} as Record<HeroGroup, GroupInfo>;
    }
}
