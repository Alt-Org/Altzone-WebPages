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
        <>
            {/*<Intro*/}
            {/*    scrollToContent={scrollToContent}*/}
            {/*    ref={introRef}*/}
            {/*/>*/}
            <>
                <Navbar />
                <LayoutDefault marginTop={'160px'}>{children}</LayoutDefault>
                <Footer />
                <ScrollTop />
            </>
            {/*<style*/}
            {/*    jsx*/}
            {/*    global*/}
            {/*>{`*/}
            {/*    html {*/}
            {/*        scrollbar-width: ${isScrollbarHidden ? 'none' : 'auto'};*/}
            {/*    }*/}
            {/*    body {*/}
            {/*        -ms-overflow-style: ${isScrollbarHidden ? 'none' : 'auto'};*/}
            {/*    }*/}
            {/*    body::-webkit-scrollbar {*/}
            {/*        display: ${isScrollbarHidden ? 'none' : 'block'};*/}
            {/*    }*/}
            {/*`}</style>*/}
        </>
    );
}
