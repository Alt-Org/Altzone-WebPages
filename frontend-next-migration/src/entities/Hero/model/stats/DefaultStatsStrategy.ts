import { HeroSlug } from '../../types/hero';
import { HeroStats, StatsStrategy } from '../../types/HeroStats';

export class DefaultStatsStrategy implements StatsStrategy {
    private readonly statsData: Record<HeroSlug, Record<number, HeroStats>>;

    constructor(statsData: Record<HeroSlug, Record<number, HeroStats>>) {
        this.statsData = statsData;
    }

    public getStatsForHero(slug: HeroSlug, level: number): HeroStats {
        return this.statsData[slug]?.[level];
    }

    public getStatUpgradeInfo(
        slug: HeroSlug,
        level: number,
        statName: keyof HeroStats,
        fromStatLevel: number,
        toStatLevel: number,
    ): { price: number; nextValue: number; upgradePotential: number } | undefined {
        const heroStats = this.getStatsForHero(slug, level);
        if (!heroStats) return undefined;

        const statLevels = heroStats[statName];
        const from = statLevels.find((statLevel) => statLevel.statLevel === fromStatLevel);
        const to = statLevels.find((statLevel) => statLevel.statLevel === toStatLevel);

        if (from && to) {
            const price = to.cost - from.cost;
            return { price, nextValue: to.value, upgradePotential: to.upgradePotential };
        }
        return undefined;
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
