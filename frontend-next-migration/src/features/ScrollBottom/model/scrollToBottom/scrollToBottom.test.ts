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
    it('should scroll to the bottom of the page', () => {
        const animationFrameIdRef: MutableRefObject<number> = { current: 0 };
        const speedInMs = 1000; // 1 second

        // Calling the scrollToBottom function
        scrollToBottom(speedInMs, animationFrameIdRef);

        // Check if the scroll action has been initiated
        expect(animationFrameIdRef.current).toBeGreaterThan(0);
    });

    it('should scroll smoothly over the specified duration', async () => {
        const animationFrameIdRef: MutableRefObject<number> = { current: 0 };
        const speedInMs = 1000; // 1 second

        // Mocking requestAnimationFrame
        jest.useFakeTimers();
        scrollToBottom(speedInMs, animationFrameIdRef);

        // Advance timers to the end of the duration
        jest.advanceTimersByTime(speedInMs);

        // Check that scrollTo was called at least once
        expect(window.scrollTo).toHaveBeenCalled();

        // Get the calls to scrollTo
        const calls = (window.scrollTo as jest.Mock).mock.calls;

        // Check the last call to scrollTo is close to the expected final value
        const lastCallYPosition = calls[calls.length - 1][1]; // Get the last y position
        expect(calls[calls.length - 1][0]).toBe(0); // x position should be 0
        expect(lastCallYPosition).toBeGreaterThan(900); // Should be close to 1000
        expect(lastCallYPosition).toBeLessThan(1100); // Should be close to 1000
    });

    afterAll(() => {
        jest.useRealTimers(); // Restore real timers after tests
    });
});
