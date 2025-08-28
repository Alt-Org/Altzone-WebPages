'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import cls from './HeroGroupNavMenu.module.scss';
import { HeroGroup } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import { getRouteDefenseGalleryGroupPage } from '@/shared/appLinks/RoutePaths';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';

interface HeroGroupNavMenuProps {
    className?: string;
}

const HeroGroupNavMenu: React.FC<HeroGroupNavMenuProps> = ({ className: _className }) => {
    const { t } = useClientTranslation('heroes');
    const pathname = usePathname();
    const selectedHeroGroup = pathname.split('/')[3];
    const allHeroGroups = initializeHeroGroups(t);

    function capitalizeString(inputString: HeroGroup | string) {
        if (!inputString) return '';
        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('defense-classes'),
        openByDefault: true,
        titleAsActive: false,
        staticDropdown: true,
        dropdownItems: Object.keys(allHeroGroups).map((group) => ({
            elementText: capitalizeString(allHeroGroups[group as HeroGroup].name),
            link: {
                path: getRouteDefenseGalleryGroupPage(group),
                isExternal: false,
            },
            active: group === selectedHeroGroup,
        })),
    };

    return (
        <div className={cls.Dropdown}>
            <NavMenuWithDropdowns {...navMenuWithDropdownsDesktopProps} />
        </div>
    );
};

export default HeroGroupNavMenu;
