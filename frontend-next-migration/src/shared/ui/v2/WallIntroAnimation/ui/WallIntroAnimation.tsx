'use client';
import { useEffect, useRef, useState } from 'react';
import cls from './WallIntroAnimation.module.scss';
import { IntroWall } from '@/shared/ui/v2/IntroWall';

interface WallLoaderProps {
    renderOnce?: boolean;
}

export default function WallIntroAnimation({ renderOnce }: WallLoaderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        const hasRendered = renderOnce ? localStorage.getItem('isRendered') === 'true' : false;

        if (renderOnce && hasRendered) {
            setIsVisible(false);
            return () => {
                mountedRef.current = false;
            };
        }

        const t1 = window.setTimeout(() => {
            if (!mountedRef.current) return;
            setIsLoaded(true);
        }, 50);

        const t2 = window.setTimeout(() => {
            if (!mountedRef.current) return;
            setIsVisible(false);
        }, 2000);

        const t3 = renderOnce
            ? window.setTimeout(() => {
                  if (!mountedRef.current) return;
                  localStorage.setItem('isRendered', 'true');
              }, 400)
            : undefined;

        return () => {
            mountedRef.current = false;
            window.clearTimeout(t1);
            window.clearTimeout(t2);
            if (t3) window.clearTimeout(t3);
        };
    }, [renderOnce]);

    if (!isVisible) return null;

    return (
        <div className={cls.wrapper}>
            <div className={`${cls.loader} ${isLoaded ? cls.loaded : ''}`}>
                <IntroWall />
            </div>
        </div>
    );
}
