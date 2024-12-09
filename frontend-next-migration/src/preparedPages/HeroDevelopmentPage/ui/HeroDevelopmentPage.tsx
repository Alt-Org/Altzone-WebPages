'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import cls from './HeroDevelopmentPage.module.scss';
import { HeroManager, AttributesPie } from '@/entities/Hero';
import { HeroWithGroup, HeroSlug, Stat } from '@/entities/Hero/types/hero';
import { BarChart } from '@/entities/Hero/ui/BarChart/BarChart';
import { color, rarityClassNames } from '@/entities/Hero/model/stats/statsDataV2';
import { statsPricingData } from '@/entities/Hero/model/stats/statsPricingData';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AttributesPricing3 } from '@/entities/Hero/ui/AttributesPricing3/AttributesPricingV3';
import HeroMenuAsDropdown from '@/features/NavigateHeroes/ui/HeroMenuAsDropdown';

const HeroDevelopmentPage = () => {
    const [hero, setHero] = useState<HeroWithGroup>();
    const [key, setKey] = useState(Math.random());
    const [stat, setStat] = useState<Stat>({ name: 'hp', defaultLevel: 1, rarityClass: 1 });
    const [toLevel, setToLevel] = useState<number>(0);
    const [fromLevel, setFromLevel] = useState<number>(0);
    const [upgradePotential, setUpgradePotential] = useState<number>(10);
    const translation = useClientTranslation('heroes');
    const { t } = useClientTranslation('heroes-stats-pricing');
    const heroManager = new HeroManager(translation.t);

    const onClickHero = useCallback(
        (heroSlug: HeroSlug) => {
            const hero = heroManager.getHeroBySlug(heroSlug);
            if (hero) {
                hero.stats.forEach((stat) => {
                    stat.color = color[stat.name];
                });
                setStat(hero.stats[0]);
                setFromLevel(hero.stats[0].defaultLevel + (hero.stats[0].developmentLevel || 0));
                setToLevel(hero.stats[0].defaultLevel + (hero.stats[0].developmentLevel || 0));
                setHero(hero);
            }
            setKey(Math.random());
        },
        [hero],
    );

    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
    const combinedModCss: Mods = {
        [cls.isMobile]: isMobileSize,
        [cls.isTablet]: isTabletSize,
        [cls.isDesktop]: isDesktopSize,
        [cls.isWidescreen]: isWidescreenSize,
    };

    const defaultSlice = useMemo(
        () => ({
            max: hero ? hero.stats.reduce((acc: number, stat) => stat.defaultLevel + acc, 0) : 0,
            sections: hero
                ? hero.stats.map((stat) => ({
                      value: stat.defaultLevel,
                      color: color[stat.name],
                  }))
                : [{ value: 0, color: 'black' }],
        }),
        [hero, hero?.stats],
    );

    const upgradeSlice = useMemo(
        () => ({
            max: 10,
            sections: [
                {
                    value: toLevel - stat.defaultLevel,
                    color: color[stat.name],
                },
                { value: upgradePotential, color: 'transparent' },
            ],
        }),
        [toLevel, stat],
    );
    const getDevelopment = () => {
        // fate-priest cannot be developed
        if (hero && hero.slug !== 'fate-priest')
            return (
                <>
                    <div className={classNames(cls.AttributesPricingBlock, combinedModCss)}>
                        <AttributesPricing3
                            selectedStat={stat}
                            setSelectedStat={setStat}
                            fromLevel={fromLevel}
                            setFromLevel={setFromLevel}
                            toLevel={toLevel}
                            setToLevel={setToLevel}
                            setUpgradePotential={setUpgradePotential}
                            stats={hero.stats}
                        />
                    </div>
                    <div className={classNames(cls.InfoSection, combinedModCss)}>
                        <table className={cls.InfoTable}>
                            <tbody>
                                <tr>
                                    <td>{t('upgradePotentialAfterUpdate')}</td>
                                    <td className={cls.FatGreen}>{upgradePotential}</td>
                                </tr>
                                <tr>
                                    <td>{t('rarityClass')}</td>
                                    <td>
                                        <span className={cls.FatGreen}>
                                            {t(rarityClassNames[stat.rarityClass])}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={cls.Pie}>
                            <AttributesPie
                                characterDefault={defaultSlice}
                                characterUpgrade={upgradeSlice}
                                borderwidth={2}
                                bordercolor="#000000"
                                radius={70}
                            />
                        </div>
                    </div>
                    <table className={cls.PriceTable}>
                        <tbody>
                            <tr>
                                <th>{t('level')}</th>
                                <th>{t('stepsPerLevel')}</th>
                                <th>{t('stepsPrice')}</th>
                                <th>{t('price')}</th>
                            </tr>
                            {statsPricingData.stepsPerLevel.map((value, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value}</td>
                                    <td>
                                        {statsPricingData[stat.rarityClass]
                                            ? statsPricingData[stat.rarityClass][index]
                                            : ''}
                                    </td>
                                    <td>
                                        {statsPricingData[stat.rarityClass]
                                            ? value * statsPricingData[stat.rarityClass][index]
                                            : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            );
        else return <div />;
    };
    if (!statsPricingData) {
        return <h2>{t('Stat pricing data is unavailable')}</h2>;
    }
    return (
        <main className={classNames(cls.main, combinedModCss)}>
            <div className={classNames(cls.HeroAndChart, combinedModCss)}>
                <div className={classNames(cls.Hero, combinedModCss)}>
                    <div className={cls.dropdown}>
                        <HeroMenuAsDropdown
                            key={key}
                            onClickCallback={onClickHero}
                        />
                        {hero && (
                            <Image
                                className={classNames(cls.Image, combinedModCss)}
                                src={hero?.srcImg}
                                alt="kuva"
                            />
                        )}
                    </div>
                    {hero && <h1 className={cls.Title}>{hero.title}</h1>}
                </div>

                {hero && (
                    <div className={classNames(cls.BarChartBlock, combinedModCss)}>
                        <BarChart stats={hero?.stats} />
                    </div>
                )}
            </div>
            {getDevelopment()}
        </main>
    );
};

export default HeroDevelopmentPage;
