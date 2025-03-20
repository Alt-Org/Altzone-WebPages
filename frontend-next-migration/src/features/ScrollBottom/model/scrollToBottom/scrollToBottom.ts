import { MutableRefObject } from 'react';

/**
 * Calculates the next scroll position based on elapsed time, current position, distance, and slow speed factor.
 *
 * @param {number} elapsedTime - The time elapsed since the animation started.
 * @param {number} currentPosition - The current position of the scroll.
 * @param {number} distance - The distance between the current position and the target position.
 * @param {number} slower - Makes it to slow down the scroll.
 * @returns {number} - The next scroll position.
 */
const slowScroll = (
    elapsedTime: number,
    currentPosition: number,
    distance: number,
    slower: number,
): number => {
    const adjustedElapsedTime = elapsedTime / slower;
    return (distance * adjustedElapsedTime) / 1000 + currentPosition; // Makes it scroll slower
};

/**
 * Scrolls the page to the bottom at a much slower speed.
 *
 * @param {number} speedInMs - The total speed of the scroll animation in milliseconds.
 * @param {MutableRefObject<number>} animationFrameIdRef - The reference to the animation frame ID.
 */
export const scrollToBottom = (
    speedInMs: number,
    animationFrameIdRef: MutableRefObject<number>,
) => {
    const currentPosition = window.scrollY;
    const targetPosition = document.body.scrollHeight - window.innerHeight;
    const distance = targetPosition - currentPosition;
    const startTime = performance.now();

    const slower = 150; // higher value = slower scroll

    /**
     * Animates the scroll position with a slow effect.
     *
     * @param {number} currentTime - The current time of the animation.
     */
    const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const scrollPosition = slowScroll(elapsedTime, currentPosition, distance, slower);
        window.scrollTo(0, scrollPosition);

        if (elapsedTime < speedInMs * slower) {
            animationFrameIdRef.current = requestAnimationFrame(animateScroll);
        }
    };
    animationFrameIdRef.current = requestAnimationFrame(animateScroll);
};
