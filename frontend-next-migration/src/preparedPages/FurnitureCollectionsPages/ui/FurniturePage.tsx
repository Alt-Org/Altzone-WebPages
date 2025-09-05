'use client';
import { FurnitureManager, Category } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import React, { useState } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { MobileCard, HoverEffect, MobileCardTheme } from '@/shared/ui/v2/MobileCard';
import styles from './FurnitureCollectionsPage.module.scss';
import cls from '@/preparedPages/FurnitureCollectionsPages/ui/SingleFurnitureCollectionPage.module.scss';
import {
    SwitchCategory,
    CategoryDropdown,
    NavigationRow,
    FurnitureSwitch,
} from '@/features/NavigateFurniture';
import { FurniturePopup } from '@/shared/ui/v2/FurniturePopup';
import { SearchBar } from '@/preparedPages/FurnitureCollectionsPages/ui/SingleFurnitureCollectionPage';
import { PageTitle } from '@/shared/ui/PageTitle';

const FurniturePage = () => {
    const { t } = useClientTranslation('furniture');
    const { t: tInfo } = useClientTranslation('furnitureinfo');
    const manager = new FurnitureManager();
    const { isMobileSize, isTabletSize } = useSizes();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | 'other'>('all');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const furnitureSets = manager.getAllFurnitureSets();

    const allFurniture = React.useMemo(() => {
        const items: any[] = [];
        furnitureSets.forEach((set) => {
            set.items.forEach((item) => {
                items.push({
                    ...item,
                    set,
                });
            });
        });
        return items;
    }, [furnitureSets]);

    const filteredFurniture = React.useMemo(() => {
        let filtered = allFurniture;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((item) => {
                const setName = tInfo(`${item.set.path}.name`).toLowerCase();
                const itemName = tInfo(`${item.set.path}.items.${item.path}.name`).toLowerCase();
                const categoryName = item.type.name.toLowerCase();
                return (
                    setName.includes(query) ||
                    itemName.includes(query) ||
                    categoryName.includes(query)
                );
            });
        }

        if (selectedCategory !== 'all' && selectedCategory !== 'other') {
            filtered = filtered.filter((item) => item.type.name === selectedCategory);
        } else if (selectedCategory === 'other') {
            filtered = filtered.filter(
                (item) =>
                    item.type.name === Category.ITEMS ||
                    item.type.name === Category.SINKS ||
                    item.type.name === Category.TOILETS ||
                    item.type.name === Category.WALL,
            );
        }

        return filtered;
    }, [searchQuery, selectedCategory, allFurniture, tInfo]);

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    if (isMobileSize) {
        return (
            <div className={styles.Container}>
                <SearchBar
                    className={styles.SearchBarMobile}
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={t('search-placeholder')}
                />
                <NavigationRow className={styles.NavigationRowMobile} />
                <FurnitureSwitch />
                <CategoryDropdown
                    setState={setSelectedCategory}
                    state={selectedCategory}
                />
                <div className={styles.DescriptionCardMobileContainer}>
                    <div className={styles.MobileCardContainer}>
                        {filteredFurniture.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleItemClick(item)}
                                style={{
                                    width: 'calc(33.33% - 2em / 3)',
                                }}
                            >
                                <HoverEffect>
                                    <MobileCard
                                        theme={MobileCardTheme.FURNITURECOLLECTION}
                                        height={'calc(33.333vh - 2em / 3)'}
                                    >
                                        <MobileCard.Texts
                                            title1={tInfo(`${item.set.path}.name`)}
                                            title2={tInfo(
                                                `${item.set.path}.items.${item.path}.name`,
                                            )}
                                        />
                                        <MobileCard.Image
                                            fill
                                            backgroundColor={item.set.bgColour || '#cccccc'}
                                            src={item.cover}
                                            alt={tInfo(`${item.set.path}.items.${item.path}.name`)}
                                        />
                                    </MobileCard>
                                </HoverEffect>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedItem && (
                    <FurniturePopup
                        item={selectedItem}
                        setPath={selectedItem.set.path}
                        isOpen={isPopupOpen}
                        onClose={handleClosePopup}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={styles.Container}>
            {isTabletSize ? (
                <SearchBar
                    className={styles.SearchBarTablet}
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={t('search-placeholder')}
                />
            ) : (
                <div className={styles.TitleBar}>
                    <PageTitle
                        titleText={t('furniture-collections-title')}
                        alternate={true}
                        searchVisible={false}
                    />
                    <SearchBar
                        className={styles.SearchBarDesktop}
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder={t('search-placeholder')}
                    />
                </div>
            )}
            <NavigationRow className={styles.NavigationRowDesktop} />
            <FurnitureSwitch />
            <SwitchCategory
                setState={setSelectedCategory}
                state={selectedCategory}
            />
            <div className={styles.DesktopCardContainer}>
                <div className={cls.DesktopCardContainer}>
                    {filteredFurniture.map((item, index) => (
                        <div
                            key={index}
                            style={{ width: 'calc(25% - 3 * 2em / 4)' }}
                            onClick={() => handleItemClick(item)}
                        >
                            <HoverEffect>
                                <MobileCard theme={MobileCardTheme.FURNITURECOLLECTION}>
                                    <MobileCard.Texts
                                        title1={tInfo(`${item.set.path}.name`)}
                                        title2={tInfo(`${item.set.path}.items.${item.path}.name`)}
                                        text={item.num}
                                    />
                                    <MobileCard.Image
                                        fill
                                        backgroundColor={'#cccccc'}
                                        src={item.cover}
                                        alt={tInfo(`${item.set.path}.items.${item.path}.name`)}
                                    />
                                </MobileCard>
                            </HoverEffect>
                        </div>
                    ))}
                    {selectedItem && (
                        <FurniturePopup
                            item={selectedItem}
                            setPath={selectedItem.set.path}
                            isOpen={isPopupOpen}
                            onClose={handleClosePopup}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FurniturePage;
