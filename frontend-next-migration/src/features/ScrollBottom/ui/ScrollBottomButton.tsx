'use client'
/**
 A button component that scrolls the window to the bottom of the page.
 @param {number} [speedInMs=50000] - The speed of the scroll animation in milliseconds.
 */
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {memo, useRef} from "react";
import {
    useBottomAnimationCancellation,
} from "../model/hooks/useBottomAnimationCancellation";
import {scrollToBottom} from "../model/scrollToBottom";
interface ScrollBottomButtonProps {
    speedInMs?: number;
    className?: string;
    text?: string
}

const ScrollBottomButtonComponent = ({ speedInMs = 50000 , className = '', text = "play"}: ScrollBottomButtonProps) => {
    const ScrollButtonId = 'ScrollButton'
    const animationFrameIdRef = useRef<number>(0);

    const handleWatchClick = () =>{
        scrollToBottom(speedInMs, animationFrameIdRef);
    }

    useBottomAnimationCancellation(animationFrameIdRef, ScrollButtonId);

    return <Button className={className} id={ScrollButtonId} theme={ButtonTheme.Graffiti} size={ButtonSize.XL} onClick={handleWatchClick}>{text}</Button>;
};

ScrollBottomButtonComponent.displayName = 'ScrollBottomButton';

export const ScrollBottomButton = memo(ScrollBottomButtonComponent);
