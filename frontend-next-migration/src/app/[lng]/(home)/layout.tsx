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
    const [hideScrollbar, setHideScrollbar] = useState(true);

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
        setHideScrollbar(!isBelowIntro);
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
                {/*<div className={"navbar"}>*/}
                    <Navbar/>
                    {/*<Navbar overlaid />*/}
                {/*</div>*/}
                {children}
                <Footer />
                <ScrollTop />
            </div>

            <style jsx>{`
                .intro-wrapper {
                    height: 100vh;
                    width: 100%;
                    //position: relative;
                    z-index: 1000;
                    //background-color: #111;
                }
                .main-content {
                    position: relative;
                    //z-index: 1;
                    //top: 0;
                }
                
                .hide-scrollbar{
                    //position: relative;
                }
                
                //.navbar{
                //    position: fixed;
                //}
                
            `}</style>

            <style jsx global>{`
                html {
                    scrollbar-width: ${hideScrollbar ? 'none' : 'auto'};
                }
                body {
                    -ms-overflow-style: ${hideScrollbar ? 'none' : 'auto'};
                }
                body::-webkit-scrollbar {
                    display: ${hideScrollbar ? 'none' : 'block'};
                }
            `}</style>
        </>
    );
}



