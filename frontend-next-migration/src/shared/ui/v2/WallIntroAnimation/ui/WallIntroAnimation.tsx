'use client';
import { useEffect, useState } from 'react';
import cls from './WallIntroAnimation.module.scss';
import { IntroWall } from '@/shared/ui/v2/IntroWall';

/**
 * WallIntroAnimation component displays an animated wall.
 *
 * @param {boolean} renderOnce - Render animation only once per session.
 * @returns JSX element representing the WallIntroAnimation.
 *
 * @example
 *
 *
 *      <div>
 *         <WallIntroAnimation />
 *     </div>
 *
 */

interface WallLoaderProps {
    renderOnce?: boolean;
}

export default function WallIntroAnimation({ renderOnce }: WallLoaderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const isRenderedOnce = localStorage.getItem('isRendered');

    useEffect(() => {
        if (!renderOnce || !isRenderedOnce) {
            const timer = setTimeout(() => setIsLoaded(true), 50);
            const hideTimer = setTimeout(() => setIsVisible(false), 2000);
            if (renderOnce) {
                setTimeout(() => localStorage.setItem('isRendered', 'true'), 400);
            }
            return () => {
                clearTimeout(timer);
                clearTimeout(hideTimer);
            };
        } else if (isRenderedOnce) {
            setIsVisible(false);
        }
    }, []);

    if (!renderOnce || !isRenderedOnce)
        return (
            <div className={cls.wrapper}>
                <div className={`${cls.loader} ${isLoaded ? cls.loaded : ''}`}>
                    <IntroWall />
                </div>
            </div>
        );
}
