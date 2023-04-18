import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {memo, useEffect} from "react";


interface ScrollBottomButtonProps {
    speedInMs?: number;
}

export const ScrollBottomButton = memo(({ speedInMs = 100000 }: ScrollBottomButtonProps) => {

    let scrollTimeout: any = null;
    const scrollToBottom = () => {
        const currentPosition = window.pageYOffset;
        const targetPosition = document.body.scrollHeight - window.innerHeight;
        const distance = targetPosition - currentPosition;
        const startTime = performance.now();

        const animateScroll = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const scrollPosition = linear(elapsedTime, currentPosition, distance, speedInMs);
            window.scrollTo(0, scrollPosition);

            if (elapsedTime < speedInMs) {
                requestAnimationFrame(animateScroll);
            } else {
                cancelAnimationFrame(scrollTimeout);
            }
        };

        if (currentPosition === targetPosition) {
            cancelAnimationFrame(scrollTimeout);
        } else {
            requestAnimationFrame(animateScroll);
        }
    };

    const handleClick = () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = requestAnimationFrame(scrollToBottom);
    };

    const handleScroll = () => {
        const currentPosition = window.pageYOffset;
        const targetPosition = document.body.scrollHeight - window.innerHeight;
        const distance = targetPosition - currentPosition;

        if (distance <= 0) {
            cancelAnimationFrame(scrollTimeout);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(scrollTimeout);
        };
    }, [scrollTimeout]);

    return <Button theme={ButtonTheme.Graffiti} size={ButtonSize.XL} onClick={handleClick}>Watch</Button>;
});

const linear = (t: number, b: number, c: number, d: number) => {
    return c * t / d + b;
};
