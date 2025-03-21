import { MutableRefObject } from 'react';
import { scrollToBottom } from './scrollToBottom';

beforeAll(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1000 });
    Object.defineProperty(document.body, 'scrollHeight', { value: 2000 });

    window.scrollTo = jest.fn();
});

describe('scrollToBottom', () => {
    it('should initiate scrolling animation', () => {
        const animationFrameIdRef: MutableRefObject<number> = { current: 0 };
        const speedInMs = 1000; // 1 second

        scrollToBottom(speedInMs, animationFrameIdRef);

        expect(animationFrameIdRef.current).toBeGreaterThan(0);
    });

    it('should scroll smoothly over the adjusted duration', () => {
        const animationFrameIdRef: MutableRefObject<number> = { current: 0 };
        const speedInMs = 1000;
        const slower = 150; // Keep it the same as in your function
        const totalDuration = speedInMs * slower; // Adjusted duration

        jest.useFakeTimers();
        scrollToBottom(speedInMs, animationFrameIdRef);

        jest.advanceTimersByTime(totalDuration);

        expect(window.scrollTo).toHaveBeenCalled();

        const calls = (window.scrollTo as jest.Mock).mock.calls;
        const lastCallYPosition = calls[calls.length - 1][1];

        expect(lastCallYPosition).toBeGreaterThan(1900); // Close to 2000
        expect(lastCallYPosition).toBeLessThan(2100); // Within range
    });

    afterAll(() => {
        jest.useRealTimers();
    });
});
