'use client';
import { memo, useRef } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { scrollToBottom } from '../model/scrollToBottom/scrollToBottom';
import { useBottomAnimationCancellation } from '../model/useBottomAnimationCancellation/useBottomAnimationCancellation';

interface Props {
    speedInMs?: number;
    className?: string;
    text?: string;
    isDisabled?: boolean;
    onBeforePlay?: () => void;
}

const ScrollBottomButtonComponent = (props: Props) => {
    const {
        speedInMs = 25000,
        className = '',
        text = 'play',
        isDisabled = false,
        onBeforePlay,
    } = props;

    const ScrollButtonId = 'ScrollButton';
    const animationFrameIdRef = useRef<number>(0);

    const handleWatchClick = () => {
        if (onBeforePlay) {
            onBeforePlay();
        }

        scrollToBottom(speedInMs, animationFrameIdRef);
    };

    useBottomAnimationCancellation(animationFrameIdRef, ScrollButtonId);

    return (
        <Button
            disabled={isDisabled}
            className={className}
            id={ScrollButtonId}
            withScalableLink={true}
            size={ButtonSize.L}
            theme={ButtonTheme.BACKGROUND}
            onClick={handleWatchClick}
        >
            {text}
        </Button>
    );
};

ScrollBottomButtonComponent.displayName = 'ScrollBottomButton';

export const ScrollBottomButton = memo(ScrollBottomButtonComponent);
