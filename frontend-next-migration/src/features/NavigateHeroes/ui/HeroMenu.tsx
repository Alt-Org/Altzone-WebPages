'use client';
import React, { useState } from 'react';
import cls from './HeroMenu.module.scss';
import { HeroManager, HeroSlug } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';

interface HeroMenuProps {
    className?: string;
    onClickCallback: (heroSlug: HeroSlug) => void;
    selectedHero: HeroSlug;
}

const HeroMenu: React.FC<HeroMenuProps> = ({ className, onClickCallback, selectedHero }) => {
    const [visible, setVisible] = useState<boolean>(true);
    const { t } = useClientTranslation('heroes');
    const heroManager = new HeroManager(t);
    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();

    const getList = (
        <div className={classNames(cls.Text, undefined, [className || ''])}>
            {allHeroGroups.map((group, index) => (
                <>
                    <div key={index + group.name}>{group.name}</div>
                    {group.heroes.map((hero, index) =>
                        selectedHero === hero.slug ? (
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
                        ),
                    )}
                </>
            ))}
        </div>
    );

    return (
        <div className={cls.Box}>
            {visible ? (
                <>
                    <div
                        className={cls.Arrow}
                        onClick={() => setVisible(false)}
                    >
                        {'<'}
                    </div>
                    <div>{getList}</div>
                </>
            ) : (
                <>
                    <div
                        className={cls.Arrow}
                        onClick={() => setVisible(true)}
                    >
                        {'>'}
                    </div>
                    <div style={{ width: '0', overflow: 'hidden' }}>{getList}</div>
                </>
            )}
        </div>
    );
};

export default HeroMenu;
