'use client';
import { useEffect, useState } from 'react';

/**
 * Custom Hook to determine if the viewport is widescreen size.
 *
 * @returns {Object} An object containing a boolean `isWidescreenSize` indicating whether the viewport is considered widescreen.
 *
 * @example
 * import useIsWidescreenSize from 'path/to/useIsWidescreenSize';
 *
 * const MyComponent = () => {
 *   const { isWidescreenSize } = useIsWidescreenSize();
 *
 *   return (
 *     <div>
 *       {isWidescreenSize ? 'Widescreen mode' : 'Not in widescreen mode'}
 *     </div>
 *   );
 * };
 */
const useIsWidescreenSize = () => {
    const checkForDevice = () =>
        typeof window !== 'undefined' ? window.innerWidth >= 1920 : false;

    const [isWidescreenSize, setIsWidescreenSize] = useState(checkForDevice());

    useEffect(() => {
        const handlePageResized = () => {
            setIsWidescreenSize(checkForDevice());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handlePageResized);
            window.addEventListener('orientationchange', handlePageResized);
            window.addEventListener('load', handlePageResized);
            window.addEventListener('reload', handlePageResized);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handlePageResized);
                window.removeEventListener('orientationchange', handlePageResized);
                window.removeEventListener('load', handlePageResized);
                window.removeEventListener('reload', handlePageResized);
            }
        };
    }, []);

    return {
        isWidescreenSize,
    };
};

export default useIsWidescreenSize;
