'use client';
import React from 'react';
import { HeroManager } from '@/entities/Hero';
import { usePathname } from 'next/navigation';
import cls from './HeroDevelopmentNavMenuAsDropdown.module.scss';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropdownItem,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { getRouteOneHeroDevPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';

const HeroDevelopmentNavMenuAsDropdown: React.FC = () => {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const { t } = useClientTranslation('heroes');
    const pathname = usePathname();
    const selectedHero = pathname.split('/')[3];
    const heroManager = new HeroManager(t);

    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();

    const dropdownItems: DropdownItem[] = allHeroGroups.map((group) => ({
        title: group.name.charAt(0) + group.name.slice(1).toLowerCase(),
        openByDefault: false,
        elements: group.heroes.map((hero) => ({
            elementText: hero.title,
            id: hero.id.toString(),
            active: selectedHero === hero.slug,
            link: { path: getRouteOneHeroDevPage(hero.slug), isExternal: false },
        })),
    }));

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('section-title'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('section-title'),
        openByDefault: true,
        staticDropdown: true,
        dropdownItems: dropdownItems,
    };

    return (
        <div>
            <nav style={isTouchDevice ? { display: 'contents' } : { display: 'none' }}>
                <NavMenuWithDropdowns
                    className={cls.Width}
                    {...navMenuWithDropdownsMobileProps}
                />
            </nav>
            <nav style={isTouchDevice ? { display: 'none' } : { display: 'block' }}>
                <NavMenuWithDropdowns
                    className={cls.Width}
                    {...navMenuWithDropdownsDesktopProps}
                />
            </nav>
        </div>
    );
};

export default HeroDevelopmentNavMenuAsDropdown;
