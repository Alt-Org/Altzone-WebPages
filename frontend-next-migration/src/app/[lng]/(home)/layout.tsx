'use client'
import { ReactNode, useRef } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { ScrollTop } from '@/features/ScrollTop';
import Intro from './_intro/Intro';
import { _useScrollHandler } from './_useScrollHandler';


type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    const introRef = useRef<HTMLDivElement>(null);
    const { isScrollbarHidden, scrollToContent} = _useScrollHandler(introRef);

    return (
        <>
            <Intro scrollToContent={scrollToContent} ref={introRef}/>
            <>
                <Navbar />
                {children}
                <Footer />
                <ScrollTop />
            </>
            <style>{`
                html {
                    scrollbar-width: ${isScrollbarHidden ? 'none' : 'auto'};
                }
                body {
                    -ms-overflow-style: ${isScrollbarHidden ? 'none' : 'auto'};
                }
                body::-webkit-scrollbar {
                    display: ${isScrollbarHidden ? 'none' : 'block'};
                }
            `}</style>
        </>
    );
}
