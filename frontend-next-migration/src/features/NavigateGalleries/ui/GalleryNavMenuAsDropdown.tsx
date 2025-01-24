'use client';
import {
    DropdownItem,
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdowns';
import { useGetDirectusGalleryImages, getCategoryTranslation } from '@/entities/Gallery';

interface GalleryNavMenuProps {
    openByDefault?: boolean;
    language: string;
    allCategory: string;
    onClickCallback: (category: string) => void;
    selectedCategory: string;
    isTouchDevice: boolean;
}

const GalleryNavMenuAsDropdown = (props: GalleryNavMenuProps) => {
    const {
        openByDefault = true,
        language,
        allCategory,
        onClickCallback,
        selectedCategory,
        isTouchDevice,
    } = props;
    const { categories } = useGetDirectusGalleryImages(language);
    const title = language === 'en-US' ? 'Categories' : 'Kategoriat';

    const dropdownItems: DropdownItem[] = [
        {
            title: '',
            openByDefault: openByDefault,
            elements: [
                {
                    elementText: allCategory.charAt(0).toUpperCase() + allCategory.slice(1),
                    active: selectedCategory === allCategory,
                    onClickCallback: () => onClickCallback(allCategory),
                },
                ...categories.map((category) => {
                    const translatedName = getCategoryTranslation(category.translations, language);
                    return {
                        elementText:
                            translatedName.charAt(0).toUpperCase() + translatedName.slice(1),
                        id: category.id.toString(),
                        active: selectedCategory === translatedName,
                        onClickCallback: () => onClickCallback(translatedName),
                    };
                }),
            ],
        },
    ];

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: title,
        openByDefault: isTouchDevice ? false : openByDefault,
        dropdownItems: dropdownItems,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default GalleryNavMenuAsDropdown;
