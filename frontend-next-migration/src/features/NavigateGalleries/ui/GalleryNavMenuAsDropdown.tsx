'use client';
import { useParams } from 'next/navigation';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdowns';
import { getRouteGalleryCategoryPage } from '@/shared/appLinks/RoutePaths';

interface GalleryNavMenuProps {
    // className?: string;
    openByDefault?: boolean;
}

const categoriesEn: string[] = ['All', 'Nature', 'City', 'People', 'Technology'];
const categoriesFi: string[] = ['Kaikki', 'Luonto', 'Kaupunki', 'Ihmiset', 'Teknologia'];

const GalleryNavMenuAsDropdown = (props: GalleryNavMenuProps) => {
    const { openByDefault = false } = props;

    const params = useParams();
    const lng = params.lng as string;

    const title = lng === 'en' ? 'Categories' : 'Kategoriat';
    const categories = lng === 'en' ? categoriesEn : categoriesFi;

    const dropdownItems = categories.map((category) => ({
        link: {
            isExternal: false,
            path: getRouteGalleryCategoryPage(category.toLowerCase()),
        },
        elementText: category,
        active: true,
    })) as DropDownElementASTextOrLink[];

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: title,
        openByDefault: openByDefault,
        dropdownItems: dropdownItems,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default GalleryNavMenuAsDropdown;
