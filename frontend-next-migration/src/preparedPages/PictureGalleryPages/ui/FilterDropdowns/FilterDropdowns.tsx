import { PhotoObject } from '@/entities/Gallery';
import cls from './FilterDropdowns.module.scss';
import { useState } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { SortByDropdown } from './SortByDropdown';
import { AuthorsDropdown } from './AuthorsDropdown';

interface FilterDropdownsProps {
    selectedAuthors: string[];
    setSelectedAuthors: (authors: string[]) => void;
    sortBy: 'date_asc' | 'date_desc' | 'title';
    setSortBy: (sortBy: 'date_asc' | 'date_desc' | 'title') => void;
    photoObjects: PhotoObject[];
}

export const FilterDropdowns = ({
    selectedAuthors,
    setSelectedAuthors,
    sortBy,
    setSortBy,
    photoObjects,
}: FilterDropdownsProps) => {
    const [dropdownsOpen, setDropdownsOpen] = useState(false);
    const [sortByOpen, setSortByOpen] = useState(false);
    const [authorsOpen, setAuthorsOpen] = useState(false);

    const { isMobileSize } = useSizes();

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
                        Suodattimet
                        <FontAwesomeIcon icon={dropdownsOpen ? faChevronUp : faChevronDown} />
                    </button>
                </div>
            )}
            <div className={dropdownsOpen ? cls.divider : cls.hidden} />
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
        </div>
    );
};
