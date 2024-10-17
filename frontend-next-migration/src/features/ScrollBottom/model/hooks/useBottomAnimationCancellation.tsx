import { MutableRefObject, useCallback, useEffect } from "react";
import { addEventListeners, removeEventListeners } from "@/shared/lib/eventListeners";

/**
 * Cancels the scroll animation when the user presses the escape key or clicks outside the start button.
 *
 * @param {MutableRefObject<number>} animationFrameIdRef - The reference to the animation frame ID.
 * @param {string} ScrollStartButtonId - The ID of the start button.
 */
export const useBottomAnimationCancellation = (
    animationFrameIdRef: MutableRefObject<number>,
    ScrollStartButtonId: string
) => {
    const handleCancelling = useCallback((event: Event) => {
        // Esc key
        if ("keyCode" in event && event.keyCode === 27) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = 0;
        }

        // Allows pressing start button
        const target = event.target as HTMLButtonElement;
        if (target.id !== ScrollStartButtonId) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = 0;
        }
    }, [ScrollStartButtonId, animationFrameIdRef, ]);

    useEffect(() => {
        const eventNames: Array<(keyof WindowEventMap)> = ['keydown', 'click'];
        const handleCancellingWrapper = (event: Event) => handleCancelling(event);

        addEventListeners(eventNames, handleCancellingWrapper);

        return () => {
            removeEventListeners(eventNames, handleCancellingWrapper);
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = 0;
        };
    }, [handleCancelling, animationFrameIdRef, ScrollStartButtonId, ]);
};

