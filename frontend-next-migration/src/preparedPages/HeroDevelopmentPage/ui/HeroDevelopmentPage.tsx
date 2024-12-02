'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import cls from './HeroDevelopmentPage.module.scss';
import { HeroManager } from '@/entities/Hero';
import { HeroWithGroup, HeroSlug } from '@/entities/Hero/types/hero';
import { BarChart } from '@/entities/Hero/ui/BarChart/BarChart';
import { color } from '@/entities/Hero/model/stats/statsDataV2';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import HeroMenuAsDropdown from '@/features/NavigateHeroes/ui/HeroMenuAsDropdown';

const HeroDevelopmentPage = () => {
    const [hero, setHero] = useState<HeroWithGroup | undefined>(undefined);
    const [key, setKey] = useState(Math.random());
    const { t } = useClientTranslation('heroes');
    const heroManager = new HeroManager(t);

    const onClickHero = useCallback((heroSlug: HeroSlug) => {
        const hero = heroManager.getHeroBySlug(heroSlug);
        if (hero)
            hero.stats.forEach((stat) => {
                stat.color = color[stat.name];
            });
        setKey(Math.random());
        setHero(hero);
    }, []);

    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
    const combinedModCss: Mods = {
        [cls.isMobile]: isMobileSize,
        [cls.isTablet]: isTabletSize,
        [cls.isDesktop]: isDesktopSize,
        [cls.isWidescreen]: isWidescreenSize,
    };

    return (
        <main className={classNames(cls.main, combinedModCss)}>
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
        </main>
    );
};

export default HeroDevelopmentPage;
