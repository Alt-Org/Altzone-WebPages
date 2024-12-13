'use client';
import { useParams } from 'next/navigation';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdowns';
import { getRouteGalleryCategoryPage } from '@/shared/appLinks/RoutePaths';
import { getLanguageCode, useGetDirectusGalleryImages } from '@/entities/Gallery';
import { useEffect, useState } from 'react';

interface GalleryNavMenuProps {
    // className?: string;
    openByDefault?: boolean;
}

const GalleryNavMenuAsDropdown = (props: GalleryNavMenuProps) => {
    const { openByDefault = false } = props;

    const params = useParams();
    const lng = params.lng as string;
    const currentCategory = params.category as string;
    const language = getLanguageCode(lng);
    const { categories } = useGetDirectusGalleryImages(language);
    const allCategory = { name: lng === 'en' ? 'All' : 'Kaikki' };
    const [selectedCategory, setSelectedCategory] = useState(allCategory.name.toLowerCase());

    useEffect(() => {
        if (currentCategory) setSelectedCategory(currentCategory);
    }, [currentCategory]);

    const extendedCategories = [allCategory, ...categories];
    const title = lng === 'en' ? 'Categories' : 'Kategoriat';

    const dropdownItems = extendedCategories.map((category) => ({
        link: {
            isExternal: false,
            path: getRouteGalleryCategoryPage(category.name.toLowerCase()),
        },
        elementText: category.name,
        active: category.name.toLowerCase() === selectedCategory,
    })) as DropDownElementASTextOrLink[];

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: title,
        openByDefault: openByDefault,
        dropdownItems: dropdownItems,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default GalleryNavMenuAsDropdown;
