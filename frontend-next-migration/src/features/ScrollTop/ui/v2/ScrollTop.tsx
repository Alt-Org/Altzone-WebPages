'use client';
import { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { useCurrentYPosition } from '@/shared/lib/hooks';
import upUpIcon from '@/shared/assets/icons/UpUp arrows.svg';
import cls from './ScrollTop.module.scss';

/**
 * Checks whether the user's current Y position is between scrollThreshold and bottomThreshold.
 * If it is, shows the button, otherwise hides it.
 *
 * @param {number} currentYPosition - The user's current Y-position.
 * @param {number} scrollThreshold - The threshold value above which the button is displayed.
 * @param {number} bottomThreshold - The threshold below which the button is hidden.
 */

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
        const viewportHeight = window.innerHeight;
        const pageHeight = document.body.scrollHeight;
        const scrollThreshold = viewportHeight / 6;
        const bottomThreshold = pageHeight - viewportHeight - scrollThreshold;

        if (currentYPosition > scrollThreshold && currentYPosition < bottomThreshold) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [currentYPosition]);

    return (
        <Button
            data-testid="scroll-to-top-btn"
            size={ButtonSize.XXXL}
            theme={ButtonTheme.OUTLINE}
            className={classNames(cls.ScrollTop, { [cls.show]: showButton }, [className])}
            onClick={handleButtonClick}
        >
            <Image
                src={upUpIcon}
                alt="double chevron pointing up"
            />
        </Button>
    );
});

ScrollTop.displayName = 'ScrollTop';
