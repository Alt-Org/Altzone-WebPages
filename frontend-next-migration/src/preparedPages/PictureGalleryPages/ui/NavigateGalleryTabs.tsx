import { useMemo } from 'react';
import { PhotoCategory } from '@/entities/Gallery';
import { TabNavigation } from '@/shared/ui/TabNavigation';
import { useClientTranslation } from '@/shared/i18n';

interface NavigateGalleryTabsProps {
    categories: PhotoCategory[];
    setBackgroundColor: (color: string) => void;
    currentCategory: PhotoCategory;
    setCurrentCategory: (category: PhotoCategory) => void;
}

export const NavigateGalleryTabs = ({
    categories,
    setBackgroundColor,
    currentCategory,
    setCurrentCategory,
}: NavigateGalleryTabsProps) => {
    const currentCategoryNumber = useMemo(
        () => categories?.findIndex((category) => category.id === currentCategory.id),
        [categories, currentCategory.id],
    );
    const { t } = useClientTranslation('picture-galleries');

    const categoryColors = [
        { tabColor: '#97C459', sectionBG: '#527259' },
        { tabColor: '#5DCAA5', sectionBG: '#0C5450' },
        { tabColor: '#85B7EB', sectionBG: '#2B516A' },
        { tabColor: '#AFA9EC', sectionBG: '#63688B' },
    ];

    const onActiveTabChange = (tab: string) => {
        const selectedCategory = categories.find((category) => category.id === tab);
        if (selectedCategory) {
            const selectedCategoryNumber = categories.findIndex(
                (category) => category.id === selectedCategory.id,
            );
            const sectionBGColor =
                categoryColors[selectedCategoryNumber % categoryColors.length]?.sectionBG ||
                categoryColors[0].sectionBG;
            setBackgroundColor(sectionBGColor);
            setCurrentCategory(selectedCategory);
        }
    };
    const tabs = categories.map((category) => ({
        id: category.id,
        label:
            (category.name || category.id).charAt(0).toUpperCase() +
            (category.name || category.id).slice(1),
    }));

    const activeTabStyles = {
        backgroundColor:
            categoryColors[currentCategoryNumber % categoryColors.length]?.tabColor ||
            categoryColors[0].tabColor,
        color: 'black',
    };
    const mobileTabStylesList = categories.map((_category, index) => ({
        border: `2px solid`,
        borderColor:
            categoryColors[index % categoryColors.length]?.tabColor || categoryColors[0].tabColor,
        color:
            categoryColors[index % categoryColors.length]?.tabColor || categoryColors[0].tabColor,
    }));

    return (
        <TabNavigation
            tabs={tabs}
            tabsTitle={t('category-menu-title')}
            activeTab={currentCategory.id}
            onTabClick={onActiveTabChange}
            mobileTabStylesList={mobileTabStylesList}
            activeTabStyles={activeTabStyles}
        />
    );
};
