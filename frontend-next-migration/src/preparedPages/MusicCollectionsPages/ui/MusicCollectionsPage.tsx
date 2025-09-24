'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cls from './MusicCollectionsPage.module.scss';
import SearchIcon from '@/shared/assets/icons/Search.svg';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import { YoutubeVideoCard } from '@/shared/ui/v2/YoutubeVideoCard';
import { MusicManager } from '@/entities/Music/model/MusicCollectionsManager';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortDropdown } from '@/features/NavigateFurniture/ui/SortDropdown/SortDropdown';
import { BackButtonLink } from '@/shared/ui/v2/BackButtonLink/ui/BackButtonLink';

interface SearchBarProps {
    className: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

interface NavigationRowProps {
    className?: string;
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
                aria-label="Search input"
            />
        </div>
    );
};

const NavigationRow = (props: NavigationRowProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.NavigationRow, undefined, [className ? className : ''])}>
            <BackButtonLink href="/collections" />
            <SortDropdown className={cls.SortDropdown} />
        </div>
    );
};
const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

const MusicCollectionsPage = () => {
    const { t } = useClientTranslation('music');
    const manager = new MusicManager();
    const { isMobileSize, isTabletSize } = useSizes();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 400);

    const allItems = manager.getAllCollectionsItems();
    const filteredItems = React.useMemo(() => {
        if (!allItems) return [];

        if (debouncedSearchQuery.trim() === '') return allItems;

        return allItems.filter((item) => {
            // filter by music title and artist name
            return (
                item.musicTitle.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                item.artistName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
            );
        });
    }, [allItems, debouncedSearchQuery]);

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
                {filteredItems && filteredItems.length === 0 && (
                    <div>{t('no-music-items-found')}</div>
                )}
                {filteredItems &&
                    filteredItems.length > 0 &&
                    filteredItems.map((item) => {
                        return (
                            <YoutubeVideoCard
                                key={item.youtubeId}
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
