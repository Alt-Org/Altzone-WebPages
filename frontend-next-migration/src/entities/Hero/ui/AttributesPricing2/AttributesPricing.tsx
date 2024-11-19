// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { statsData } from '../../model/stats/statsData';
// import { HeroSlug } from '../../types/hero';
// import { HeroLevel, HeroStats } from '../../types/HeroStats';
// import { HeroStatsManager } from '@/entities/Hero';
//
// interface AttributesPricingProps {
//     initialHeroSlug: HeroSlug;
//     initialHeroLevel?: HeroLevel;
// }
//
// export const AttributesPricing: React.FC<AttributesPricingProps> = (
//     {
//         initialHeroSlug,
//         initialHeroLevel = 1,
// }) => {
//     const heroStatsManager = new HeroStatsManager();
//     const [heroLevel, setHeroLevel] = useState<HeroLevel>(initialHeroLevel);
//
//     const [heroSlug, setHeroSlug] = useState<HeroSlug>(initialHeroSlug);
//
//
//     const [selectedStatName, setSelectedStatName] = useState<keyof HeroStats>('attack');
//
//     const heroStats = heroStatsManager.getStatsForHero(initialHeroSlug, heroLevel);
//
//     const statLevels = heroStats ? heroStats[selectedStatName] : [];
//
//     // const maxStatLevel = statLevels.length > 0 ? statLevels[statLevels.length - 1].statLevel : 1;
//
//     const [fromStatLevel, setFromStatLevel] = useState<number>(1);
//     const [toStatLevel, setToStatLevel] = useState<number>(1);
//
//     useEffect(() => {
//         setFromStatLevel(1);
//         setToStatLevel(1);
//     }, [selectedStatName, heroLevel]);
//
//     const handleHeroLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
//         setHeroLevel(Number(event.target.value) as HeroLevel);
//     }, []);
//
//     const handleStatChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedStatName(event.target.value as keyof HeroStats);
//     }, []);
//
//     const handleFromStatLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
//         setFromStatLevel(Number(event.target.value));
//     }, []);
//
//     const handleToStatLevelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
//         setToStatLevel(Number(event.target.value));
//     }, []);
//
//     const upgradeInfo = useMemo(() => {
//         if (fromStatLevel >= toStatLevel) return { price: 0 };
//         return heroStatsManager.getStatUpgradeInfo(
//             heroSlug,
//             heroLevel,
//             selectedStatName,
//             fromStatLevel,
//             toStatLevel,
//         );
//     }, [heroSlug, heroLevel, selectedStatName, fromStatLevel, toStatLevel]);
//
//     const totalCost = upgradeInfo ? upgradeInfo.price : 0;
//
//     const availableHeroLevels = useMemo(() => {
//         return Object.keys(statsData[heroSlug]).map(Number);
//     }, [heroSlug]);
//
//     return heroStats ? (
//         <div className="AttributePricing">
//             <div className="InlineBlock">
//                 <div className="Header">Hero Level</div>
//                 <select
//                     value={heroLevel}
//                     onChange={handleHeroLevelChange}
//                 >
//                     {availableHeroLevels.map((level) => (
//                         <option
//                             key={level}
//                             value={level}
//                         >
//                             {level}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//
//             <div className="InlineBlock">
//                 <div className="Header">Stat</div>
//                 <select
//                     data-testid="stat"
//                     className="Stats"
//                     onChange={handleStatChange}
//                     value={selectedStatName}
//                 >
//                     {(['attack', 'defense', 'speed'] as (keyof HeroStats)[]).map((statName) => (
//                         <option
//                             key={statName}
//                             value={statName}
//                         >
//                             {statName}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//
//             <div className="InlineBlock">
//                 <div className="Header">From Level</div>
//                 <select
//                     data-testid="fromLevel"
//                     className="Dropdown"
//                     value={fromStatLevel}
//                     onChange={handleFromStatLevelChange}
//                 >
//                     {statLevels.map((stat) => (
//                         <option
//                             key={stat.statLevel}
//                             value={stat.statLevel}
//                         >
//                             {stat.statLevel}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//
//             <div className="InlineBlock">
//                 <div className="Header">To Level</div>
//                 <select
//                     data-testid="toLevel"
//                     className="Dropdown"
//                     value={toStatLevel}
//                     onChange={handleToStatLevelChange}
//                 >
//                     {statLevels.map((stat) => (
//                         <option
//                             key={stat.statLevel}
//                             value={stat.statLevel}
//                         >
//                             {stat.statLevel}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//
//             <div className="InlineBlock">
//                 <div className="Price">Cost</div>
//                 <span
//                     data-testid="price"
//                     className="Sum"
//                 >
//                     {totalCost}
//                 </span>
//             </div>
//         </div>
//     ) : (
//         <h2>Stat data is unavailable</h2>
//     );
// };

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { statsData } from '../../model/stats/statsData';
import { HeroSlug } from '../../types/hero';
import { HeroLevel, HeroStats } from '../../types/HeroStats';
import { HeroStatsManager } from '@/entities/Hero';

interface AttributesPricingProps {
    initialHeroSlug: HeroSlug;
    initialHeroLevel?: HeroLevel;
}

export const AttributesPricing: React.FC<AttributesPricingProps> = ({
    initialHeroSlug,
    initialHeroLevel = 1,
}) => {
    const heroStatsManager = new HeroStatsManager();

    const [heroSlug, setHeroSlug] = useState<HeroSlug>(initialHeroSlug);
    const [heroLevel, setHeroLevel] = useState<HeroLevel>(initialHeroLevel);
    const [selectedStatName, setSelectedStatName] = useState<keyof HeroStats>('attack');
    const [fromStatLevel, setFromStatLevel] = useState<number>(1);
    const [toStatLevel, setToStatLevel] = useState<number>(1);

    const heroStats = useMemo(
        () => heroStatsManager.getStatsForHero(heroSlug, heroLevel),
        [heroSlug, heroLevel],
    );

    const statLevels = heroStats ? heroStats[selectedStatName] : [];

    useEffect(() => {
        setFromStatLevel(1);
        setToStatLevel(1);
    }, [selectedStatName, heroSlug, heroLevel]);

    const handleHeroSlugChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setHeroSlug(event.target.value as HeroSlug);
    }, []);

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
        return heroStatsManager.getStatUpgradeInfo(
            heroSlug,
            heroLevel,
            selectedStatName,
            fromStatLevel,
            toStatLevel,
        );
    }, [heroSlug, heroLevel, selectedStatName, fromStatLevel, toStatLevel]);

    const totalCost = upgradeInfo ? upgradeInfo.price : 0;

    const availableHeroLevels = useMemo(() => {
        return Object.keys(statsData[heroSlug]).map(Number);
    }, [heroSlug]);

    const availableHeroSlugs = useMemo(() => {
        return Object.keys(statsData) as HeroSlug[];
    }, []);

    return heroStats ? (
        <div className="AttributePricing">
            <div className="InlineBlock">
                <div className="Header">Hero</div>
                <select
                    value={heroSlug}
                    onChange={handleHeroSlugChange}
                >
                    {availableHeroSlugs.map((slug) => (
                        <option
                            key={slug}
                            value={slug}
                        >
                            {slug}
                        </option>
                    ))}
                </select>
            </div>

            <div className="InlineBlock">
                <div className="Header">Hero Level</div>
                <select
                    value={heroLevel}
                    onChange={handleHeroLevelChange}
                >
                    {availableHeroLevels.map((level) => (
                        <option
                            key={level}
                            value={level}
                        >
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
                        <option
                            key={statName}
                            value={statName}
                        >
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
                        <option
                            key={stat.statLevel}
                            value={stat.statLevel}
                        >
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
                        <option
                            key={stat.statLevel}
                            value={stat.statLevel}
                        >
                            {stat.statLevel}
                        </option>
                    ))}
                </select>
            </div>

            <div className="InlineBlock">
                <div className="Price">Cost</div>
                <span
                    data-testid="price"
                    className="Sum"
                >
                    {totalCost}
                </span>
            </div>
        </div>
    ) : (
        <h2>Stat data is unavailable</h2>
    );
};
