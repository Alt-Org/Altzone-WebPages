'use client'
import { ReactNode, useRef } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { ScrollTop } from '@/features/ScrollTop';
import Intro from './_intro/Intro';
import { classNames } from "@/shared/lib/classNames/classNames";
import { useScrollHandler } from './useScrollHandler';


type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    const introRef = useRef<HTMLDivElement>(null);
    const { isScrollbarHidden, scrollToContent} = useScrollHandler(introRef);

    return (
        <>
            <div ref={introRef} className="intro-wrapper">
                <Intro scrollToContent={scrollToContent} />
            </div>

            <div className={classNames("main-content")}>
                <Navbar />
                {children}
                <Footer />
                <ScrollTop />
            </div>

            <style jsx global>{`
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
