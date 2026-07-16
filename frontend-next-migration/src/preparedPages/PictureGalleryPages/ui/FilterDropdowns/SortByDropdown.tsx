import useSizes from '@/shared/lib/hooks/useSizes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import cls from './FilterDropdowns.module.scss';

export const SortByDropdown = ({
    sortBy,
    setSortBy,
    sortByOpen,
    setSortByOpen,
    dropdownsOpen,
}: {
    sortBy: 'date_asc' | 'date_desc' | 'title';
    setSortBy: (value: 'date_asc' | 'date_desc' | 'title') => void;
    sortByOpen: boolean;
    setSortByOpen: (open: boolean) => void;
    dropdownsOpen: boolean;
}) => {
    const { isMobileSize } = useSizes();

    const sortByOptions = [
        { value: 'date_asc', label: 'Date (oldest first)' },
        { value: 'date_desc', label: 'Date (newest first)' },
        { value: 'title', label: 'Title' },
    ] as const;

    return (
        <div className={cls.sortByDropdown}>
            <div className={cls.sortByDropdownContent}>
                <button
                    type="button"
                    className={`${cls.dropdownTitle} ${isMobileSize && !dropdownsOpen ? cls.hidden : ''}`}
                    onClick={() => setSortByOpen(!sortByOpen)}
                >
                    Sort by
                    <FontAwesomeIcon icon={sortByOpen ? faChevronUp : faChevronDown} />
                </button>
                {sortByOpen && (!isMobileSize || dropdownsOpen) && (
                    <ul className={cls.sortByOptions}>
                        {sortByOptions.map((option) => (
                            <li key={option.value}>
                                <input
                                    type="radio"
                                    id={option.value}
                                    name="sortBy"
                                    checked={sortBy === option.value}
                                    onChange={() => setSortBy(option.value)}
                                />
                                <label htmlFor={option.value}>{option.label}</label>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
