import { GroupInfo, HeroWithGroup, HeroGroup, HeroSlug } from '../types/hero';
// import { HeroLevel, HeroStats } from '../types/HeroStats';
import { initializeHeroGroups } from './initializeHeroGroups';
// import { HeroStatsManager } from './stats';

export class HeroManager {
    private readonly t: (key: string) => string;
    private readonly heroGroups: Record<HeroGroup, GroupInfo>;
    // private heroStatsManager: HeroStatsManager;

    constructor(t: (key: string) => string) {
        this.t = t;
        this.heroGroups = initializeHeroGroups(this.t);
        // this.heroStatsManager = new HeroStatsManager();
    }

    // public getHeroStatsBySlugAndLevel(slug: HeroSlug, statLevel: HeroLevel): HeroStats {
    //     return this.heroStatsManager.getStatsForHero(slug, statLevel);
    // }

    public getAllHeroes(): HeroWithGroup[] {
        return Object.entries(this.heroGroups).flatMap(([group, groupInfo]) => {
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
