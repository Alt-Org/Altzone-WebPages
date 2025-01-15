'use client';
import { useParams, useRouter } from 'next/navigation';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdowns';
import { getRouteGalleryCategoryPage } from '@/shared/appLinks/RoutePaths';
import { useGetDirectusGalleryImages, getCategoryTranslation } from '@/entities/Gallery';
import { useEffect, useState } from 'react';

interface GalleryNavMenuProps {
    openByDefault?: boolean;
    language: string;
    allCategory: string;
    className: string;
}

const GalleryNavMenuAsDropdown = (props: GalleryNavMenuProps) => {
    const { openByDefault = false, language, allCategory, className } = props;

    const params = useParams();
    const router = useRouter();
    const currentCategory = params.category as string;
    const { categories } = useGetDirectusGalleryImages(language);
    const [selectedCategory, setSelectedCategory] = useState(currentCategory || allCategory);

    useEffect(() => {
        if (currentCategory) setSelectedCategory(currentCategory);
    }, [currentCategory]);

    useEffect(() => {
        if (categories) {
            const matchingCategory = categories.find((cat) =>
                cat.translations.some((t) => t.name === currentCategory),
            );

            if (matchingCategory) {
                const translatedName = getCategoryTranslation(
                    matchingCategory.translations,
                    language,
                );

                if (translatedName && translatedName !== currentCategory) {
                    const newPath = getRouteGalleryCategoryPage(translatedName);
                    router.replace(newPath);
                    setSelectedCategory(translatedName);
                }
            } else {
                setSelectedCategory(allCategory);
            }
        }
    }, [categories, language]);

    const title = language === 'en-US' ? 'Categories' : 'Kategoriat';

    const dropdownItems: DropDownElementASTextOrLink[] = [
        {
            link: {
                isExternal: false,
                path: getRouteGalleryCategoryPage(allCategory),
            },
            elementText: allCategory.charAt(0).toUpperCase() + allCategory.slice(1),
            active: selectedCategory === allCategory,
        },
        ...categories.map((category) => {
            const translatedName = getCategoryTranslation(category.translations, language);
            return {
                link: {
                    isExternal: false,
                    path: getRouteGalleryCategoryPage(translatedName),
                },
                elementText:
                    translatedName.charAt(0).toUpperCase() +
                    translatedName.slice(1).replace('-', ' '),
                active: translatedName === selectedCategory,
            };
        }),
    ];

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: title,
        openByDefault: openByDefault,
        dropdownItems: dropdownItems,
    };

    return (
        <NavMenuWithDropdowns
            className={className}
            {...navMenuWithDropdownsProps}
        />
    );
};

export default GalleryNavMenuAsDropdown;
