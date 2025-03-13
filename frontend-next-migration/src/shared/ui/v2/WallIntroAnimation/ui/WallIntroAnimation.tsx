'use client';
import { useEffect, useState, ReactNode } from 'react';
import cls from './WallIntroAnimation.module.scss';
import { IntroWall } from '@/shared/ui/v2/IntroWall';

/**
 * WallIntroAnimation component displays an animated wall.
 *
 * @param {ReactNode} children - The components or elements wrapped inside this component.
 * @param {boolean} renderOnce - Render animation only once per session.
 * @returns JSX element representing the WallIntroAnimation.
 *
 * @example
 *
 *  <WallIntroAnimation renderOnce={true}>
 *      <div
 *          id={'members'}
 *          className={classNames(cls.MembersPage)}
 *      >
 *          <SectionMembers className={cls.workersSection} />
 *     </div>
 *  </WallIntroAnimation>
 */

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
            const timer = setTimeout(() => setIsLoaded(true), 50);
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
                <IntroWall />
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
