'use client';
import React from 'react';
import { HeroManager } from '@/entities/Hero';
import { usePathname } from 'next/navigation';
import cls from './HeroDevelopmentNavMenuAsDropdown.module.scss';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropdownItem,
} from '@/shared/ui/NavMenuWithDropdowns';
import { getRouteOneHeroDevPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';

const HeroDevelopmentNavMenuAsDropdown: React.FC = () => {
    const { t } = useClientTranslation('heroes');
    const pathname = usePathname();
    const selectedHero = pathname.split('/')[3];
    const heroManager = new HeroManager(t);

    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();

    const dropdownItems: DropdownItem[] = allHeroGroups.map((group) => ({
        title: group.name,
        openByDefault: false,
        elements: group.heroes.map((hero) => ({
            elementText: hero.title,
            id: hero.id.toString(),
            active: selectedHero === hero.slug,
            link: { path: getRouteOneHeroDevPage(hero.slug), isExternal: false },
        })),
    }));

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: t('section-title'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };

    return (
        <NavMenuWithDropdowns
            className={cls.Width}
            {...navMenuWithDropdownsProps}
        />
    );
};

export default HeroDevelopmentNavMenuAsDropdown;
