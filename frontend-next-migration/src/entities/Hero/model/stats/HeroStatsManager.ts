import { StatsStrategy, HeroStats, HeroLevel } from '../../types/HeroStats';
import { HeroSlug } from '../../types/hero';

class HeroStatsManager {
    private strategy: StatsStrategy;

    constructor(strategy: StatsStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: StatsStrategy) {
        this.strategy = strategy;
    }

    public getStatsForHero(slug: HeroSlug, level: HeroLevel): HeroStats | undefined {
        return this.strategy.getStatsForHero(slug, level);
    }
}
