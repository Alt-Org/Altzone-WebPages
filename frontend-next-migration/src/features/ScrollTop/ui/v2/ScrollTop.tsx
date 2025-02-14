'use client';
import { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
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
        if (currentYPosition > window.innerHeight / 6) {
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
