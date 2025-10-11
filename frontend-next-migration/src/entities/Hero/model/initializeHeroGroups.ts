import { GroupInfo, HeroGroup } from '../types/hero';
import { buildHeroGroups } from './heroGroupsData';

export const initializeHeroGroups = (t: (key: string) => string): Record<HeroGroup, GroupInfo> => {
    // Local data or overrides specific to initialize step can be defined here and merged in.
    const localData: Partial<Record<HeroGroup, GroupInfo>> = {};

    return {
        ...buildHeroGroups(t),
        ...localData,
    } as Record<HeroGroup, GroupInfo>;
};
