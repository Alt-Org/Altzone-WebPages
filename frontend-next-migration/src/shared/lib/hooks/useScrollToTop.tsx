'use client';
import { useEffect } from 'react';

/**
 * Custom hook that scrolls the window to the top each time the component that uses it is mounted.
 *
 * @example
 * // In a functional component:
 * const MyComponent = () => {
 *   useScrollToTop();
 *
 *   return (
 *     <div>
 *       // Your component code
 *     </div>
 *   );
 * };
 */
export function useScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
}
