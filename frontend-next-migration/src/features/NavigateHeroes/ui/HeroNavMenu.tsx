'use client';
import React from 'react';
import { HeroManager } from '@/entities/Hero';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropdownItem,
} from '@/shared/ui/NavMenuWithDropdowns';
import { getRouteOneHeroPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';

interface HeroNavMenuProps {
    className?: string;
}

const HeroNavMenu: React.FC<HeroNavMenuProps> = ({ className }) => {
    const { t } = useClientTranslation('heroes');
    const heroManager = new HeroManager(t);

    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();

    const dropdownItems: DropdownItem[] = allHeroGroups.map((group) => ({
        title: group.name,
        openByDefault: false,
        elements: group.heroes.map((hero) => ({
            elementText: hero.title,
            id: hero.id.toString(),
            link: { path: getRouteOneHeroPage(hero.slug), isExternal: false },
        })),
    }));

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: t('section-title'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };

    return (
        <NavMenuWithDropdowns
            className={className}
            {...navMenuWithDropdownsProps}
        />
    );
};

export default HeroNavMenu;
