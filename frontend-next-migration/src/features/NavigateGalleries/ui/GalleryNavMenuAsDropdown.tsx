'use client';
import { useParams, useRouter } from 'next/navigation';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { getRouteGalleryCategoryPage } from '@/shared/appLinks/RoutePaths';
import {
    getLanguageCode,
    useGetDirectusGalleryImages,
    getCategoryTranslation,
} from '@/entities/Gallery';
import { useEffect, useState } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';

interface GalleryNavMenuProps {
    openByDefault?: boolean;
}

const GalleryNavMenuAsDropdown = (props: GalleryNavMenuProps) => {
    const { openByDefault = false } = props;
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const params = useParams();
    const router = useRouter();
    const lng = params.lng as string;
    const currentCategory = params.category as string;
    const language = getLanguageCode(lng);
    const { categories } = useGetDirectusGalleryImages(language);
    const allCategory = lng === 'en' ? 'all' : 'kaikki';
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
    }, [categories, lng]);

    const title = lng === 'en' ? 'Categories' : 'Kategoriat';

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

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: title,
        openByDefault: openByDefault,
        dropdownItems: dropdownItems,
    };

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: title,
        openByDefault: openByDefault,
        staticDropdown: true,
        dropdownItems: dropdownItems,
    };

    return (
        <div>
            <nav style={isTouchDevice ? { display: 'contents' } : { display: 'none' }}>
                <NavMenuWithDropdowns {...navMenuWithDropdownsMobileProps} />
            </nav>
            <nav style={isTouchDevice ? { display: 'none' } : { display: 'block' }}>
                <NavMenuWithDropdowns {...navMenuWithDropdownsDesktopProps} />
            </nav>
        </div>
    );
};

export default GalleryNavMenuAsDropdown;
