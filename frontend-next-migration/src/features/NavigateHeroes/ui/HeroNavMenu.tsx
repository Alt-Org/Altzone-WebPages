'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import cls from './HeroNavMenu.module.scss';
import { HeroManager, Hero } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { getRouteOneHeroDevPage } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

interface HeroNavMenuProps {
    className?: string;
}

const HeroNavMenu: React.FC<HeroNavMenuProps> = ({ className }) => {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const { t } = useClientTranslation('heroes');
    const pathname = usePathname();
    const selectedHero = pathname.split('/')[3];
    const heroManager = new HeroManager(t);
    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();

    const mods: Mods = {
        [cls.Hidden]: !sidebarVisible,
    };
    const getHero = (hero: Hero, index: number) => {
        if (sidebarVisible) {
            return selectedHero === hero.slug ? (
                <div key={hero.slug + index}>
                    <AppLink
                        isExternal={false}
                        to={getRouteOneHeroDevPage(hero.slug)}
                    >
                        <span className={cls.SelectedHero}>{hero.title}</span>
                    </AppLink>
                </div>
            ) : (
                <div key={hero.slug + index}>
                    <AppLink
                        isExternal={false}
                        to={getRouteOneHeroDevPage(hero.slug)}
                    >
                        <span className={cls.Hero}>{hero.title}</span>
                    </AppLink>
                </div>
            );
        } else {
            return selectedHero === hero.slug ? (
                <div
                    key={hero.slug + index}
                    className={classNames(cls.Hero, mods)}
                    style={{ color: 'var(--secondary-color)' }}
                >
                    {hero.title}
                </div>
            ) : (
                <div
                    key={hero.slug + index}
                    className={classNames(cls.Hero, mods)}
                >
                    {hero.title}
                </div>
            );
        }
    };
    const getList = (
        <div className={classNames(cls.Text, mods, [className || ''])}>
            {allHeroGroups.map((group, index) => (
                <div key={index}>
                    <div className={cls.Group}>{group.name}</div>
                    {group.heroes.map((hero, index) => getHero(hero, index))}
                </div>
            ))}
        </div>
    );

    return (
        <div className={classNames(cls.Root, mods)}>
            {sidebarVisible ? (
                <div
                    className={cls.Arrow}
                    onClick={() => setSidebarVisible(false)}
                >
                    {'<'}
                </div>
            ) : (
                <div
                    className={cls.Arrow}
                    onClick={() => setSidebarVisible(true)}
                >
                    {'>'}
                </div>
            )}
            {getList}
        </div>
    );
};

export default HeroNavMenu;
