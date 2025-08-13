'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { useRouter } from 'next/navigation';
import useSizes from '@/shared/lib/hooks/useSizes';
import back from '@/shared/assets/icons/backIconWithoutCircle.svg';
import backOrange from '@/shared/assets/icons/backIconOrange.svg';
import Image from 'next/image';
import styles from './BackButton.module.scss';

export interface BackButtonProps {
    className?: string;
}

export const BackButton = (props: BackButtonProps) => {
    const { className } = props;
    const { t } = useClientTranslation('furniture');
    const router = useRouter();
    const { isMobileSize } = useSizes();

    const handleBack = () => {
        router.back();
    };

    return isMobileSize ? (
        <button
            className={classNames(styles.MobileBackIcon, undefined, [className ? className : ''])}
        >
            <Image
                src={backOrange}
                alt="back icon"
            />
        </button>
    ) : (
        <button
            className={classNames(styles.BackButton, undefined, [className ? className : ''])}
            onClick={handleBack}
        >
            <Image
                src={back}
                alt="back icon"
            />
            <span>&nbsp;&nbsp;&nbsp;{t('back-button')}</span>
        </button>
    );
};
