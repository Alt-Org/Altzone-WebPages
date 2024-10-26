import { renderHook, act } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { useBottomAnimationCancellation } from './useBottomAnimationCancellation';

// Mocking cancelAnimationFrame and event listener functions
beforeAll(() => {
    window.cancelAnimationFrame = jest.fn();
});

describe('useBottomAnimationCancellation', () => {
    let animationFrameIdRef: MutableRefObject<number>;

    beforeEach(() => {
        animationFrameIdRef = { current: 1 }; // Setting the animation ID for testing
    });

    it('should cancel animation on Escape key press', () => {
        const { result } = renderHook(() =>
            useBottomAnimationCancellation(animationFrameIdRef, 'startButton'),
        );

        // Creating Escape key press event
        const escapeEvent = new KeyboardEvent('keydown', { keyCode: 27 });
        act(() => {
            window.dispatchEvent(escapeEvent);
        });

        // Checking that cancelAnimationFrame was called
        expect(window.cancelAnimationFrame).toHaveBeenCalledWith(animationFrameIdRef.current);
        expect(animationFrameIdRef.current).toBe(0); // Checking that the animation ID is reset
    });

    it('should not cancel animation if the start button is clicked', () => {
        const { result } = renderHook(() =>
            useBottomAnimationCancellation(animationFrameIdRef, 'startButton'),
        );

        // Creating click event on the start button
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            composed: true,
        });

        // Creating start button element with the correct ID
        const startButton = document.createElement('button');
        startButton.id = 'startButton';
        document.body.appendChild(startButton); // Adding the button to the DOM

        act(() => {
            startButton.dispatchEvent(clickEvent);
        });

        // Checking that cancelAnimationFrame was not called
        expect(window.cancelAnimationFrame).not.toHaveBeenCalled();

        // Removing the button after the test
        document.body.removeChild(startButton);
    });

    afterAll(() => {
        jest.clearAllMocks(); // Clearing all mocks after the tests
    });
});
