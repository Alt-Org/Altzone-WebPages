'use client';
import { useParams, useRouter } from 'next/navigation';
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
    const router = useRouter();
    const lng = params.lng as string;
    const currentCategory = params.category as string;
    const language = getLanguageCode(lng);
    const { categories } = useGetDirectusGalleryImages(language);
    const allCategory = { name: lng === 'en' ? 'all' : 'kaikki' };
    const extendedCategories = [allCategory, ...categories];
    const [selectedCategory, setSelectedCategory] = useState(currentCategory || allCategory.name);

    useEffect(() => {
        if (currentCategory) setSelectedCategory(currentCategory);
    }, [currentCategory]);

    useEffect(() => {
        if (selectedCategory !== allCategory.name) {
            setSelectedCategory(allCategory.name);
            const newPath = getRouteGalleryCategoryPage(allCategory.name);
            router.replace(newPath);
        }
    }, [lng]);

    const title = lng === 'en' ? 'Categories' : 'Kategoriat';

    const dropdownItems = extendedCategories.map((category) => ({
        link: {
            isExternal: false,
            path: getRouteGalleryCategoryPage(category.name),
        },
        elementText:
            category.name.charAt(0).toUpperCase() + category.name.slice(1).replace('-', ' '),
        active: category.name === selectedCategory,
    })) as DropDownElementASTextOrLink[];

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: title,
        openByDefault: openByDefault,
        dropdownItems: dropdownItems,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default GalleryNavMenuAsDropdown;
