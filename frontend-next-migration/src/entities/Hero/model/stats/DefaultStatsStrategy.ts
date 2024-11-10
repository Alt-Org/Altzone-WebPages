import { HeroStats, StatsStrategy } from '../../types/HeroStats';
import { HeroSlug } from '../../types/hero';

export class DefaultStatsStrategy implements StatsStrategy {
    private readonly statsData: Record<HeroSlug, Record<number, HeroStats>>;

    constructor(statsData: Record<HeroSlug, Record<number, HeroStats>>) {
        this.statsData = statsData;
    }

    public getStatsForHero(slug: HeroSlug, level: number): HeroStats {
        return this.statsData[slug]?.[level];
    }

    //todo check may be it could be useful
    // getStatUpgradeInfo(
    //     heroStats: HeroStats,
    //     statName: 'attack' | 'defense' | 'speed',
    //     fromLevel: number,
    //     toLevel: number
    // ): { price: number; nextValue: number; upgradePotential: number } | undefined {
    //     const statLevels = heroStats[statName];
    //     const from = statLevels.find(statLevel => statLevel.statLevel === fromLevel);
    //     const to = statLevels.find(statLevel => statLevel.statLevel === toLevel);
    //
    //     if (from && to) {
    //         const price = to.cost - from.cost;
    //         return { price, nextValue: to.value, upgradePotential: to.upgradePotential };
    //     }
    //     return undefined;
    // }
}
