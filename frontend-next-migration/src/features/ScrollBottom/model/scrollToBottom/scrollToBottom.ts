import { MutableRefObject } from 'react';

/**
 * Calculates the next scroll position based on the elapsed time and current position.
 *
 * @param {number} elapsedTime - The time elapsed since the animation started.
 * @param {number} currentPosition - The current position of the scroll.
 * @param {number} distance - The distance between the current position and the target position.
 * @param {number} speedInMs - The speed of the scroll animation in milliseconds.
 * @returns {number} - The next scroll position.
 */
const linear = (
    elapsedTime: number,
    currentPosition: number,
    distance: number,
    speedInMs: number,
): number => {
    return (distance * elapsedTime) / speedInMs + currentPosition;
};

/**
 * Scrolls the page to the bottom at a specified speed.
 *
 * @param {number} speedInMs - The speed of the scroll animation in milliseconds.
 * @param {MutableRefObject<number>} animationFrameIdRef - The reference to the animation frame ID.
 */
export const scrollToBottom = (
    speedInMs: number,
    animationFrameIdRef: MutableRefObject<number>,
) => {
    const currentPosition = window.scrollY;

    // Ensure scroll starts right above the "Meidän Tiimimme" layout
    const targetElement = document.querySelector('#meidan-tiimimme'); // Use the correct ID or class for the target element
    const targetPosition = targetElement
        ? targetElement.getBoundingClientRect().top + window.scrollY
        : document.body.scrollHeight - window.innerHeight;

    const distance = targetPosition - currentPosition;

    // Apply a slower speed factor
    const speedFactor = 15; // Adjust this value to slow it down further
    const dynamicSpeedInMs = distance * speedFactor;

    const startTime = performance.now();

    /**
     * Animates the scroll position over time.
     *
     * @param {number} currentTime - The current time of the animation.
     */
    const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const scrollPosition = linear(elapsedTime, currentPosition, distance, dynamicSpeedInMs);
        window.scrollTo(0, scrollPosition);

        if (elapsedTime < dynamicSpeedInMs) {
            animationFrameIdRef.current = requestAnimationFrame(animateScroll);
        }
    };

    animationFrameIdRef.current = requestAnimationFrame(animateScroll);
};
