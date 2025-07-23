'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import cls from './HeroGroupNavMenu.module.scss';
import { HeroManager, Hero, HeroGroup } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { getRouteDefenseGalleryGroupPage } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';

interface HeroGroupNavMenuProps {
    className?: string;
}

const HeroGroupNavMenu: React.FC<HeroGroupNavMenuProps> = ({ className }) => {
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
    const { t } = useClientTranslation('heroes');
    const pathname = usePathname();
    const selectedHeroGroup = pathname.split('/')[3];
    const heroManager = new HeroManager(t);
    const allHeroGroups = initializeHeroGroups(t);

    function capitalizeString(inputString: HeroGroup | string) {
        if (!inputString) return '';

        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }

    const getHeroGroup = (heroGroup: HeroGroup, index: number) => {
        return selectedHeroGroup === heroGroup ? (
            <div key={heroGroup + index}>
                <AppLink
                    isExternal={false}
                    to={getRouteDefenseGalleryGroupPage(heroGroup)}
                >
                    <span className={cls.SelectedHeroGroup}>
                        {capitalizeString(allHeroGroups[heroGroup].name)}
                    </span>
                </AppLink>
            </div>
        ) : (
            <div key={heroGroup + index}>
                <AppLink
                    isExternal={false}
                    to={getRouteDefenseGalleryGroupPage(heroGroup)}
                >
                    <span className={cls.HeroGroup}>
                        {capitalizeString(allHeroGroups[heroGroup].name)}
                    </span>
                </AppLink>
            </div>
        );
    };
    const getList = (
        <div className={classNames(cls.Text, undefined, [className || ''])}>
            <p className={cls.Title}>{t('defense-classes')}</p>
            {Object.keys(allHeroGroups).map((group, index) => (
                <div key={index}>
                    <div>{getHeroGroup(group as HeroGroup, index)}</div>
                </div>
            ))}
        </div>
    );
    return <div className={cls.Root}>{getList}</div>;
};

export default HeroGroupNavMenu;
