'use client';
import React, { useCallback, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { AttributePricingHelper } from '../../model/stats/AttributesPricingHelper';
import { statValue, statsPricingData, Stat } from '@/entities/Hero';
import cls from './AttributesPricing.module.scss';

// import { statsPricingData, Stat, statValue } from '@/entities/Hero';
export type AttributesPricingProps = {
    selectedStat: Stat;
    setSelectedStat: Dispatch<SetStateAction<Stat>>;
    fromLevel: number;
    setFromLevel: Dispatch<SetStateAction<number>>;
    setToLevel: Dispatch<SetStateAction<number>>;
    toLevel: number;
    setUpgradePotential: Dispatch<SetStateAction<number>>;
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

export const AttributesPricing3 = ({
    stats,
    selectedStat,
    setSelectedStat,
    fromLevel,
    setFromLevel,
    setToLevel,
    toLevel,
    setUpgradePotential,
}: AttributesPricingProps): JSX.Element => {
    const { t } = useClientTranslation('heroes-stats-pricing');

    const totalUpgraded = useMemo(() => {
        return AttributePricingHelper.getTotalUpgraded(stats);
    }, [stats]);

    useEffect(() => {
        setUpgradePotential(10 - totalUpgraded);
    }, [totalUpgraded, setUpgradePotential]);

    const setDropdowns = useCallback(
        (statName: string) => {
            const [stat, level] = AttributePricingHelper.getStatAndLevel(
                statName,
                stats,
                selectedStat,
            );
            setSelectedStat(stat);
            setFromLevel(level);
            setToLevel(level);
            return level;
        },
        [stats, selectedStat],
    );

    // Derive current level purely without causing side effects during render
    const currentLevel = useMemo(() => {
        const [, level] = AttributePricingHelper.getStatAndLevel(
            selectedStat.name,
            stats,
            selectedStat,
        );
        return level;
    }, [stats, selectedStat]);

    // Keep dropdowns in sync if stats or selectedStat change (without causing render-time updates)
    useEffect(() => {
        if (!stats || stats.length === 0) return;

        // If current selected stat is not present in the provided stats, fallback to the first available
        const found = stats.find((stat) => stat.name === selectedStat.name);
        if (!found) {
            const fallback = stats[0];
            const [, level] = AttributePricingHelper.getStatAndLevel(
                fallback.name,
                stats,
                selectedStat,
            );
            setSelectedStat(fallback);
            setFromLevel(level);
            setToLevel(level);
            return;
        }

        const [stat, level] = AttributePricingHelper.getStatAndLevel(
            selectedStat.name,
            stats,
            selectedStat,
        );
        if (stat.name !== selectedStat.name) {
            setSelectedStat(stat);
        }
        setFromLevel((prev) => (prev !== level ? level : prev));
        setToLevel((prev) => (prev !== level ? level : prev));
    }, [stats, selectedStat, setSelectedStat, setFromLevel, setToLevel]);

    const getLevelRange = useCallback(
        () => AttributePricingHelper.getLevelRange(totalUpgraded, currentLevel),
        [totalUpgraded, currentLevel],
    );

    const handleStatChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const statName = event.target.value;
            setUpgradePotential(10 - totalUpgraded);
            setDropdowns(statName);
        },
        [stats, selectedStat],
    );

    const handleFromLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromLevel(Number(event.target.value));
    }, []);

    const handleToLevelChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            setToLevel(Number(event.target.value));
            setUpgradePotential(10 - Number(event.target.value) + selectedStat.defaultLevel);
        },
        [selectedStat],
    );

    const levelRange = useMemo(() => getLevelRange(), [getLevelRange, totalUpgraded, currentLevel]);

    const sum = useMemo(
        () =>
            AttributePricingHelper.calculatePrice(
                fromLevel,
                toLevel,
                selectedStat.rarityClass,
                selectedStat.defaultLevel,
            ),
        [fromLevel, toLevel, selectedStat.rarityClass, selectedStat.defaultLevel],
    );

    // Ensure the select has a valid value on the very first render, even if selectedStat.name is not in stats yet
    const selectedName = useMemo(() => {
        const found = stats?.find((stat) => stat.name === selectedStat.name)?.name;
        return found ?? stats?.[0]?.name ?? '';
    }, [stats, selectedStat.name]);

    const selectedColor = useMemo(() => {
        const stat = stats?.find((stat) => stat.name === selectedName);
        return stat?.color ?? selectedStat.color;
    }, [stats, selectedName, selectedStat.color]);

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
                    value={selectedName}
                    style={{ color: selectedColor, borderColor: selectedColor }}
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
                <div className={cls.Value}>
                    {t(selectedStat.name)} {t('value')}
                </div>
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
                <div className={cls.Value}>{statValue[selectedStat.name][fromLevel]}</div>
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
                <div className={cls.Value}>{statValue[selectedStat.name][toLevel]}</div>
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
