'use client';
import { useParams } from 'next/navigation';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdowns';
import { getRouteGalleryCategoryPage } from '@/shared/appLinks/RoutePaths';
import { getLanguageCode, useGetDirectusGalleryImages } from '@/entities/Gallery';

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

    const title = lng === 'en' ? 'Categories' : 'Kategoriat';

    const allCategory = {
        name: lng === 'en' ? 'All' : 'Kaikki',
    };

    const extendedCategories = [allCategory, ...categories];

    const dropdownItems = extendedCategories.map((category) => ({
        link: {
            isExternal: false,
            path: getRouteGalleryCategoryPage(category.name.toLowerCase()),
        },
        elementText: category.name,
        active: category.name.toLowerCase() === currentCategory,
    })) as DropDownElementASTextOrLink[];

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: title,
        openByDefault: openByDefault,
        dropdownItems: dropdownItems,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default GalleryNavMenuAsDropdown;
