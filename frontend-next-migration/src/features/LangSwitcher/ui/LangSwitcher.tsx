'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './LangSwitcher.module.scss';
import languageIcon from '@/shared/assets/icons/langIcon.svg';
import Image from 'next/image';

type LangSwitcherProps = {
    className?: string;
    mouseOver?: boolean;
};

type Option = {
    label: string;
    value: string;
};

export const LangSwitcher = ({ mouseOver = true }: LangSwitcherProps) => {
    const currentPathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const {
        t,
        i18n: { language },
    } = useTranslation();

    const options = [
        { label: t('FIN'), value: 'fi' },
        { label: t('ENG'), value: 'en' },
        { label: t('RUS'), value: 'ru' },
        // Add more languages here
    ];

    const [selected, setSelected] = useState<string>(
        options.find((option) => option.value === language)?.value || options[0]?.value || '',
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

    const handleEnter = (event: React.KeyboardEvent<HTMLLIElement>) => {
        const items = Array.from(document.querySelectorAll('.selectable-item'));
        const activeElement = document.activeElement;
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
            className={cls.languageSwitcher}
        >
            <div
                onClick={toggleDropdown}
                className={cls.languageToggle}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <Image
                    src={languageIcon}
                    alt="Language Menu Icon"
                />
                <div className={cls.languageLabel}>
                    {options
                        .filter((option) => option.value === language)
                        .map((option) => option.label)
                        .join(', ')}
                </div>
            </div>
            {isOpen && mouseOver && (
                <ul className={cls.dropdown}>
                    {options.map((option) => (
                        <li
                            className={cls.selectableItem}
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
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
