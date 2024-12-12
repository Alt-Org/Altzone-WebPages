import { HeroSlug } from '../../types/hero';
import { HeroLevel, HeroStats, StatsStrategy } from '../../types/HeroStats';
import { DefaultStatsStrategy } from './DefaultStatsStrategy';
import { statsData } from './statsData';

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

    public getStatUpgradeInfo(
        slug: HeroSlug,
        level: HeroLevel,
        statName: keyof HeroStats,
        fromStatLevel: number,
        toStatLevel: number,
    ): { price: number; nextValue: number; upgradePotential: number } | undefined {
        return this.strategy.getStatUpgradeInfo(slug, level, statName, fromStatLevel, toStatLevel);
    }

    // public getStatUpgradeInfo(
    //     slug: HeroSlug,
    //     statName: StatName,
    //     levels: StatLevelRange,
    // ): StatUpgradeInfo {
    //     return this.strategy.getStatUpgradeInfo(slug, statName, levels);
    // }
}
