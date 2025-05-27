'use client';
import { ReactNode } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { ScrollTop } from '@/features/ScrollTop';
import { LayoutDefault } from '@/preparedPages/Layouts';

type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <LayoutDefault>{children}</LayoutDefault>
            </div>
            <Footer />
            <ScrollTop />
        </div>
    );
}
