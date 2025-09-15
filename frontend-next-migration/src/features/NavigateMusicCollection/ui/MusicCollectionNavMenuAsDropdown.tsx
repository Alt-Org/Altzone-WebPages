'use client';
import React from 'react';
import { MusicManager } from '@/entities/Music/model/MusicCollectionsManager';
import {
    DropDownElementASTextOrLink,
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useParams, usePathname } from 'next/navigation';
import { getRouteAllMusicCollectionsPage } from '@/shared/appLinks/RoutePaths';

interface MusicCollectionNavMenuAsDropdown {
    className?: string;
}

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
    const musicManager = new MusicManager();
    const collections = musicManager.getAllCollections();

    const dropdownItems: DropDownElementASTextOrLink[] = collections.map((collection) => ({
        elementText: t(`${collection.slug}-title`),
        link: {
            path: `${musicCollectionsRoute}/${collection.slug}`,
            isExternal: false,
        },
        active: pathWithoutLng === `${musicCollectionsRoute}/${collection.slug}`,
    }));

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('category-title'),
        dropdownItems: dropdownItems,
        openByDefault: false,
        className: className,
    };

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('category-title'),
        dropdownItems: dropdownItems,
        openByDefault: true,
        staticDropdown: true,
        className: className,
    };

    return isMobileSize || isTabletSize ? (
        <NavMenuWithDropdowns {...navMenuWithDropdownsMobileProps} />
    ) : (
        <NavMenuWithDropdowns {...navMenuWithDropdownsDesktopProps} />
    );
};

export default MusicCollectionNavMenuAsDropdown;
