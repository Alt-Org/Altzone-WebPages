'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react';
import { useClientTranslation } from '@/shared/i18n';
import styles from './SortDropdown.module.scss';

export interface SortDropdownProps {
    className?: string;
}

export const SortDropdown = (props: SortDropdownProps) => {
    const { className } = props;
    const { t } = useClientTranslation('furniture');

    return (
        <div className={classNames(styles.SortDropdown, undefined, [className ? className : ''])}>
            <select className={styles.Select}>
                <option value="">{t('sort-placeholder')}</option>
                {/* This is just a placeholder, no actual sorting functionality */}
            </select>
        </div>
    );
};
