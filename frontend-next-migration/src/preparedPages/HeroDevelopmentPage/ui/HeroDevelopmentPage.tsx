'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import cls from './HeroDevelopmentPage.module.scss';
import { HeroManager } from '@/entities/Hero';
import { HeroWithGroup, HeroSlug } from '@/entities/Hero/types/hero';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropdownItem,
} from '@/shared/ui/NavMenuWithDropdowns';
import { BarChart } from '@/entities/Hero/ui/BarChart/BarChart';
import { color } from '@/entities/Hero/model/stats/statsDataV2';
import { useClientTranslation } from '@/shared/i18n';

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
        setHero(hero);
        setKey(Math.random());
    }, []);
    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();

    const dropdownItems: DropdownItem[] = allHeroGroups.map((group) => ({
        title: group.name,
        openByDefault: false,
        elements: group.heroes.map((hero) => ({
            elementText: hero.title,
            id: hero.id.toString(),
            onClickCallback: () => onClickHero(hero.slug),
        })),
    }));
    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: t('section-title'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };
    return (
        <main className={cls.main}>
            <div className={cls.Hero}>
                <div className={cls.dropdown}>
                    <NavMenuWithDropdowns
                        key={key}
                        {...navMenuWithDropdownsProps}
                    />
                    {hero && (
                        <Image
                            src={hero?.srcImg}
                            alt="kuva"
                        />
                    )}
                </div>
                {hero && <h1 className={cls.Title}>{hero.title}</h1>}
            </div>

            <div className={cls.BarChartBlock}>{hero && <BarChart stats={hero?.stats} />}</div>
        </main>
    );
};

export default HeroDevelopmentPage;
