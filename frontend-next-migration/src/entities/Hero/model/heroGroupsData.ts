import { GroupInfo } from '../types/hero';
import { buildHeroGroupsPart1 } from './heroGroupsData.part1';
import { buildHeroGroupsPart2 } from './heroGroupsData.part2';

export const buildHeroGroups = (
    t: (key: string) => string,
): {
    RETROFLECTOR?: GroupInfo;
    DESENSITIZER?: GroupInfo;
    TRICKSTER?: GroupInfo;
    OBEDIENT?: GroupInfo;
    PROJECTOR?: GroupInfo;
    INTELLECTUALIZER?: GroupInfo;
    CONFLUENT?: GroupInfo;
} => ({
    ...buildHeroGroupsPart1(t),
    ...buildHeroGroupsPart2(t),
});
