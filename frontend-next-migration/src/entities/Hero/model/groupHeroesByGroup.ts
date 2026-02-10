import { HeroWithGroup, HeroGroup, GroupInfo } from '../types/hero';

/** Helper to group heroes by their groupEnum */
export function groupHeroesByGroup(heroes: HeroWithGroup[]): Record<HeroGroup, GroupInfo> {
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
