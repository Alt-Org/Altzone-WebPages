import { HeroStats, LevelRange, StatsStrategy, StatUpgradeInfo } from '../../types/HeroStats';
import { HeroSlug } from '../../types/hero';

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
        statName: 'attack' | 'defense' | 'speed',
        levels: LevelRange,
    ): StatUpgradeInfo {
        const [fromLevel, toLevel] = levels;
        const heroStats = this.getStatsForHero(slug, fromLevel);
        const statLevels = heroStats[statName];

        const from = statLevels.find((level) => level.level === fromLevel);
        const to = statLevels.find((level) => level.level === toLevel);

        if (!from || !to) {
            throw new Error(
                `Stat levels for ${statName} from level ${fromLevel} to ${toLevel} not found`,
            );
        }

        const price = to.cost - from.cost;
        return { price, nextValue: to.value, upgradePotential: to.upgradePotential };
    }
}
