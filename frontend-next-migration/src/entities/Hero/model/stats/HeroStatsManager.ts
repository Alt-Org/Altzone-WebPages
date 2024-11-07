import { StatsStrategy, HeroStats, HeroLevel } from '../../types/HeroStats';
import { HeroSlug } from '../../types/hero';
import { statsData } from './statsData';
import { DefaultStatsStrategy } from './DefaultStatsStrategy';

export class HeroStatsManager {
    private strategy: StatsStrategy;

    constructor() {
        this.strategy = new DefaultStatsStrategy(statsData);
    }

    // it can be useful in future if for example we will want to use some bonuses for stats
    // public setStrategy(strategy: StatsStrategy) {
    //     this.strategy = strategy;
    // }

    public getStatsForHero(slug: HeroSlug, level: HeroLevel): HeroStats {
        return this.strategy.getStatsForHero(slug, level);
    }
}
