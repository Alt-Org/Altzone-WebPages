import type { HeroSlug } from './hero';

type CreateArrayWithLengthX<
    LENGTH extends number,
    ACC extends unknown[] = [],
> = ACC['length'] extends LENGTH ? ACC : CreateArrayWithLengthX<LENGTH, [...ACC, 1]>;

type NumericRange<
    START_ARR extends number[],
    END extends number,
    ACC extends number = never,
> = START_ARR['length'] extends END
    ? ACC | END
    : NumericRange<[...START_ARR, 1], END, ACC | START_ARR['length']>;

export type HeroLevel = NumericRange<CreateArrayWithLengthX<1>, 2>;

export interface StatsStrategy {
    getStatsForHero(slug: HeroSlug, level: HeroLevel): HeroStats;
}

export interface HeroStats {
    attack: number;
    defense: number;
    speed: number;
    [key: string]: number;
}
