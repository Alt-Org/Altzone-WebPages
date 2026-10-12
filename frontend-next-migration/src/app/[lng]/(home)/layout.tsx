'use client';
import { ReactNode } from 'react';
import { Navbar } from '@/widgets/NavbarV3';
import { Footer } from '@/widgets/Footer';
import { ScrollTop } from '@/features/ScrollTop';
import cls from './homeLayout.module.scss';

type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div className={cls.joinUsLayout}>{children}</div>
            <ScrollTop />
            <Footer />
        </div>
    );
}
