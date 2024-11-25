import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type LangSwitcherProps = {
    className?: string;
};

type Option = {
    label: string;
    value: string;
};

export const LangSwitcher = ({ className = '' }: LangSwitcherProps) => {
    const currentPathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const {
        t,
        i18n: { language },
    } = useTranslation();

    const options = [
        { label: t('finnish'), value: 'fi' },
        { label: t('english'), value: 'en' },
        // Add more languages here
    ];

    // Get the label of the current language
    const [selected, setSelected] = useState<string>(
        options.find((option) => option.value === language)?.label || options[0]?.label || '',
    );

    const handleChangeLanguage = (newLanguage: AppLanguage) => {
        window.location.href = currentPathname.replace(`/${language}`, `/${newLanguage}`);
    };

    const handleOptionClick = (option: Option) => {
        const selectedLanguage = option.value as AppLanguage;
        handleChangeLanguage(selectedLanguage);
        setIsOpen(false);
        setSelected(option.label);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Selecting an option by pressing enter (for keyboard accessibility)
    const handleEnter = (event: React.KeyboardEvent<HTMLLIElement>) => {
        const items = Array.from(document.querySelectorAll('.selectable-item'));
        const activeElement = document.activeElement;
        // Active element is one of the options and the pressed key is enter
        if (activeElement && event.key === 'Enter') {
            const currentIndex = items.indexOf(activeElement);
            if (currentIndex !== -1) {
                const selectedItem = items[currentIndex];
                const value = selectedItem.getAttribute('data-option-value');
                const name = selectedItem.getAttribute('data-name');
                if (value && name) {
                    const option: Option = { label: name, value: value };
                    handleOptionClick(option);
                }
            }
        }
    };

    // Close the menu if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            data-testid="language-switcher"
            ref={dropdownRef}
            className={classNames('', {}, [className])}
        >
            <button
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {selected}
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {isOpen && (
                <ul>
                    {options.map((option) => (
                        <li
                            className="selectable-item"
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            // For screen readers
                            role="option"
                            aria-selected={option.value === language ? 'true' : 'false'}
                            tabIndex={0}
                            data-option-value={option.value}
                            data-name={option.label}
                            onKeyDown={handleEnter}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
