'use client';
import React from 'react';
import { HeroGroup } from '@/entities/Hero';
import { usePathname } from 'next/navigation';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { getRouteDefenseGalleryGroupPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';

interface HeroNavMenuProps {
    className?: string;
}

const HeroGroupNavMenuAsDropdown: React.FC<HeroNavMenuProps> = ({ className }) => {
    const { t } = useClientTranslation('heroes');
    const pathname = usePathname();
    const selectedHeroGroup = pathname.split('/')[3];

    const allHeroGroups = initializeHeroGroups(t);

    function capitalizeString(inputString: HeroGroup | string) {
        if (!inputString) return '';

        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }

    const dropdownItems: DropDownElementASTextOrLink[] = Object.keys(allHeroGroups).map(
        (group) => ({
            elementText: capitalizeString(group),
            link: { path: getRouteDefenseGalleryGroupPage(group as HeroGroup), isExternal: false },
            active: group === selectedHeroGroup,
        }),
    );

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: t('defense-classes'),
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

export default HeroGroupNavMenuAsDropdown;
