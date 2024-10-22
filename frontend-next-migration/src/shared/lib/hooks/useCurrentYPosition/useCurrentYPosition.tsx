import { useState, useEffect } from 'react';

/**
 * Custom hook that tracks the current vertical scroll position of the window.
 *
 * @returns {number} The current Y position (scroll position) of the window, in pixels.
 *
 * @example
 *
 * import React from 'react';
 * import { useCurrentYPosition } from './useCurrentYPosition';
 *
 * function ScrollTopButton() {
 *   const currentYPosition = useCurrentYPosition();
 *
 *   const handleClick = () => {
 *     window.scrollTo({ top: 0, behavior: 'smooth' });
 *   };
 *
 *   return (
 *     <button
 *       style={{ display: currentYPosition > 100 ? 'block' : 'none' }}
 *       onClick={handleClick}
 *     >
 *       Scroll to Top
 *     </button>
 *   );
 * }
 *
 * export default ScrollTopButton;
 */
export function useCurrentYPosition(): number {
    const [currentYPosition, setCurrentYPosition] = useState(0);

    useEffect(() => {
        function handleScroll() {
            setCurrentYPosition(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return currentYPosition;
}
