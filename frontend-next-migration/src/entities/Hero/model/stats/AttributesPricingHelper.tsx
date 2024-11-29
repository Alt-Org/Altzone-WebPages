import { statsPricingData } from './statsPricingData';
import { SetStateAction } from 'react';
import { Stat } from '../../ui/AttributesPricing3/AttributesPricingV3';

export class AttributePricingHelper {
    static calculatePrice = (
        fromLevel: number,
        toLevel: number,
        rarityClass: number,
        defaultLevel: number,
    ) => {
        if (fromLevel >= toLevel) return 0;
        let total = 0;
        const from = fromLevel - defaultLevel;
        const to = toLevel - defaultLevel;
        for (let i = from; i < to; i++) {
            total += statsPricingData[rarityClass][i] * statsPricingData.stepsPerLevel[i];
        }
        return total;
    };

    static getStatAndLevel = (
        statName: string,
        stats: Stat[],
        selectedStat: Stat,
    ): [SetStateAction<Stat>, number] => {
        const stat = stats.find((stat) => stat.name === statName) || selectedStat;
        const level = stat.defaultLevel + (stat.developmentLevel || 0);
        return [stat, level];
    };

    static getTotalUpgraded = (stats: Stat[]): number =>
        stats.reduce((sum, current) => sum + (current.developmentLevel || 0), 0);

    static getLevelRange = (totalUpgraded: number, currentLevel: number): number[] =>
        Array.from({ length: 11 - totalUpgraded }, (_, i) => i + currentLevel);
}
