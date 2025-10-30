'use client';
import React from 'react';
import { HeroManager } from '@/entities/Hero';
import { usePathname } from 'next/navigation';
import cls from './SingleHeroNavMenuAsDropdown.module.scss';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropdownItem,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { getRouteOneHeroPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames } from '@/shared/lib/classNames/classNames';

const SingleHeroNavMenuAsDropdown: React.FC = () => {
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
            link: {
                path: getRouteOneHeroPage(hero.slug),
                isExternal: false,
            },
        })),
    }));

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('defense-classes'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('defense-classes'),
        openByDefault: true,
        staticDropdown: true,
        dropdownItems: dropdownItems,
    };

    return (
        <div>
            {isTouchDevice ? (
                <nav className={cls.NavMenuWithDropdownsTouch}>
                    <NavMenuWithDropdowns
                        className={cls.Width}
                        {...navMenuWithDropdownsMobileProps}
                    />
                </nav>
            ) : (
                <nav className={cls.marginTop}>
                    <NavMenuWithDropdowns
                        className={cls.Width}
                        {...navMenuWithDropdownsDesktopProps}
                    />
                </nav>
            )}
        </div>
    );
};

export default SingleHeroNavMenuAsDropdown;
