'use client';
import { NavMenuWithDropdowns, NavMenuWithDropdownsProps } from '@/shared/ui/NavMenuWithDropdowns';
import { getRouteOneHeroPage } from '@/shared/appLinks/RoutePaths';

interface GalleryNavMenuProps {
    className?: string;
}

const categories: string[] = ['All', 'Nature', 'City', 'People', 'Technology'];

const GalleryNavMenu = (props: GalleryNavMenuProps) => {
    const dropdownItems = categories.map((category) => ({
        link: {
            isExternal: false,
            path: getRouteOneHeroPage(category),
        },
        elementText: category,
    }));

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: 'Categories',
        openByDefault: true,
        dropdownItems: dropdownItems,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default GalleryNavMenu;
