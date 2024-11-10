'use client';
import { useEffect, useState, ReactNode } from 'react';
import cls from './WallIntroAnimation.module.scss';

interface WallLoaderProps {
    children: ReactNode;
}

export default function WallIntroAnimation({ children }: WallLoaderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 500);
        const hideTimer = setTimeout(() => setIsVisible(false), 1000);
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
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
