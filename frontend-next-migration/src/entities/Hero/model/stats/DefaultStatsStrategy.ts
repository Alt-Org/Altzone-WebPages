import { HeroStats, StatsStrategy } from '../../types/HeroStats';
import { HeroSlug } from '../../types/hero';
import { statsData } from '@/entities/Hero/model/stats/statsData';

class DefaultStatsStrategy implements StatsStrategy {
    private readonly statsData: Record<HeroSlug, Record<number, HeroStats>>;

    constructor(statsData: Record<HeroSlug, Record<number, HeroStats>>) {
        this.statsData = statsData;
    }

    public getStatsForHero(slug: HeroSlug, level: number): HeroStats {
        return this.statsData[slug]?.[level];
    }
}

export const defaultStatsStrategy = new DefaultStatsStrategy(statsData);
