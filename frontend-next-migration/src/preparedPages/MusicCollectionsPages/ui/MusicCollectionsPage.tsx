'use client';
import { NavigationRow } from '@/features/NavigateFurniture/ui/NavigatioRow/NavigationRow';
// import SearchIcon from '@/shared/assets/icons/Search.svg';
import { SearchBar } from '@/preparedPages/FurnitureCollectionsPages/ui/SingleFurnitureCollectionPage';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import cls from './MusicCollectionsPage.module.scss';
import { useState } from 'react';
import { YoutubeVideoCard } from '@/shared/ui/v2/YoutubeVideoCard';
import { MusicManager } from '@/entities/Music/model/MusicCollectionsManager';
import useSizes from '@/shared/lib/hooks/useSizes';

// export interface SearchBarProps {
//     className: string;
//     value: string;
//     onChange: (value: string) => void;
//     placeholder: string;
// }

// export const SearchBar = (props: SearchBarProps) => {
//     const { className, value, onChange, placeholder } = props;
//     return (
//         // <div className={classNames(cls.SearchBar, undefined, [className])}>
//         <div>
//             <Image
//                 src={SearchIcon}
//                 alt="search icon"
//                 height={20}
//             />
//             <input
//                 type="text"
//                 value={value}
//                 onChange={(event) => onChange(event.target.value)}
//                 placeholder={placeholder}
//                 // className={cls.Input}
//             />
//         </div>
//     );
// };

const MusicCollectionsPage = () => {
    const { t } = useClientTranslation('music');
    const manager = new MusicManager();
    const { isMobileSize, isTabletSize } = useSizes();

    const [searchQuery, setSearchQuery] = useState('');

    const allItems = manager.getAllCollectionsItems();
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
                        className={cls.PageTitle}
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
                {allItems && allItems.length === 0 && <div>No music items found</div>}
                {allItems &&
                    allItems.length > 0 &&
                    allItems.map((item, index) => {
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
