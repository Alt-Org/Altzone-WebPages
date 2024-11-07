import type { HeroSlug } from './hero';

type Range<
    Start extends number,
    End extends number,
    Result extends number[] = [],
> = Result['length'] extends End
    ? [...Result, Result['length']][number]
    : Range<Start, End, [...Result, Result['length']]>;

export type HeroLevel = Range<1, 5>;

export interface StatsStrategy {
    getStatsForHero(slug: HeroSlug, level: HeroLevel): HeroStats;
}

export interface HeroStats {
    attack: number;
    defense: number;
    speed: number;
    [key: string]: number;
}
