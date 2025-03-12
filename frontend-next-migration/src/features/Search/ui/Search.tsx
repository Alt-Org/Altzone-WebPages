import React from 'react';
import search from '@/shared/assets/icons/search.png';
import { CustomForm } from '@/shared/ui/CustomForm';
import cls from './Search.module.scss';

interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    return (
        <div className={cls.searchContainer}>
            <CustomForm.InputField
                label=""
                inputProps={{
                    placeholder: 'Hea',
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
