import { ReactNode, useState, useEffect } from 'react';
import cls from './TextSlider.module.scss';
import Image from 'next/image';
import LeftArrowSVG from '@/shared/assets/icons/ChevronLeft.svg';
import RightArrowSVG from '@/shared/assets/icons/ChevronRight.svg';

type Props = {
    className?: string;
    textArray?: string[];
    leftArrow?: ReactNode;
    rightArrow?: ReactNode;
};

export const TextSlider = (props: Props) => {
    const {
        className = '',
        leftArrow = (
            <Image
                src={LeftArrowSVG}
                alt="left-arrow"
            />
        ),
        rightArrow = (
            <Image
                src={RightArrowSVG}
                alt="right-arrow"
            />
        ),
        textArray = [],
    } = props;

    const [textIndex, setTextIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const showNextText = () => {
        setTextIndex((index) => {
            if (index === textArray.length - 1) return 0;
            return index + 1;
        });
    };

    const showPrevText = () => {
        setTextIndex((index) => {
            if (index === 0) return textArray.length - 1;
            return index - 1;
        });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!isMobile) return;
        const touchStartX = e.touches[0].clientX;
        // console.log(`touchStartX: ${touchStartX}`);

        const handleTouchMove = (e: TouchEvent) => {
            const touchEndX = e.touches[0]?.clientX || touchStartX;
            // console.log(`touchEndX: ${touchEndX}`);
            const diffX = touchStartX - touchEndX;

            if (diffX > 5) {
                showNextText();
            } else if (diffX < -5) {
                showPrevText();
            }

            document.removeEventListener('touchmove', handleTouchMove);
        };

        document.addEventListener('touchmove', handleTouchMove);
    };

    return (
        <div
            className={`${cls.TextSlider} ${className}`}
            onTouchStart={handleTouchStart}
        >
            <div
                className={cls.btnRight}
                onClick={showNextText}
            >
                {rightArrow}
            </div>

            {textArray.length > 0 && <p>{textArray[textIndex]}</p>}

            <div
                className={cls.btnLeft}
                onClick={showPrevText}
            >
                {leftArrow}
            </div>
        </div>
    );
};

export default TextSlider;
