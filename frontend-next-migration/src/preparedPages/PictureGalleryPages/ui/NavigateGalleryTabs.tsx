import { useMemo, useRef } from 'react';
import { PhotoCategory } from '@/entities/Gallery';
import useSizes from '@/shared/lib/hooks/useSizes';
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
    const { isMobileSize } = useSizes();
    const currentCategoryNumber = useMemo(
        () => categories?.findIndex((category) => category.id === currentCategory.id),
        [categories, currentCategory.id],
    );
    const tabWidth = 200;
    const mobileTabWidth = 140;
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

    const navRef = useRef<HTMLDivElement>(null);
    // Calculate the width of the navigation container and determine if mobile styles should be used
    const navWidth = navRef.current?.clientWidth || 0;
    // use mobile styles if the screen is mobile size or if categories wouldn't fit on one row
    const useMobileStyles = isMobileSize || navWidth < categories.length * tabWidth + 5;

    const activeTabStyles = {
        backgroundColor:
            categoryColors[currentCategoryNumber % categoryColors.length]?.tabColor ||
            categoryColors[0].tabColor,
        color: 'black',
        width: useMobileStyles ? `${mobileTabWidth}px` : `${tabWidth}px`,
        height: useMobileStyles ? '35px' : '50px',
        font: useMobileStyles ? 'var(--font-dm-bold-m)' : 'var(--font-dm-bold-l)',
        margin: useMobileStyles ? '0.5rem' : undefined,
    };
    const mobileTabStylesList = categories.map((_category, index) => ({
        border: `2px solid`,
        borderColor:
            categoryColors[index % categoryColors.length]?.tabColor || categoryColors[0].tabColor,
        color:
            categoryColors[index % categoryColors.length]?.tabColor || categoryColors[0].tabColor,
        font: 'var(--font-dm-m)',
        height: '35px',
        borderRadius: 'var(--border-radius-figma)',
        width: `${mobileTabWidth}px`,
        margin: isMobileSize ? undefined : '0.5rem',
    }));

    return (
        <div ref={navRef}>
            <TabNavigation
                tabs={tabs}
                tabsTitle={t('category-menu-title')}
                activeTab={currentCategory.id}
                showTabTitle={useMobileStyles}
                onTabClick={onActiveTabChange}
                tabStylesList={useMobileStyles ? mobileTabStylesList : [{ width: `${tabWidth}px` }]}
                activeTabStyles={activeTabStyles}
            />
        </div>
    );
};
