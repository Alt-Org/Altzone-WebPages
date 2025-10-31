'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cls from './MusicCollectionsPage.module.scss';
import SearchIcon from '@/shared/assets/icons/Search.svg';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import { YoutubeVideoCard } from '@/shared/ui/v2/YoutubeVideoCard';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortDropdown } from '@/features/NavigateFurniture/ui/SortDropdown/SortDropdown';
import { BackButtonLink } from '@/shared/ui/v2/BackButtonLink/ui/BackButtonLink';
import { useParams } from 'next/navigation';
import { useGetSongsQuery } from '@/entities/Music/api/musicApi'; // New: Hook for dynamic song fetching
import { MusicItem, Song } from '@/entities/Music/types/music'; // Updated: Corrected import path for types
import { extractYouTubeId } from '@/entities/Music/lib/utils'; // New: Utility for YouTube ID extraction

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

/**
 * Main page component for displaying music collections.
 *
 * Changes:
 * - Migrated from hardcoded `MusicManager` to dynamic fetching via `useGetSongsQuery`.
 * - Added filtering to exclude songs without categories or valid YouTube links.
 * - Implemented slug-based filtering for category pages (e.g., /music/jukebox).
 * - Added null checks and error handling to prevent crashes.
 * - Retained search and responsive UI, but now operates on fetched data.
 *
 * Purpose: Displays a list of YouTube music videos from Directus, with search, category filtering, and responsive design.
 */

const MusicCollectionsPage = () => {
    const { t } = useClientTranslation('music');
    const { isMobileSize, isTabletSize } = useSizes();
    const params = useParams();
    const slug = params.slug as string; // For /music/[slug] routing
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 400);

    const { data: songs, isLoading, error } = useGetSongsQuery(); // Fetch songs dynamically

    // Map fetched songs to MusicItem[], filter by slug if present
    const allItems: MusicItem[] = React.useMemo(() => {
        if (!songs) return [];
        return songs
            .filter((song: Song) => song.category && song.video_link) // Skip songs without category or link
            .map((song: Song) => {
                const youtubeId = extractYouTubeId(song.video_link);
                if (!youtubeId) return null; // Skip if no valid YouTube ID
                return {
                    id: song.id,
                    musicTitle: song.song_name,
                    artistName: song.composers,
                    youtubeId,
                    category: song.category?.category_name || 'Uncategorized', // Safe access
                };
            })
            .filter((item) => item !== null) // Remove nulls from map
            .filter((item) => !slug || item.category.toLowerCase() === slug.toLowerCase()); // Filter by slug
    }, [songs, slug]);

    // Filter by search
    const filteredItems = React.useMemo(() => {
        if (!allItems) return [];
        if (debouncedSearchQuery.trim() === '') return allItems;
        return allItems.filter(
            (item) =>
                item.musicTitle.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                item.artistName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
        );
    }, [allItems, debouncedSearchQuery]);

    if (isLoading) return <div>Loading songs...</div>; // Loading state
    if (error) return <div>Error loading songs</div>; // Error state

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
                {filteredItems.length === 0 && <div>{t('no-music-items-found')}</div>}
                {filteredItems.length > 0 &&
                    filteredItems.map((item) => (
                        <YoutubeVideoCard
                            key={item.id}
                            title={item.musicTitle}
                            youtubeId={item.youtubeId}
                            artist={item.artistName}
                        />
                    ))}
            </div>
        </div>
    );
};

export default MusicCollectionsPage;
