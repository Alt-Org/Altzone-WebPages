import React, { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import cls from './Layout.module.scss';

type Props = {
    children: ReactNode;
};

export default async function TeamLayout({ children }: Props) {
    return (
        <div className={cls.MemberContainer}>
            {children}
            <ScrollTop />
        </div>
    );
}
