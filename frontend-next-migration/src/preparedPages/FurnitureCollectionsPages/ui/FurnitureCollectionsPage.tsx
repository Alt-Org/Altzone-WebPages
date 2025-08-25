'use client';
import { FurnitureManager } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import React, { useState } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { PageTitle } from '@/shared/ui/PageTitle';
import styles from './FurnitureCollectionsPage.module.scss';
import { HeroGroup } from '@/entities/Hero';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { NavigationRow, FurnitureSwitch } from '@/features/NavigateFurniture';
import { SearchBar } from '@/preparedPages/FurnitureCollectionsPages/ui/SingleFurnitureCollectionPage';

const FurnitureCollectionsPage = () => {
    const { t } = useClientTranslation('furniture');
    const manager = new FurnitureManager();
    const { isMobileSize, isTabletSize } = useSizes();
    const [searchQuery, setSearchQuery] = useState('');

    const furnitureSets = manager.getAllFurnitureSets();

    const filteredSets = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return furnitureSets;
        }

        const query = searchQuery.toLowerCase();
        return furnitureSets.filter((set) => {
            const setName = t(`${set.path}.name`).toLowerCase();
            return setName.includes(query);
        });
    }, [searchQuery, furnitureSets, t]);

    function capitalizeString(inputString: HeroGroup | string) {
        if (!inputString) return '';

        return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
    }

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
                <div className={styles.DescriptionCardMobileContainer}>
                    {filteredSets.map((set, index) => (
                        <DescriptionCard
                            key={index}
                            theme={DescriptionCardTheme.FURNITURECOLLECTION}
                            path={`/collections/furniture/set/${set.id}`}
                            isExternal={false}
                            withScalableLink={true}
                        >
                            <DescriptionCard.Texts width="35%">
                                <DescriptionCard.Texts.Title>
                                    {capitalizeString(set.id)}
                                </DescriptionCard.Texts.Title>
                                <DescriptionCard.Texts.Body>Collections</DescriptionCard.Texts.Body>
                            </DescriptionCard.Texts>
                            <DescriptionCard.Image width="65%">
                                <DescriptionCard.Image.Image
                                    src={set.cover}
                                    alt={set.id}
                                />
                            </DescriptionCard.Image>
                        </DescriptionCard>
                    ))}
                </div>
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
            <div className={styles.DesktopCardContainer}>
                {filteredSets.map((set, index) => (
                    <div
                        key={index}
                        style={{ width: 'calc(50% - 1em)' }}
                    >
                        <DescriptionCard
                            theme={DescriptionCardTheme.FURNITURECOLLECTION}
                            path={`/collections/furniture/set/${set.id}`}
                            isExternal={false}
                            withScalableLink={true}
                        >
                            <DescriptionCard.Texts width="35%">
                                <DescriptionCard.Texts.Title>
                                    {capitalizeString(set.id)}
                                </DescriptionCard.Texts.Title>
                                <DescriptionCard.Texts.Body>Collections</DescriptionCard.Texts.Body>
                            </DescriptionCard.Texts>
                            <DescriptionCard.Image width="65%">
                                <DescriptionCard.Image.Image
                                    src={set.cover}
                                    alt={set.id}
                                />
                            </DescriptionCard.Image>
                        </DescriptionCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FurnitureCollectionsPage;
