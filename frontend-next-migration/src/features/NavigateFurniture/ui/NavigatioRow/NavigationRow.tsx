'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react';
import { BackButton } from '../BackButton/BackButton';
import { SortDropdown } from '../SortDropdown/SortDropdown';
import styles from './NavigationRow.module.scss';

export interface NavigationRowProps {
    className?: string;
}

export const NavigationRow = (props: NavigationRowProps) => {
    const { className } = props;

    return (
        <div className={classNames(styles.NavigationRow, undefined, [className ? className : ''])}>
            <BackButton className={styles.BackButton} />
            <SortDropdown className={styles.SortDropdown} />
        </div>
    );
};
