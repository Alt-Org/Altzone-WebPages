import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DefaultStatsStrategy } from '../../model/stats/DefaultStatsStrategy';
import { statsData } from '../../model/stats/statsData';
import { HeroSlug } from '../../types/hero';
import { HeroLevel, HeroStats } from '../../types/HeroStats';

// import cls from './AttributesPricing.module.scss';
// import { useState, useEffect, useCallback, useMemo } from "react";
// import { useClientTranslation } from '@/shared/i18n';
// import { statsPricingData } from '../../model/stats/statsPricingData';
//
// /**
//  * Properties for AttributesPricing component
//  *
//  * @property {string} name Name of the stat
//  * @property {number} value Value of the stat
//  * @property {number} rarityClass Rarity class of the stat. The rarity class can be one of the following numeric values: 1, 3, 5-8, 10
//  * @property {string} color The stat's unique color
//  */
// export type Stat = {
//     name: string;
//     value: number;
//     rarityClass: number;
//     color: string;
// };
//
// export type AttributesPricingProps = {
//     stats: Stat[];
// };
// /**
//  * This component calculates the cost of upgrading a stat.
//  * The maximum level is determined based on the stat pricing data.
//  * The level range is defined between the initial value and the maximum.
//  * This component also requires the rarity class in the stat data,
//  * which can be one of the following numeric values: 1, 3, 5-8, 10.
//  *
//  * @param {Stat[]} props stats
//  * @returns the pricing component if statsPricingData is loaded
//  */
// export const AttributesPricing = (props: AttributesPricingProps): JSX.Element => {
//     const { stats } = props;
//     const [stat, setStat] = useState(stats[0]);
//     const [fromLevel, setFromLevel] = useState(stat.value);
//     const [toLevel, setToLevel] = useState(stat.value);
//     const maxLevel = statsPricingData[1].length + 1;
//     const { t } = useClientTranslation('heroes-stats');
//
//     const getLevelRange = (currentLevel: number) => {
//         const ar = [];
//         for (let i = currentLevel; i <= maxLevel; i++) ar.push(i);
//         return ar;
//     };
//     const onStatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setStat(stats.find((stat) => stat.name === event.target.value) || stat);
//     };
//
//     useEffect(() => {
//         setFromLevel(stat.value);
//         setToLevel(stat.value);
//     }, [stat]);
//
//     const onChangeFromLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setFromLevel(Number(event.target.value));
//     };
//     const onChangeToLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setToLevel(Number(event.target.value));
//     };
//
//     let sum = 0;
//     for (let i = fromLevel; i < toLevel; i++) {
//         sum += statsPricingData[stat.rarityClass][i - 1] * statsPricingData.stepsPerLevel[i - 1];
//     }
//     if (fromLevel >= toLevel) sum = 0;
//
//     return statsPricingData ? (
//         <div className={cls.AttributePricing}>
//             <div className={cls.InlineBlock}>
//                 <div className={cls.Header}>{t('stat')}</div>
//                 <select
//                     data-testid="stat"
//                     style={{
//                         color: stat.color,
//                         borderColor: stat.color,
//                     }}
//                     className={cls.Stats}
//                     onChange={onStatChange}
//                 >
//                     {stats.map((stat, key) => (
//                         <option
//                             style={{
//                                 color: stat.color,
//                                 fontWeight: 'bolder',
//                             }}
//                             key={key}
//                             value={stat.name}
//                         >
//                             {t(stat.name)}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className={cls.InlineBlock}>
//                 <div className={cls.Header}>{t('fromLevel')}</div>
//                 <select
//                     data-testid="fromLevel"
//                     className={cls.Dropdown}
//                     value={fromLevel}
//                     onChange={onChangeFromLevel}
//                 >
//                     {getLevelRange(stat.value).map((value, index) => (
//                         <option
//                             key={index}
//                             value={value}
//                         >
//                             {value}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className={cls.InlineBlock}>
//                 <div className={cls.Header}>{t('toLevel')}</div>
//                 <select
//                     data-testid="toLevel"
//                     className={cls.Dropdown}
//                     value={toLevel}
//                     onChange={onChangeToLevel}
//                 >
//                     {getLevelRange(stat.value).map((value, index) => (
//                         <option
//                             key={index}
//                             value={value}
//                         >
//                             {value}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className={cls.InlineBlock}>
//                 <div className={cls.Price}>{t('cost')}</div>
//                 <span
//                     data-testid="price"
//                     className={cls.Sum}
//                 >
//                     {sum}
//                 </span>
//             </div>
//         </div>
//     ) : (
//         <h2>Stat pricing data is unavailable</h2>
//     );
// };



// export type Stat = {
//     name: string;
//     value: number;
//     rarityClass: number;
//     color: string;
// };
//
// export type AttributesPricingProps = {
//     stats: Stat[];
// };
//
//
// export const AttributesPricing = ({ stats }: AttributesPricingProps): JSX.Element => {
//     const [selectedStat, setSelectedStat] = useState(stats[0]);
//     const [fromLevel, setFromLevel] = useState(stats[0].value);
//     const [toLevel, setToLevel] = useState(stats[0].value);
//     const maxLevel = statsPricingData[1].length + 1;
//     const { t } = useClientTranslation('heroes-stats');
//
//     const getLevelRange = useCallback(
//         (currentLevel: number) => Array.from({ length: maxLevel - currentLevel + 1 }, (_, i) => i + currentLevel),
//         []
//     );
//
//     const handleStatChange = useCallback(
//         (event: React.ChangeEvent<HTMLSelectElement>) => {
//             const statName = event.target.value;
//             const newStat = stats.find((stat) => stat.name === statName) || selectedStat;
//             setSelectedStat(newStat);
//             setFromLevel(newStat.value);
//             setToLevel(newStat.value);
//         },
//         [stats, selectedStat]
//     );
//
//     const handleFromLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
//         setFromLevel(Number(event.target.value));
//     }, []);
//
//     const handleToLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
//         setToLevel(Number(event.target.value));
//     }, []);
//
//     const levelRange = useMemo(() => getLevelRange(selectedStat.value), [selectedStat.value, getLevelRange]);
//
//     const sum = useMemo(() => {
//         if (fromLevel >= toLevel) return 0;
//         let total = 0;
//         for (let i = fromLevel; i < toLevel; i++) {
//             total += statsPricingData[selectedStat.rarityClass][i - 1] * statsPricingData.stepsPerLevel[i - 1];
//         }
//         return total;
//     }, [fromLevel, toLevel, selectedStat.rarityClass]);
//
//     if (!statsPricingData) {
//         return <h2>{t('Stat pricing data is unavailable')}</h2>;
//     }
//
//     return (
//         <div className={cls.AttributePricing}>
//             <div className={cls.InlineBlock}>
//                 <div className={cls.Header}>{t('stat')}</div>
//                 <select
//                     data-testid="stat"
//                     className={cls.Stats}
//                     style={{ color: selectedStat.color, borderColor: selectedStat.color }}
//                     onChange={handleStatChange}
//                 >
//                     {stats.map((stat) => (
//                         <option key={stat.name} value={stat.name} style={{ color: stat.color, fontWeight: 'bolder' }}>
//                             {t(stat.name)}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className={cls.InlineBlock}>
//                 <div className={cls.Header}>{t('fromLevel')}</div>
//                 <select
//                     data-testid="fromLevel"
//                     className={cls.Dropdown}
//                     value={fromLevel}
//                     onChange={handleFromLevelChange}
//                 >
//                     {levelRange.map((value) => (
//                         <option key={value} value={value}>
//                             {value}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className={cls.InlineBlock}>
//                 <div className={cls.Header}>{t('toLevel')}</div>
//                 <select
//                     data-testid="toLevel"
//                     className={cls.Dropdown}
//                     value={toLevel}
//                     onChange={handleToLevelChange}
//                 >
//                     {levelRange.map((value) => (
//                         <option key={value} value={value}>
//                             {value}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className={cls.InlineBlock}>
//                 <div className={cls.Price}>{t('cost')}</div>
//                 <span data-testid="price" className={cls.Sum}>
//           {sum}
//         </span>
//             </div>
//         </div>
//     );
// };


// components/AttributesPricing.tsx

// import React, { useState, useEffect } from 'react';
// import { HeroSlug } from '../../types/hero';
// import { HeroLevel, HeroStats } from '../../types/HeroStats';
// import { HeroStatsManager } from '../../model/stats';
//
//
// interface AttributesPricingProps {
//     heroSlug: HeroSlug;
//     heroLevel: HeroLevel;
// }
//
// export const AttributesPricing: React.FC<AttributesPricingProps> = ({ heroSlug, heroLevel }) => {
//     const statsManager = new HeroStatsManager();
//
//     const [selectedStatName, setSelectedStatName] = useState<keyof HeroStats>('attack');
//     const [fromLevel, setFromLevel] = useState(1);
//     const [toLevel, setToLevel] = useState(2);
//
//     const heroStats = statsManager.getStatsForHero(heroSlug, heroLevel);
//     const statLevels = heroStats ? heroStats[selectedStatName] : [];
//
//     const maxStatLevel = statLevels.length > 0 ? statLevels[statLevels.length - 1].statLevel : 1;
//
//     useEffect(() => {
//         setFromLevel(1);
//         setToLevel(maxStatLevel);
//     }, [selectedStatName, maxStatLevel]);
//
//     const onStatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedStatName(event.target.value as keyof HeroStats);
//     };
//
//     const onChangeFromLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setFromLevel(Number(event.target.value));
//     };
//
//     const onChangeToLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setToLevel(Number(event.target.value));
//     };
//
//     const upgradeInfo =
//         fromLevel < toLevel
//             ? statsManager.getStatUpgradeInfo(
//                 heroSlug,
//                 heroLevel,
//                 selectedStatName,
//                 fromLevel,
//                 toLevel
//             )
//             : undefined;
//
//     const sum = upgradeInfo ? upgradeInfo.price : 0;
//
//     return heroStats ? (
//         <div className="AttributePricing">
//             <div className="InlineBlock">
//                 <div className="Header">Stat</div>
//                 <select
//                     data-testid="stat"
//                     className="Stats"
//                     onChange={onStatChange}
//                     value={selectedStatName}
//                 >
//                     {(['attack', 'defense', 'speed'] as (keyof HeroStats)[]).map((statName) => (
//                         <option key={statName} value={statName}>
//                             {statName}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="InlineBlock">
//                 <div className="Header">From Level</div>
//                 <select
//                     data-testid="fromLevel"
//                     className="Dropdown"
//                     value={fromLevel}
//                     onChange={onChangeFromLevel}
//                 >
//                     {statLevels.map((stat) => (
//                         <option key={stat.statLevel} value={stat.statLevel}>
//                             {stat.statLevel}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="InlineBlock">
//                 <div className="Header">To Level</div>
//                 <select
//                     data-testid="toLevel"
//                     className="Dropdown"
//                     value={toLevel}
//                     onChange={onChangeToLevel}
//                 >
//                     {statLevels.map((stat) => (
//                         <option key={stat.statLevel} value={stat.statLevel}>
//                             {stat.statLevel}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="InlineBlock">
//                 <div className="Price">Cost</div>
//                 <span data-testid="price" className="Sum">
//           {sum}
//         </span>
//             </div>
//         </div>
//     ) : (
//         <h2>Stat data is unavailable</h2>
//     );
// };


// components/AttributesPricing.tsx

interface AttributesPricingProps {
    heroSlug: HeroSlug;
    initialHeroLevel?: HeroLevel;
}

export const AttributesPricing: React.FC<AttributesPricingProps> = ({ heroSlug, initialHeroLevel = 1 }) => {
    const statsStrategy = useMemo(() => new DefaultStatsStrategy(statsData), []);

    const [heroLevel, setHeroLevel] = useState<HeroLevel>(initialHeroLevel);

    const [selectedStatName, setSelectedStatName] = useState<keyof HeroStats>('attack');

    const heroStats = statsStrategy.getStatsForHero(heroSlug, heroLevel);

    const statLevels = heroStats ? heroStats[selectedStatName] : [];

    const maxStatLevel = statLevels.length > 0 ? statLevels[statLevels.length - 1].statLevel : 1;

    const [fromStatLevel, setFromStatLevel] = useState<number>(1);
    const [toStatLevel, setToStatLevel] = useState<number>(1);

    useEffect(() => {
        setFromStatLevel(1);
        setToStatLevel(1);
    }, [selectedStatName, heroLevel]);

    const handleHeroLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setHeroLevel(Number(event.target.value) as HeroLevel);
    }, []);

    const handleStatChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatName(event.target.value as keyof HeroStats);
    }, []);

    const handleFromStatLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setFromStatLevel(Number(event.target.value));
    }, []);

    const handleToStatLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setToStatLevel(Number(event.target.value));
    }, []);

    const upgradeInfo = useMemo(() => {
        if (fromStatLevel >= toStatLevel) return { price: 0 };
        return statsStrategy.getStatUpgradeInfo(
            heroSlug,
            heroLevel,
            selectedStatName,
            fromStatLevel,
            toStatLevel
        );
    }, [statsStrategy, heroSlug, heroLevel, selectedStatName, fromStatLevel, toStatLevel]);

    const totalCost = upgradeInfo ? upgradeInfo.price : 0;

    const availableHeroLevels = useMemo(() => {
        return Object.keys(statsData[heroSlug]).map(Number);
    }, [heroSlug]);

    return heroStats ? (
        <div className="AttributePricing">
            {/* Выбор уровня героя */}
            <div className="InlineBlock">
                <div className="Header">Hero Level</div>
                <select value={heroLevel} onChange={handleHeroLevelChange}>
                    {availableHeroLevels.map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            <div className="InlineBlock">
                <div className="Header">Stat</div>
                <select
                    data-testid="stat"
                    className="Stats"
                    onChange={handleStatChange}
                    value={selectedStatName}
                >
                    {(['attack', 'defense', 'speed'] as (keyof HeroStats)[]).map((statName) => (
                        <option key={statName} value={statName}>
                            {statName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="InlineBlock">
                <div className="Header">From Level</div>
                <select
                    data-testid="fromLevel"
                    className="Dropdown"
                    value={fromStatLevel}
                    onChange={handleFromStatLevelChange}
                >
                    {statLevels.map((stat) => (
                        <option key={stat.statLevel} value={stat.statLevel}>
                            {stat.statLevel}
                        </option>
                    ))}
                </select>
            </div>

            <div className="InlineBlock">
                <div className="Header">To Level</div>
                <select
                    data-testid="toLevel"
                    className="Dropdown"
                    value={toStatLevel}
                    onChange={handleToStatLevelChange}
                >
                    {statLevels.map((stat) => (
                        <option key={stat.statLevel} value={stat.statLevel}>
                            {stat.statLevel}
                        </option>
                    ))}
                </select>
            </div>

            <div className="InlineBlock">
                <div className="Price">Cost</div>
                <span data-testid="price" className="Sum">
                    {totalCost}
                </span>
            </div>
        </div>
    ) : (
        <h2>Stat data is unavailable</h2>
    );
};

