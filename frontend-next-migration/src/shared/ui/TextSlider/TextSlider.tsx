import { ReactNode, useState, useEffect } from 'react';
import cls from './TextSlider.module.scss';

type Props = {
    className?: string;
    textArray?: string[];
    leftArrow?: ReactNode;
    rightArrow?: ReactNode;
};

export const TextSlider = (props: Props) => {
    const {
        className = '',
        leftArrow = <LeftArrowSVG />,
        rightArrow = <RightArrowSVG />,
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
            {!isMobile && (
                <div
                    className={cls.btnRight}
                    onClick={showNextText}
                >
                    {rightArrow}
                </div>
            )}

            {textArray.length > 0 && <p>{textArray[textIndex]}</p>}

            {!isMobile && (
                <div
                    className={cls.btnLeft}
                    onClick={showPrevText}
                >
                    {leftArrow}
                </div>
            )}
        </div>
    );
};

export default TextSlider;

const LeftArrowSVG = () => (
    <svg
        width="10"
        height="20"
        viewBox="0 0 10 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9.6176 19.5598C9.86245 19.2778 10 18.8954 10 18.4967C10 18.098 9.86245 17.7157 9.6176 17.4337L3.15257 9.99092L9.6176 2.54815C9.85551 2.26457 9.98716 1.88476 9.98418 1.49052C9.9812 1.09629 9.84385 0.719168 9.60169 0.44039C9.35954 0.161613 9.03196 0.00348282 8.68951 5.72205e-05C8.34706 -0.00336838 8.01715 0.148186 7.77082 0.422075L0.382399 8.92789C0.137549 9.20985 0 9.59222 0 9.99092C0 10.3896 0.137549 10.772 0.382399 11.054L7.77082 19.5598C8.01575 19.8416 8.34789 20 8.69421 20C9.04053 20 9.37268 19.8416 9.6176 19.5598Z"
            fill="#FFA101"
        />
    </svg>
);

const RightArrowSVG = () => (
    <svg
        width="10"
        height="20"
        viewBox="0 0 10 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.382399 0.440231C0.137548 0.722196 0 1.10457 0 1.50327C0 1.90197 0.137548 2.28434 0.382399 2.56631L6.84743 10.0091L0.382399 17.4518C0.144487 17.7354 0.0128431 18.1152 0.0158186 18.5095C0.018795 18.9037 0.156153 19.2808 0.398308 19.5596C0.640464 19.8384 0.968041 19.9965 1.31049 19.9999C1.65294 20.0034 1.98285 19.8518 2.22918 19.5779L9.6176 11.0721C9.86245 10.7902 10 10.4078 10 10.0091C10 9.61038 9.86245 9.22801 9.6176 8.94604L2.22918 0.440231C1.98425 0.158351 1.65211 0 1.30579 0C0.959465 0 0.627322 0.158351 0.382399 0.440231Z"
            fill="#FFA101"
        />
    </svg>
);
