import { PhotoObject } from '@/entities/Gallery';
import cls from './FilterDropdowns.module.scss';
import { useState } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { SortByDropdown } from './SortByDropdown';
import { AuthorsDropdown } from './AuthorsDropdown';
import { useClientTranslation } from '@/shared/i18n';

interface FilterDropdownsProps {
    selectedAuthors: string[];
    setSelectedAuthors: (authors: string[]) => void;
    sortBy: 'date_asc' | 'date_desc' | 'title';
    setSortBy: (sortBy: 'date_asc' | 'date_desc' | 'title') => void;
    photoObjects: PhotoObject[];
    resetFilters: {
        resetAllFilters: () => void;
        resetSelectionFilters: () => void;
    };
}

export const FilterDropdowns = ({
    selectedAuthors,
    setSelectedAuthors,
    sortBy,
    setSortBy,
    photoObjects,
    resetFilters,
}: FilterDropdownsProps) => {
    const [dropdownsOpen, setDropdownsOpen] = useState(false);
    const [sortByOpen, setSortByOpen] = useState(false);
    const [authorsOpen, setAuthorsOpen] = useState(false);

    const { isMobileSize } = useSizes();
    const { t } = useClientTranslation('picture-galleries');

    const authorsList = [...photoObjects]
        .map((photoObject) => photoObject.author)
        .filter((author): author is string => !!author)
        .filter((author, index, self) => self.indexOf(author) === index) // remove duplicates
        .sort();

    return (
        <div className={cls.dropdownContainer}>
            {isMobileSize && (
                <div className={cls.dropdownTitleContainer}>
                    <button
                        type="button"
                        className={`${cls.dropdownTitle}`}
                        onClick={() => {
                            setSortByOpen(!dropdownsOpen);
                            setAuthorsOpen(!dropdownsOpen);
                            setDropdownsOpen(!dropdownsOpen);
                        }}
                    >
                        {t('filters')}
                        <FontAwesomeIcon icon={dropdownsOpen ? faChevronUp : faChevronDown} />
                    </button>
                </div>
            )}
            <div className={isMobileSize && dropdownsOpen ? cls.divider : cls.hidden} />
            <SortByDropdown
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortByOpen={sortByOpen}
                setSortByOpen={setSortByOpen}
                dropdownsOpen={dropdownsOpen}
            />
            <AuthorsDropdown
                selectedAuthors={selectedAuthors}
                setSelectedAuthors={setSelectedAuthors}
                authorsList={authorsList}
                authorsOpen={authorsOpen}
                setAuthorsOpen={setAuthorsOpen}
                dropdownsOpen={dropdownsOpen}
            />
            {isMobileSize && dropdownsOpen && (
                <>
                    <div className={cls.divider} />
                    <button
                        className={cls.resetButton}
                        onClick={resetFilters.resetSelectionFilters}
                    >
                        {t('reset-filters')}
                    </button>
                </>
            )}
        </div>
    );
};
