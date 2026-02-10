'use client';
import React from 'react';
import { usePathname, useParams } from 'next/navigation';
import cls from './HeroGroupNavMenu.module.scss';
import { HeroGroup } from '@/entities/Hero';
import { useGetHeroGroupsQuery } from '@/entities/Hero/model/heroApi';
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
    const params = useParams();
    const lng = (params?.lng as string) || 'en';
    const locale = (lng === 'en' ? 'en' : lng === 'fi' ? 'fi' : 'ru') as 'en' | 'fi' | 'ru';
    const selectedHeroGroup = pathname.split('/')[3];

    // Try to fetch from Directus first, fallback to static data
    const { data: directusGroups } = useGetHeroGroupsQuery({ locale });
    const staticGroups = React.useMemo(() => initializeHeroGroups(t), [t]);
    const allHeroGroups = React.useMemo(() => {
        if (directusGroups && Object.keys(directusGroups).length > 0) {
            return directusGroups;
        }
        return staticGroups;
    }, [directusGroups, staticGroups]);

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
