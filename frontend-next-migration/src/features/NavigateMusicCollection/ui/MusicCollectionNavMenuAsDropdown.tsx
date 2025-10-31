'use client';
import React from 'react';
// import { MusicManager } from '@/entities/Music/model/MusicCollectionsManager'; // Deprecated: Removed reliance on hardcoded manager
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
import { useGetSongCategoriesQuery } from '@/entities/Music/api/musicApi'; // New: Hook for dynamic category fetching

interface MusicCollectionNavMenuAsDropdown {
    className?: string;
}

/**
 * Navigation dropdown for music collections.
 *
 * Changes:
 * - Replaced hardcoded categories from `MusicManager` with dynamic fetching via `useGetSongCategoriesQuery`.
 * - Added loading/error states for better UX.
 * - Builds dropdown items from fetched Directus data instead of static enums.
 * - Supports slug-based routing for category pages.
 *
 * Purpose: Displays a responsive dropdown menu with categories (e.g., Jukebox, Battle) fetched from Directus, enabling navigation to filtered music pages.
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
    const { data: categories, isLoading, error } = useGetSongCategoriesQuery(); // Fetch categories dynamically

    // Build dropdown items from fetched categories
    const dropdownItems: DropDownElementASTextOrLink[] = [
        {
            elementText: t('all-title'), // "All" option for full list
            link: {
                path: musicCollectionsRoute,
                isExternal: false,
            },
            active: pathWithoutLng === musicCollectionsRoute,
        },
        ...(categories?.map((category) => ({
            elementText: t(`${category.category_name.toLowerCase()}-title`), // Localized category name
            link: {
                path: `${musicCollectionsRoute}/${category.category_name.toLowerCase()}`, // Slug-based path
                isExternal: false,
            },
            active:
                pathWithoutLng ===
                `${musicCollectionsRoute}/${category.category_name.toLowerCase()}`,
        })) || []),
    ];

    if (isLoading) return <div>Loading categories...</div>; // Loading state
    if (error) return <div>Error loading categories</div>; // Error state

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('category-title'),
        dropdownItems: dropdownItems,
        openByDefault: true,
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
