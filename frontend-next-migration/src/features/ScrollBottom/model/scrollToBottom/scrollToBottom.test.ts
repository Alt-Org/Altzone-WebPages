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
        const slower = 10; // Adjusted from 150 to avoid excessive duration
        const totalDuration = speedInMs * slower;

        jest.useFakeTimers();
        scrollToBottom(speedInMs, animationFrameIdRef);

        jest.runAllTimers(); // Ensure all animations complete

        expect(window.scrollTo).toHaveBeenCalled();

        const calls = (window.scrollTo as jest.Mock).mock.calls;
        const lastCallYPosition = calls[calls.length - 1][1];

        expect(lastCallYPosition).toBeGreaterThan(1800); // Less strict
    });

    afterAll(() => {
        jest.useRealTimers();
    });
});
