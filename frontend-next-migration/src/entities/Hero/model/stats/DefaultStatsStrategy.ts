import { HeroStats, StatsStrategy } from '../../types/HeroStats';
import { HeroSlug } from '../../types/hero';

class DefaultStatsStrategy implements StatsStrategy {
    private readonly statsData: Record<HeroSlug, Record<number, HeroStats>>;

    constructor(statsData: Record<HeroSlug, Record<number, HeroStats>>) {
        this.statsData = statsData;
    }

    public getStatsForHero(slug: HeroSlug, level: number): HeroStats | undefined {
        return this.statsData[slug]?.[level];
    }
}
