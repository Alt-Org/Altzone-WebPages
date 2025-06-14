import React from 'react';
import search from '@/shared/assets/icons/search.png';
import { CustomForm } from '@/shared/ui/CustomForm';
import cls from './Search.module.scss';
import { useClientTranslation } from '@/shared/i18n';

interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * SearchInput component for displaying a search field with an icon.
 *
 * A reusable component that provides a consistent search input experience
 * with a search icon positioned to the left. Built using CustomForm.InputField
 * from the shared UI layer.
 *
 * @component
 * @example
 * Example usage in a parent component
 * const [searchTerm, setSearchTerm] = useState('');
 *
 * const handleSearch = (e) => {
 *   setSearchTerm(e.target.value);
 *    Additional search logic
 * };
 *
 * return (
 *   <SearchInput
 *     value={searchTerm}
 *     onChange={handleSearch}
 *     placeholder="Search articles..."
 *   />
 * );
 *
 * @param {Object} props - Component props
 * @param {string} props.value - Current value of the search input
 * @param {function} props.onChange - Handler function for input changes
 * @param {string} [props.placeholder] - Optional placeholder text for the input
 * @returns {JSX.Element} A search input component with an icon
 */

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    const { t } = useClientTranslation('search');
    return (
        <div className={cls.searchContainer}>
            <CustomForm.InputField
                label=""
                inputProps={{
                    placeholder: t('search'),
                    className: cls.searchInput,
                    value: value,
                    onChange: onChange,
                    style: {
                        backgroundImage: `url(${search.src})`,
                        backgroundPosition: 'left 10px center',
                        backgroundRepeat: 'no-repeat',
                        paddingLeft: '40px',
                        backgroundSize: '20px',
                    },
                }}
            />
        </div>
    );
};
