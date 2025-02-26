'use client';
import { useEffect, useState, ReactNode } from 'react';
import cls from './WallIntroAnimation.module.scss';

interface WallLoaderProps {
    children: ReactNode;
    renderOnce?: boolean;
}

export default function WallIntroAnimation({ children, renderOnce }: WallLoaderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const isRenderedOnce = sessionStorage.getItem('isRendered');

    useEffect(() => {
        if (!renderOnce || !isRenderedOnce) {
            const timer = setTimeout(() => setIsLoaded(true), 100);
            const hideTimer = setTimeout(() => setIsVisible(false), 1000);
            if (renderOnce) {
                sessionStorage.setItem('isRendered', 'true');
            }
            return () => {
                clearTimeout(timer);
                clearTimeout(hideTimer);
            };
        } else if (isRenderedOnce) {
            setIsVisible(false);
        }
    }, []);

    if (!isVisible) return children;

    return (
        <div className={cls.wrapper}>
            <div className={`${cls.loader} ${isLoaded ? cls.loaded : ''}`}>
                <div className={cls.wallLeft} />
                <div className={cls.wallRight} />
            </div>
            <div
                className={cls.content}
                aria-hidden={!isLoaded}
            >
                {children}
            </div>
        </div>
    );
}
