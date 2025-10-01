'use client';
import { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useCurrentYPosition } from '@/shared/lib/hooks';
import upUpIcon from '@/shared/assets/icons/UpUp arrows.svg';
import cls from './ScrollTop.module.scss';

interface ScrollTopProps {
    className?: string;
}

export const ScrollTop = memo(({ className = '' }: ScrollTopProps) => {
    const currentYPosition = useCurrentYPosition();

    const handleButtonClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Show button after scrolling down 100px
        if (currentYPosition > 100) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [currentYPosition]);

    return (
        <button
            data-testid="scroll-to-top-btn"
            className={classNames(cls.ScrollTop, { [cls.show]: showButton }, [className])}
            onClick={handleButtonClick}
            aria-label="Scroll to top"
        >
            <Image
                src={upUpIcon}
                alt="double chevron pointing up"
                width={32}
                height={32}
                draggable={false}
            />
        </button>
    );
});

ScrollTop.displayName = 'ScrollTop';
