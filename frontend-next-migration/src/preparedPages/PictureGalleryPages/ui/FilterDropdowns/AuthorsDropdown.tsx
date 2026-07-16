import cls from './FilterDropdowns.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export const AuthorsDropdown = ({
    selectedAuthors,
    setSelectedAuthors,
    authorsList,
    authorsOpen,
    setAuthorsOpen,
    dropdownsOpen,
}: {
    selectedAuthors: string[];
    setSelectedAuthors: (authors: string[]) => void;
    authorsList: string[];
    authorsOpen: boolean;
    setAuthorsOpen: (open: boolean) => void;
    dropdownsOpen: boolean;
}) => {
    const { isMobileSize } = useSizes();

    return (
        <div className={cls.authorsDropdown}>
            <div className={cls.authorsDropdownContent}>
                <button
                    type="button"
                    className={`${cls.dropdownTitle} ${isMobileSize && !dropdownsOpen ? cls.hidden : ''}`}
                    onClick={() => setAuthorsOpen(!authorsOpen)}
                >
                    <span>Authors</span>
                    <FontAwesomeIcon icon={authorsOpen ? faChevronUp : faChevronDown} />
                </button>
                {authorsOpen && (!isMobileSize || dropdownsOpen) && (
                    <ul className={cls.authorsOptions}>
                        {authorsList.map((author) => (
                            <li key={author}>
                                <input
                                    type="checkbox"
                                    id={author}
                                    checked={selectedAuthors.includes(author)}
                                    onChange={() => {
                                        if (selectedAuthors.includes(author)) {
                                            setSelectedAuthors(
                                                selectedAuthors.filter((a) => a !== author),
                                            );
                                        } else {
                                            setSelectedAuthors([...selectedAuthors, author]);
                                        }
                                    }}
                                />
                                <label htmlFor={author}>{author}</label>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
