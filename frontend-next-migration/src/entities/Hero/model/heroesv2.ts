import { GroupInfo, Hero, HeroGroup } from '../types/hero';
import { initializeHeroGroups } from './initializeHeroGroups';

interface HeroWithGroup extends Hero {
    groupEnum: HeroGroup;
    groupName: string;
    groupDescription: string;
}

export class HeroManager {
    private readonly t: (key: string) => string;
    private readonly heroGroups: Record<HeroGroup, GroupInfo>;

    constructor(t: (key: string) => string) {
        this.t = t;
        this.heroGroups = initializeHeroGroups(this.t);
    }

    public getAllHeroes(): HeroWithGroup[] {
        return Object.entries(this.heroGroups).flatMap(([group, groupInfo]) => {
            const { name: groupName, description: groupDescription } = groupInfo;
            return groupInfo.heroes.map((hero) => ({
                ...hero,
                groupEnum: group as HeroGroup,
                groupName,
                groupDescription,
            }));
        });
    }

    public getHeroesByGroups(): Record<HeroGroup, GroupInfo> {
        return this.heroGroups;
    }

    public getHeroById(heroId: number): HeroWithGroup | undefined {
        return this.getAllHeroes().find((hero) => hero.id === heroId);
    }

    public getHeroesBySpecificGroup(group: HeroGroup): HeroWithGroup[] | undefined {
        const groupInfo = this.heroGroups[group];
        if (!groupInfo) return undefined;

        const { name: groupName, description: groupDescription } = groupInfo;

        return groupInfo.heroes.map((hero) => ({
            ...hero,
            groupEnum: group,
            groupName,
            groupDescription,
        })) as HeroWithGroup[];
    }
}
