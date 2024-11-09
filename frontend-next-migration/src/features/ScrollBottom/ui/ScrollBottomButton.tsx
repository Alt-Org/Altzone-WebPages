'use client';
import { memo, useRef } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { scrollToBottom } from '../model/scrollToBottom/scrollToBottom';
import { useBottomAnimationCancellation } from '../model/useBottomAnimationCancellation/useBottomAnimationCancellation';
import { isDisabled } from '@testing-library/user-event/dist/types/utils';

interface Props {
    speedInMs?: number;
    className?: string;
    text?: string;
    isDisabled?: boolean;
}

const ScrollBottomButtonComponent = (props: Props) => {
    const { speedInMs = 50000, className = '', text = 'play', isDisabled = false } = props;

    const ScrollButtonId = 'ScrollButton';
    const animationFrameIdRef = useRef<number>(0);

    const handleWatchClick = () => {
        scrollToBottom(speedInMs, animationFrameIdRef);
    };

    useBottomAnimationCancellation(animationFrameIdRef, ScrollButtonId);

    return (
        <Button
            disabled={isDisabled}
            className={className}
            id={ScrollButtonId}
            theme={ButtonTheme.Graffiti}
            size={ButtonSize.XL}
            onClick={handleWatchClick}
        >
            {text}
        </Button>
    );
};

ScrollBottomButtonComponent.displayName = 'ScrollBottomButton';

export const ScrollBottomButton = memo(ScrollBottomButtonComponent);
