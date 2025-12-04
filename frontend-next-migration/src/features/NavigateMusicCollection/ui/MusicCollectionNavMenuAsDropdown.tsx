'use client';
import React from 'react';
import {
    DropDownElementASTextOrLink,
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useParams, usePathname } from 'next/navigation';
import { getRouteAllMusicCollectionsPage } from '@/shared/appLinks/RoutePaths';
import cls from './MusicCollectionNavMenuAsDropdown.module.scss';
import { useGetSongCategoriesQuery } from '@/entities/Music/api/musicApi';

interface MusicCollectionNavMenuAsDropdown {
    className?: string;
}

/**
 * Navigation dropdown for music collections.
 */

const MusicCollectionNavMenuAsDropdown: React.FC<MusicCollectionNavMenuAsDropdown> = ({
    className,
}) => {
    const params = useParams();
    const currentPathname = usePathname();
    const lng = params.lng as string;
    const musicCollectionsRoute = getRouteAllMusicCollectionsPage();
    const pathWithoutLng = currentPathname.replace(`/${lng}`, '');

    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('music');
    const { data: categories, isLoading, error } = useGetSongCategoriesQuery();

    const dropdownItems: DropDownElementASTextOrLink[] = [
        {
            elementText: t('all-title'),
            link: {
                path: musicCollectionsRoute,
                isExternal: false,
            },
            active: pathWithoutLng === musicCollectionsRoute,
        },
        ...(categories?.map((category) => ({
            elementText: t(`${category.category_name.toLowerCase()}-title`),
            link: {
                path: `${musicCollectionsRoute}/${category.category_name.toLowerCase()}`,
                isExternal: false,
            },
            active:
                pathWithoutLng ===
                `${musicCollectionsRoute}/${category.category_name.toLowerCase()}`,
        })) || []),
    ];

    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div>Error loading categories</div>;

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('category-title'),
        dropdownItems: dropdownItems,
        openByDefault: false,
        className: className,
        customActiveClassName: cls.ActiveItem,
    };

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('category-title'),
        dropdownItems: dropdownItems,
        openByDefault: true,
        staticDropdown: true,
        className: className,
        customActiveClassName: cls.ActiveItem,
    };

    return isMobileSize || isTabletSize ? (
        <NavMenuWithDropdowns {...navMenuWithDropdownsMobileProps} />
    ) : (
        <NavMenuWithDropdowns {...navMenuWithDropdownsDesktopProps} />
    );
};

export default MusicCollectionNavMenuAsDropdown;
