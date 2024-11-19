import { useState } from 'react';
import { DefaultStatsStrategy } from '../../model/stats/DefaultStatsStrategy';
import { statsData } from '../../model/stats/statsData';
import { HeroSlug } from '../../types/hero';
import { HeroStats } from '../../types/HeroStats';

interface AttributesPricing2Props {
    initialHeroSlug: HeroSlug;
    initialLevel?: number;
}

export const AttributesPricingTable: React.FC<AttributesPricing2Props> = ({ initialHeroSlug, initialLevel = 1 }) => {
    const [heroSlug, setHeroSlug] = useState<HeroSlug>(initialHeroSlug);
    const [level, setLevel] = useState<number>(initialLevel);

    const statsStrategy = new DefaultStatsStrategy(statsData);

    const heroStats = statsStrategy.getStatsForHero(heroSlug, level);

    if (!heroStats) {
        return (
            <div style={{ color: 'red', fontWeight: 'bold' }}>
                Statistics for this hero at level {level} are unavailable.
            </div>
        );
    }

    const heroSlugs = Object.keys(statsData) as HeroSlug[];
    const availableLevels = Object.keys(statsData[heroSlug]).map(Number);

    const handleHeroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedHero = event.target.value as HeroSlug;
        setHeroSlug(selectedHero);
        setLevel(initialLevel);
    };

    const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel(Number(event.target.value));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#333', color: 'white' }}>
            <h2 style={{ textTransform: 'capitalize', color: '#fff' }}>{heroSlug}</h2>

            <label style={{ display: 'block', marginBottom: '20px' }}>
                <span style={{ marginRight: '10px' }}>Select Hero:</span>
                <select
                    value={heroSlug}
                    onChange={handleHeroChange}
                    style={{ padding: '5px', fontSize: '16px', backgroundColor: '#555', color: 'white', border: '1px solid #777' }}
                >
                    {heroSlugs.map((slug) => (
                        <option key={slug} value={slug} style={{ backgroundColor: '#555', color: 'white' }}>
                            {slug}
                        </option>
                    ))}
                </select>
            </label>

            <label style={{ display: 'block', marginBottom: '20px' }}>
                <span style={{ marginRight: '10px' }}>Select Hero Level:</span>
                <select
                    value={level}
                    onChange={handleLevelChange}
                    style={{ padding: '5px', fontSize: '16px', backgroundColor: '#555', color: 'white', border: '1px solid #777' }}
                >
                    {availableLevels.map((lvl) => (
                        <option key={lvl} value={lvl} style={{ backgroundColor: '#555', color: 'white' }}>
                            {lvl}
                        </option>
                    ))}
                </select>
            </label>

            {(['attack', 'defense', 'speed'] as Array<keyof HeroStats>).map((statName) => {
                const statLevels = heroStats[statName];
                return (
                    <div key={statName} style={{ marginBottom: '30px' }}>
                        <h3 style={{ textTransform: 'capitalize', color: '#ccc' }}>{statName}</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th style={{ border: '1px solid #555', padding: '8px', backgroundColor: '#444', color: 'white' }}>
                                    Stat Level
                                </th>
                                <th style={{ border: '1px solid #555', padding: '8px', backgroundColor: '#444', color: 'white' }}>
                                    Value
                                </th>
                                <th style={{ border: '1px solid #555', padding: '8px', backgroundColor: '#444', color: 'white' }}>
                                    Cost
                                </th>
                                <th style={{ border: '1px solid #555', padding: '8px', backgroundColor: '#444', color: 'white' }}>
                                    Upgrade Potential
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {statLevels.map((statLevel, index) => (
                                <tr
                                    key={statLevel.statLevel}
                                    style={{
                                        backgroundColor: index % 2 === 0 ? '#555' : '#666',
                                        color: 'white',
                                    }}
                                >
                                    <td style={{ border: '1px solid #555', padding: '8px' }}>
                                        {statLevel.statLevel}
                                    </td>
                                    <td style={{ border: '1px solid #555', padding: '8px' }}>
                                        {statLevel.value}
                                    </td>
                                    <td style={{ border: '1px solid #555', padding: '8px' }}>
                                        {statLevel.cost}
                                    </td>
                                    <td style={{ border: '1px solid #555', padding: '8px' }}>
                                        {statLevel.upgradePotential}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};
