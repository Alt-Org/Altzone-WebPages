'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import cls from './HeroDevelopmentPage.module.scss';
import {
    AttributesPie,
    AttributesPricing3,
    BarChart,
    Hero,
    Stat,
    rarityClassNames,
    color,
    statsPricingData,
} from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

export interface HeroDevelopmentPageProps {
    hero: Hero | undefined;
}

const HeroDevelopmentPage: React.FC<HeroDevelopmentPageProps> = ({ hero }) => {
    const [stat, setStat] = useState<Stat>({ name: 'resistance', defaultLevel: 1, rarityClass: 1 });
    const [toLevel, setToLevel] = useState<number>(0);
    const [fromLevel, setFromLevel] = useState<number>(0);
    const [upgradePotential, setUpgradePotential] = useState<number>(10);
    const { t } = useClientTranslation('hero-development');

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
                                    <td
                                        style={{ width: '12em' }}
                                        className={cls.FatGreen}
                                    >
                                        {upgradePotential}
                                    </td>
                                </tr>
                                <tr>
                                    <td>{t('rarityClass')}</td>
                                    <td style={{ width: '12em' }}>
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
        else
            return hero ? (
                <div className={cls.FatePriest}>{t('fatePriestCannotBeDeveloped')}</div>
            ) : (
                <div />
            );
    };
    if (!statsPricingData) {
        return <h2>{t('Stat pricing data is unavailable')}</h2>;
    }
    return (
        <div className={cls.Root}>
            <div className={classNames(cls.Header, combinedModCss)}>{t('title')}</div>
            {hero === undefined ? (
                <div className={cls.Purpose}>{t('text')}</div>
            ) : (
                <div className={classNames(cls.HeroAndChart, combinedModCss)}>
                    <div className={classNames(cls.Hero, combinedModCss)}>
                        {hero && (
                            <Image
                                className={classNames(cls.Image, combinedModCss)}
                                src={hero?.srcImg}
                                alt="kuva"
                            />
                        )}
                        <div>{hero && <h1 className={cls.Title}>{hero.title}</h1>}</div>
                    </div>
                    {hero && (
                        <div className={classNames(cls.BarChartBlock, combinedModCss)}>
                            <BarChart stats={hero?.stats} />
                        </div>
                    )}
                </div>
            )}
            {getDevelopment()}
        </div>
    );
};

export default HeroDevelopmentPage;
