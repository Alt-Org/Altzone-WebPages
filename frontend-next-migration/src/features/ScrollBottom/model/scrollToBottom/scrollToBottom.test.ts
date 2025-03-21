import { MutableRefObject } from 'react';
import { scrollToBottom } from './scrollToBottom';

// Mocking scroll-related functions
beforeAll(() => {
    // Mocking window.scrollY and document.body.scrollHeight
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1000 });
    Object.defineProperty(document.body, 'scrollHeight', { value: 2000 });

    // Mocking the window.scrollTo function
    window.scrollTo = jest.fn();
});

describe('scrollToBottom', () => {
    it('should initiate scrolling animation', () => {
        const animationFrameIdRef: MutableRefObject<number> = { current: 0 };
        const speedInMs = 1000; // 1 second

        // Calling the scrollToBottom function
        scrollToBottom(speedInMs, animationFrameIdRef);

        // Check if the scroll action has been initiated
        expect(animationFrameIdRef.current).toBeGreaterThan(0);
    });

    it('should scroll smoothly over the adjusted duration', () => {
        const animationFrameIdRef: MutableRefObject<number> = { current: 0 };
        const speedInMs = 1000;
        const slower = 150; // Adjust slower for more visible scroll
        const totalDuration = speedInMs * slower;

        // Mocking requestAnimationFrame
        jest.useFakeTimers();
        scrollToBottom(speedInMs, animationFrameIdRef);

        // Advance time by a longer duration to see the effect
        jest.advanceTimersByTime(totalDuration);

        // Check that scrollTo was called at least once
        expect(window.scrollTo).toHaveBeenCalled();

        // Get the calls to scrollTo
        const calls = (window.scrollTo as jest.Mock).mock.calls;
        const lastCallYPosition = calls[calls.length - 1][1];

        // Change the check to be greater than or equal to 1000
        expect(lastCallYPosition).toBeGreaterThanOrEqual(1000); // Scroll should be at least 1000
        expect(lastCallYPosition).toBeLessThan(2000); // Ensure it's within the body height range
    });

    afterAll(() => {
        jest.useRealTimers(); // Restore real timers after tests
    });
});
