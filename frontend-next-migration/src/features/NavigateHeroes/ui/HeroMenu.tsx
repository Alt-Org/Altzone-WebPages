'use client';
import React from 'react';
import cls from './HeroMenu.module.scss';
import { HeroManager, HeroSlug, Hero } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

interface HeroMenuProps {
    className?: string;
    onClickCallback: (heroSlug: HeroSlug) => void;
    selectedHero: HeroSlug;
    sidebarVisible: boolean;
    setSidebarVisible: (visible: boolean) => void;
}

const HeroMenu: React.FC<HeroMenuProps> = ({
    sidebarVisible,
    setSidebarVisible,
    className,
    onClickCallback,
    selectedHero,
}) => {
    const { t } = useClientTranslation('heroes');
    const heroManager = new HeroManager(t);
    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();

    const mods: Mods = {
        [cls.Hidden]: !sidebarVisible,
    };
    const getHero = (hero: Hero, index: number) => {
        if (sidebarVisible) {
            return selectedHero === hero.slug ? (
                <div
                    onClick={() => onClickCallback(hero.slug)}
                    key={index}
                    className={cls.Hero}
                    style={{ color: 'var(--secondary-color)' }}
                >
                    {hero.title}
                </div>
            ) : (
                <div
                    onClick={() => onClickCallback(hero.slug)}
                    key={index}
                    className={cls.Hero}
                >
                    {hero.title}
                </div>
            );
        } else {
            return selectedHero === hero.slug ? (
                <div
                    key={index}
                    className={classNames(cls.Hero, mods)}
                    style={{ color: 'var(--secondary-color)' }}
                >
                    {hero.title}
                </div>
            ) : (
                <div
                    key={index}
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
                <>
                    <div
                        key={index + group.name}
                        className={cls.Group}
                    >
                        {group.name}
                    </div>
                    {group.heroes.map((hero, index) => getHero(hero, index))}
                </>
            ))}
        </div>
    );

    return (
        <div className={classNames(cls.Box, mods)}>
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

export default HeroMenu;
