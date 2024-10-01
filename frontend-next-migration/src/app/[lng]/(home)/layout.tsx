'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { ScrollTop } from '@/features/ScrollTop';
import Intro from './Intro';
import {classNames} from "@/shared/lib/classNames/classNames";

type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    const introRef = useRef<HTMLDivElement>(null);
    const [isScrollbarHidden, setIsScrollbarHidden] = useState(true);

    const scrollToContent = () => {
        if (introRef.current) {
            window.scrollTo({
                top: introRef.current.clientHeight + 1,
                behavior: 'smooth',
            });
        }
    };
    const updateScrollbarVisibility = () => {
        const isBelowIntro = window.scrollY > (introRef.current?.clientHeight || window.innerHeight);
        setIsScrollbarHidden(!isBelowIntro);
    };
    const scrollToIntro = (lastScrollY: { value: number }) => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY.value ? 'down' : 'up';
        lastScrollY.value = currentScrollY;
        if (introRef.current) {
            const introBottom = introRef.current.clientHeight;
            if (scrollDirection === 'up' && window.scrollY <= introBottom) {
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }, 100);
            }
        }
    };
    useEffect(() => {
        let lastScrollY = {value : 0};
        const handleScroll = () => {
            updateScrollbarVisibility();
            scrollToIntro(lastScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div ref={introRef} className="intro-wrapper">
                <Intro scrollToContent={scrollToContent} />
            </div>

            <div className={classNames("main-content")}>
                <Navbar/>
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



