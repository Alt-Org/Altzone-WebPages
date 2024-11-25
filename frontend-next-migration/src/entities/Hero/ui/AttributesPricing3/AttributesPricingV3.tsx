import { useState, useCallback, useMemo } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { statsPricingData } from '../../model/stats/statsPricingData';
import cls from './AttributesPricing.module.scss';

/**
 * Properties for AttributesPricing component
 *
 * @property {string} name Name of the stat.
 * @property {number} defaultLevel The initial value of the stat.
 * @property {number} developmentLevel The value indicating how much a stat has been developed.
 * @property {number} rarityClass Rarity class of the stat. The rarity class can be one of the following numeric values: 1, 3, 5-8, 10.
 * @property {string} color The stat's unique color.
 */
export type Stat = {
    name: string;
    defaultLevel: number;
    developmentLevel?: number;
    rarityClass: number;
    color: string;
};

export type AttributesPricingProps = {
    stats: Stat[];
};
/**
 * This component calculates the cost of upgrading a stat.
 * If the character has already been developed, the sum of development
 * levels is subtracted from the level range. A character can
 * develop stats by a total of 10 levels. This component also requires
 * the rarity class in the stat data, which can be one of the following
 * numeric values: 1, 3, 5-8, 10.
 *
 * @param {Stat[]} props stats
 * @returns the pricing component if statsPricingData is loaded
 */

export const AttributesPricing3 = ({ stats }: AttributesPricingProps): JSX.Element => {
    const [selectedStat, setSelectedStat] = useState(stats[0]);
    const [fromLevel, setFromLevel] = useState(
        stats[0].defaultLevel + (stats[0].developmentLevel || 0),
    );
    const [toLevel, setToLevel] = useState(
        stats[0].defaultLevel + (stats[0].developmentLevel || 0),
    );

    const { t } = useClientTranslation('heroes-stats');

    const totalUpgraded = useMemo(
        () => stats.reduce((sum, current) => sum + (current.developmentLevel || 0), 0),
        [stats],
    );

    //This fixes dropdown updates and out-of-range calculations in Storybook when editing Stats data.
    const currentLevel = useMemo(() => {
        const current = stats.find((stat) => stat.name === selectedStat.name) || selectedStat;
        const updatedLevel = current.defaultLevel + (current.developmentLevel || 0);
        setSelectedStat(current);
        setFromLevel(updatedLevel);
        setToLevel(updatedLevel);
        return updatedLevel;
    }, [stats, selectedStat]);

    const getLevelRange = useCallback(
        () => Array.from({ length: 11 - totalUpgraded }, (_, i) => i + currentLevel),
        [totalUpgraded, currentLevel],
    );

    const handleStatChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const statName = event.target.value;
            const newStat = stats.find((stat) => stat.name === statName) || selectedStat;
            setSelectedStat(newStat);
            setFromLevel(newStat.defaultLevel + (newStat.developmentLevel || 0));
            setToLevel(newStat.defaultLevel + (newStat.developmentLevel || 0));
        },
        [stats, selectedStat],
    );

    const handleFromLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromLevel(Number(event.target.value));
    }, []);

    const handleToLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setToLevel(Number(event.target.value));
    }, []);

    const levelRange = useMemo(() => getLevelRange(), [getLevelRange, totalUpgraded, currentLevel]);

    const sum = useMemo(() => {
        if (fromLevel >= toLevel) return 0;
        let total = 0;
        const from = fromLevel - selectedStat.defaultLevel;
        const to = toLevel - selectedStat.defaultLevel;
        for (let i = from; i < to; i++) {
            total +=
                statsPricingData[selectedStat.rarityClass][i] * statsPricingData.stepsPerLevel[i];
        }
        return total;
    }, [fromLevel, toLevel, selectedStat.rarityClass, selectedStat.defaultLevel]);

    if (!statsPricingData) {
        return <h2>{t('Stat pricing data is unavailable')}</h2>;
    }

    return (
        <div className={cls.AttributePricing}>
            <div className={cls.InlineBlock}>
                <div className={cls.Header}>{t('stat')}</div>
                <select
                    data-testid="stat"
                    className={cls.Stats}
                    style={{ color: selectedStat.color, borderColor: selectedStat.color }}
                    onChange={handleStatChange}
                >
                    {stats.map((stat) => (
                        <option
                            key={stat.name}
                            value={stat.name}
                            style={{ color: stat.color, fontWeight: 'bolder' }}
                        >
                            {t(stat.name)}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cls.InlineBlock}>
                <div className={cls.Header}>{t('fromLevel')}</div>
                <select
                    data-testid="fromLevel"
                    className={cls.Dropdown}
                    value={fromLevel}
                    onChange={handleFromLevelChange}
                >
                    {levelRange.map((value) => (
                        <option
                            key={value}
                            value={value}
                        >
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cls.InlineBlock}>
                <div className={cls.Header}>{t('toLevel')}</div>
                <select
                    data-testid="toLevel"
                    className={cls.Dropdown}
                    value={toLevel}
                    onChange={handleToLevelChange}
                >
                    {levelRange.map((value) => (
                        <option
                            key={value}
                            value={value}
                        >
                            {value}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cls.InlineBlock}>
                <div className={cls.Price}>{t('cost')}</div>
                <span
                    data-testid="price"
                    className={cls.Sum}
                >
                    {sum}
                </span>
            </div>
        </div>
    );
};
