'use client';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdowns';
import { useGetDirectusGalleryImages, getCategoryTranslation } from '@/entities/Gallery';
import { useClientTranslation } from '@/shared/i18n';

interface GalleryNavMenuProps {
    openByDefault?: boolean;
    language: string;
    allCategory: string;
    onClickCallback: (category: string) => void;
    selectedCategory: string;
}

const GalleryNavMenuAsDropdown = (props: GalleryNavMenuProps) => {
    const {
        openByDefault = true,
        language,
        allCategory,
        onClickCallback,
        selectedCategory,
    } = props;
    const { categories } = useGetDirectusGalleryImages(language);
    const { t } = useClientTranslation('picture-galleries');

    const dropdownItems: DropDownElementASTextOrLink[] = [
        {
            elementText: allCategory.charAt(0).toUpperCase() + allCategory.slice(1),
            active: selectedCategory === allCategory,
            onClickCallback: () => onClickCallback(allCategory),
        },
        ...categories.map((category) => {
            const translatedName = getCategoryTranslation(category.translations, language);
            return {
                elementText:
                    translatedName.charAt(0).toUpperCase() +
                    translatedName.slice(1).replace('-', ' '),
                active: translatedName === selectedCategory,
                onClickCallback: () => onClickCallback(translatedName),
            };
        }),
    ];

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: t('category-menu-title'),
        openByDefault: openByDefault,
        dropdownItems: dropdownItems,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default GalleryNavMenuAsDropdown;
