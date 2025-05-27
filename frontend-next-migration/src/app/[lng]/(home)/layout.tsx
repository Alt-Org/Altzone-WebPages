'use client';
import { ReactNode, useRef } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { ScrollTop } from '@/features/ScrollTop';
// import Intro from './_intro/Intro';
// import { _useScrollHandler } from './_useScrollHandler';
import { LayoutDefault } from '@/preparedPages/Layouts';

type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    const introRef = useRef<HTMLDivElement>(null);
    // const { isScrollbarHidden, scrollToContent } = _useScrollHandler(introRef);

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
