'use client';
import { NavigationRow } from '@/features/NavigateFurniture/ui/NavigatioRow/NavigationRow';
import SearchIcon from '@/shared/assets/icons/Search.svg';
import { SearchBar } from '@/preparedPages/FurnitureCollectionsPages/ui/SingleFurnitureCollectionPage';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import Image from 'next/image';
import cls from './MusicCollectionsPage.module.scss';
import { useState } from 'react';
import { YoutubeVideoCard } from '@/shared/ui/v2/YoutubeVideoCard';

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
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <>
            <div>
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
            <NavigationRow />
            <div className={cls.DesktopCardContainer}>
                <YoutubeVideoCard
                    title="Sample Title"
                    youtubeId="lkyuLMj1YSs?si=D30RRhxYHZ3o_t_3"
                    artist="Sample Artist"
                />
            </div>
        </>
    );
};

export default MusicCollectionsPage;
