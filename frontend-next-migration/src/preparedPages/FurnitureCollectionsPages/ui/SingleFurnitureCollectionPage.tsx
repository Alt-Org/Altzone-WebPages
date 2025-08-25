'use client';
import { FurnitureManager, Category, Piece } from '@/entities/Furniture';
import { categories } from '@/entities/Furniture/model/initializeFurniture';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { useMemo, useState } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { MobileCard, HoverEffect, MobileCardTheme } from '@/shared/ui/v2/MobileCard';
import search from '@/shared/assets/icons/Search.svg';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { FurniturePopup } from '@/shared/ui/v2/FurniturePopup';
import Image from 'next/image';
import cls from './SingleFurnitureCollectionPage.module.scss';
import { CustomSwitch, CustomSwitchItems, ToggleLink } from '@/shared/ui/CustomSwitch';
import { SwitchCategory, CategoryDropdown, NavigationRow } from '@/features/NavigateFurniture';
import { PageTitle } from '@/shared/ui/PageTitle';
import {
    DescriptionCardMobile,
    DescriptionCardMobileTheme,
} from '@/shared/ui/v2/DescriptionCardMobile';

export interface SearchBarProps {
    className: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export const SearchBar = (props: SearchBarProps) => {
    const { className, value, onChange, placeholder } = props;
    return (
        <div className={classNames(cls.SearchBar, undefined, [className])}>
            <Image
                src={search}
                alt="search icon"
                height={20}
            />
            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className={cls.Input}
            />
        </div>
    );
};

export interface SingleFurnitureCollectionPageProps {
    collectionId: string;
}

const SingleFurnitureCollectionPage = (props: SingleFurnitureCollectionPageProps) => {
    const { collectionId } = props;
    const { t } = useClientTranslation('furniture');
    const { t: tInfo } = useClientTranslation('furnitureinfo');
    const manager = new FurnitureManager();
    const { isMobileSize, isTabletSize } = useSizes();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | 'other'>('all');
    const [selectedItem, setSelectedItem] = useState<Piece | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const furnitureSet = React.useMemo(() => {
        return manager.getFurnitureSet(collectionId);
    }, [collectionId, manager]);

    const filteredItems = React.useMemo(() => {
        if (!furnitureSet) return [];

        let filtered = furnitureSet.items;

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((item) => {
                const itemName = tInfo(
                    `${furnitureSet.path}.items.${item.path}.name`,
                ).toLowerCase();
                const categoryName = item.type.name.toLowerCase();
                return itemName.includes(query) || categoryName.includes(query);
            });
        }

        if (selectedCategory !== 'all' && selectedCategory !== 'other') {
            filtered = filtered.filter(
                (item) => item.type.name === categories[selectedCategory].name,
            );
        } else if (selectedCategory === 'all') {
            return filtered;
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
    }, [searchQuery, selectedCategory, furnitureSet, tInfo]);

    const CustomSwitchElements: ToggleLink[] = useMemo(() => {
        return [
            {
                children: <p>{t('sets')}</p>,
                path: `/collections/furniture`,
                isOpen: true,
            },
            {
                children: <p>{t('furniture')}</p>,
                path: `/collections/furniture/all`,
                isOpen: false,
            },
        ].map((elem) => {
            return {
                type: CustomSwitchItems.ToggleLink,
                ...elem,
            };
        });
    }, []);

    if (!furnitureSet) {
        return (
            <div className={cls.Container}>
                <h1>{tInfo('set-not-found')}</h1>
            </div>
        );
    }

    const handleItemClick = (item: Piece) => {
        setSelectedItem(item);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    if (isMobileSize) {
        return (
            <div className={cls.Container}>
                <SearchBar
                    className={cls.SearchBarMobile}
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={t('search-placeholder')}
                />
                <NavigationRow className={cls.NavigationRowMobile} />
                <CategoryDropdown
                    setState={setSelectedCategory}
                    state={selectedCategory}
                />
                <div style={{ marginBottom: '1em' }}>
                    <DescriptionCardMobile theme={DescriptionCardMobileTheme.FURNITURECOLLECTION}>
                        <DescriptionCardMobile.Texts title={tInfo(`${furnitureSet.path}.name`)}>
                            <div className={cls.Author}>{furnitureSet.author}</div>
                            {tInfo(
                                `${furnitureSet.path}.items.${furnitureSet.items[0]?.path}.desc` ||
                                    '',
                            )}
                        </DescriptionCardMobile.Texts>
                        <DescriptionCardMobile.Image
                            src={furnitureSet.coverWebp ?? furnitureSet.cover}
                            alt={tInfo(`${furnitureSet.path}.name`)}
                        />
                    </DescriptionCardMobile>
                </div>
                <div className={cls.MobileCardContainer}>
                    {filteredItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className={cls.CardWrapper}
                            style={{ width: 'calc(33.33% - 2em / 3)' }}
                        >
                            <HoverEffect>
                                <MobileCard
                                    theme={MobileCardTheme.FURNITURECOLLECTION}
                                    height={'calc(33.333vh - 2em / 3)'}
                                >
                                    <MobileCard.Texts
                                        title1={tInfo(`${furnitureSet.path}.name`)}
                                        title2={tInfo(
                                            `${furnitureSet.path}.items.${item.path}.name`,
                                        )}
                                    />
                                    <MobileCard.Image
                                        fill
                                        backgroundColor={'#cccccc'}
                                        src={item.cover}
                                        alt={tInfo(`${furnitureSet.path}.items.${item.path}.name`)}
                                    />
                                </MobileCard>
                            </HoverEffect>
                        </div>
                    ))}
                </div>
                {selectedItem && (
                    <FurniturePopup
                        item={selectedItem}
                        setPath={furnitureSet.path}
                        isOpen={isPopupOpen}
                        onClose={handleClosePopup}
                    />
                )}
            </div>
        );
    }

    return (
        <div className={cls.Container}>
            {isTabletSize ? (
                <SearchBar
                    className={cls.SearchBarTablet}
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={t('search-placeholder')}
                />
            ) : (
                <div className={cls.TitleBar}>
                    <PageTitle
                        titleText={t('furniture-collections-title')}
                        alternate={true}
                        searchVisible={false}
                    />
                    <SearchBar
                        className={cls.SearchBarDesktop}
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder={t('search-placeholder')}
                    />
                </div>
            )}
            <NavigationRow className={cls.NavigationRowDesktop} />
            <CustomSwitch elements={CustomSwitchElements} />
            <SwitchCategory
                setState={setSelectedCategory}
                state={selectedCategory}
            />
            <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>
                        {tInfo(`${furnitureSet.path}.name`)}
                    </DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        {tInfo(
                            `${furnitureSet.path}.items.${furnitureSet.items[0]?.path}.desc` || '',
                        )}
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image>
                    <DescriptionCard.Image.Triangle />
                    <DescriptionCard.Image.Image
                        src={furnitureSet.cover}
                        alt={tInfo(`${furnitureSet.path}.name`)}
                        marginLeft="20%"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>
            <div className={cls.DesktopCardContainer}>
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        style={{ width: 'calc(25% - 3 * 2em / 4)' }}
                        onClick={() => handleItemClick(item)}
                    >
                        <HoverEffect>
                            <MobileCard theme={MobileCardTheme.FURNITURECOLLECTION}>
                                <MobileCard.Texts
                                    title1={tInfo(`${furnitureSet.path}.name`)}
                                    title2={tInfo(`${furnitureSet.path}.items.${item.path}.name`)}
                                    text={item.num}
                                />
                                <MobileCard.Image
                                    fill
                                    backgroundColor={'#cccccc'}
                                    src={item.cover}
                                    alt={tInfo(`${furnitureSet.path} image`)}
                                />
                            </MobileCard>
                        </HoverEffect>
                    </div>
                ))}
            </div>
            {selectedItem && (
                <FurniturePopup
                    item={selectedItem}
                    setPath={furnitureSet.path}
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default SingleFurnitureCollectionPage;
