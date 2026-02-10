import { GroupInfo, HeroWithGroup, HeroGroup, HeroSlug } from '../types/hero';
// import { HeroLevel, HeroStats } from '../types/HeroStats';
import { initializeHeroGroups, initializeHeroGroupsFromDirectus } from './initializeHeroGroups';
// import { HeroStatsManager } from './stats';
import { fetchHeroBySlug, fetchAllHeroes, type Locale } from './heroApi';

export class HeroManager {
    private readonly t: (key: string) => string;
    private heroGroups: Record<HeroGroup, GroupInfo>;
    private heroesCache: HeroWithGroup[] | null = null;
    // private heroStatsManager: HeroStatsManager;

    constructor(t: (key: string) => string) {
        this.t = t;
        this.heroGroups = initializeHeroGroups(this.t);
        // this.heroStatsManager = new HeroStatsManager();
    }

    /**
     * Initialize hero groups from Directus (async)
     */
    public async initializeFromDirectus(locale: Locale = 'en'): Promise<void> {
        try {
            const directusGroups = await initializeHeroGroupsFromDirectus(locale);
            // Only replace static data if Directus returned non-empty groups
            if (directusGroups && Object.keys(directusGroups).length > 0) {
                this.heroGroups = directusGroups;
                this.heroesCache = null; // Clear cache to force recalculation
            } else {
                console.warn('[HeroManager] Directus returned empty groups, keeping static data');
            }
        } catch (error) {
            console.error('[HeroManager] Failed to initialize hero groups from Directus:', error);
            // Keep existing static data as fallback
        }
    }

    // public getHeroStatsBySlugAndLevel(slug: HeroSlug, statLevel: HeroLevel): HeroStats {
    //     return this.heroStatsManager.getStatsForHero(slug, statLevel);
    // }

    public getAllHeroes(): HeroWithGroup[] {
        // Use cache if available
        if (this.heroesCache) {
            return this.heroesCache;
        }

        const heroes = Object.entries(this.heroGroups).flatMap(([group, groupInfo]) => {
            const {
                name: groupName,
                description: groupDescription,
                bgColour: groupBgColour,
                label: groupLabel,
            } = groupInfo;
            return groupInfo.heroes.map((hero) => ({
                ...hero,
                groupEnum: group as HeroGroup,
                groupName,
                groupLabel,
                groupDescription,
                groupBgColour,
            }));
        });

        this.heroesCache = heroes;
        return heroes;
    }

    /**
     * Get all heroes from Directus (async)
     */
    public async getAllHeroesFromDirectus(locale: Locale = 'en'): Promise<HeroWithGroup[]> {
        try {
            const heroes = await fetchAllHeroes(locale);
            // If Directus returns empty array, fallback to static data
            if (heroes.length === 0) {
                console.warn(
                    '[HeroManager] Directus returned empty heroes array, using static data',
                );
                return this.getAllHeroes();
            }
            return heroes;
        } catch (error) {
            console.error('[HeroManager] Failed to fetch all heroes from Directus:', error);
            // Fallback to static data
            return this.getAllHeroes();
        }
    }

    public getGroupsWithHeroes(): Record<HeroGroup, GroupInfo> {
        return this.heroGroups;
    }

    public getGroupsWithHeroesAsArray(): GroupInfo[] {
        return Object.values(this.getGroupsWithHeroes()).map((value) => ({
            ...value,
        }));
    }

    public getHeroById(heroId: number): HeroWithGroup | undefined {
        return this.getAllHeroes().find((hero) => hero.id === heroId);
    }

    public getHeroBySlug(slug: HeroSlug): HeroWithGroup | undefined {
        return this.getAllHeroes().find((hero) => hero.slug === slug);
    }

    /**
     * Get hero by slug from Directus (async)
     * Falls back to static data if Directus fetch fails
     */
    public async getHeroBySlugAsync(
        slug: HeroSlug,
        locale: Locale = 'en',
    ): Promise<HeroWithGroup | undefined> {
        try {
            const hero = await fetchHeroBySlug(slug, locale);
            if (hero) return hero;
        } catch {
            // ignore error and fallback
        }
        return this.getHeroBySlug(slug);
    }

    public getHeroesBySpecificGroup(group: HeroGroup): HeroWithGroup[] | undefined {
        const groupInfo = this.heroGroups[group];
        if (!groupInfo) return undefined;

        const {
            name: groupName,
            description: groupDescription,
            label: groupLabel,
            bgColour: groupBgColour,
        } = groupInfo;

        return groupInfo.heroes.map((hero) => ({
            ...hero,
            groupEnum: group,
            groupName,
            groupDescription,
            groupLabel,
            groupBgColour,
        })) as HeroWithGroup[];
    }

    public getHeroAfterSpecificHero(heroId: number): HeroWithGroup | undefined {
        const allHeroes = this.getAllHeroes();
        const currentHeroIndex = allHeroes.findIndex((hero) => hero.id === heroId);
        return currentHeroIndex !== -1 && currentHeroIndex < allHeroes.length - 1
            ? allHeroes[currentHeroIndex + 1]
            : undefined;
    }

    public getHeroBeforeSpecificHero(heroId: number): HeroWithGroup | undefined {
        const allHeroes = this.getAllHeroes();
        const currentHeroIndex = allHeroes.findIndex((hero) => hero.id === heroId);
        return currentHeroIndex > 0 ? allHeroes[currentHeroIndex - 1] : undefined;
    }
}
