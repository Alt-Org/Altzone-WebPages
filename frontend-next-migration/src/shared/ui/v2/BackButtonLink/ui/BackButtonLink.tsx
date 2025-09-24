'use client';
import Link from 'next/link';
import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import back from '@/shared/assets/icons/backIconWithoutCircle.svg';
import backOrange from '@/shared/assets/icons/backIconOrange.svg';
import Image from 'next/image';
import cls from './BackButtonLink.module.scss';

export interface BackButtonLinkProps {
    className?: string;
    href: string;
}

export const BackButtonLink = ({ className, href }: BackButtonLinkProps) => {
    const { t } = useClientTranslation('furniture');
    const { isMobileSize } = useSizes();

    return (
        <Link
            href={href}
            className={classNames(isMobileSize ? cls.MobileBackIcon : cls.BackButton, undefined, [
                className ? className : '',
            ])}
        >
            <Image
                src={isMobileSize ? backOrange : back}
                alt="back icon"
            />
            {!isMobileSize && <span>&nbsp;&nbsp;&nbsp;{t('back-button')}</span>}
        </Link>
    );
};
