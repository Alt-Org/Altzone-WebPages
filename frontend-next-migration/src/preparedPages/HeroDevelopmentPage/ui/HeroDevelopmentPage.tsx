'use client';
import { ReactNode } from 'react';
import { ComingSoon } from '@/widgets/ComingSoon';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './HeroDevelopmentPage.module.scss';

export type Props = {
    title: string;
    text: ReactNode;
};

const HeroDevelopmentPage = () => {
    return (
        <main className={classNames(cls.HeroDevelopmentPage)}>
            <ComingSoon />
        </main>
    );
};

export default HeroDevelopmentPage;
