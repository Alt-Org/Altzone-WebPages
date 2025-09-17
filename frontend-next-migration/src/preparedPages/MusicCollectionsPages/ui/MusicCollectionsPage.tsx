'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import cls from './MusicCollectionsPage.module.scss';
import SearchIcon from '@/shared/assets/icons/Search.svg';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import { NavigationRow } from '@/features/NavigateFurniture/ui/NavigatioRow/NavigationRow';
import { YoutubeVideoCard } from '@/shared/ui/v2/YoutubeVideoCard';
import { MusicManager } from '@/entities/Music/model/MusicCollectionsManager';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SearchBarProps {
    className: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const SearchBar = (props: SearchBarProps) => {
    const { className, value, onChange, placeholder } = props;
    return (
        <div className={classNames(cls.SearchBar, undefined, [className])}>
            <Image
                src={SearchIcon}
                alt="search icon"
                height={20}
            />
            <input
                type="text"
                value={value}
                name="search"
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className={cls.Input}
            />
        </div>
    );
};

const MusicCollectionsPage = () => {
    const { t } = useClientTranslation('music');
    const manager = new MusicManager();
    const { isMobileSize, isTabletSize } = useSizes();
    const [searchQuery, setSearchQuery] = useState('');

    const allItems = manager.getAllCollectionsItems();
    const filteredItems = React.useMemo(() => {
        if (!allItems) return [];

        if (searchQuery.trim() === '') return allItems;

        return allItems.filter((item) => {
            // filter by music title and artist name
            return (
                item.musicTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.artistName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [allItems, searchQuery]);

    return (
        <div className={cls.Container}>
            {isMobileSize || isTabletSize ? (
                <SearchBar
                    className={cls.SearchBarTablet}
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={t('search-placeholder')}
                />
            ) : (
                <div className={cls.TitleSearchBarContainer}>
                    <PageTitle
                        titleText={t('music-collections-title')}
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
            <NavigationRow />
            <div className={cls.DesktopCardContainer}>
                {filteredItems && filteredItems.length === 0 && <div>No music items found</div>}
                {filteredItems &&
                    filteredItems.length > 0 &&
                    filteredItems.map((item, index) => {
                        return (
                            <YoutubeVideoCard
                                key={index}
                                title={item.musicTitle}
                                youtubeId={item.youtubeId}
                                artist={item.artistName}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default MusicCollectionsPage;
