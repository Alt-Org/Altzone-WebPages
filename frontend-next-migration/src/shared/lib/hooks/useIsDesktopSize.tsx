'use client';
import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the window size is within desktop range.
 *
 * @returns  An object containing a boolean `isDesktopSize`.
 *
 * @example
 * import useIsDesktopSize from './useIsDesktopSize';
 *
 * const MyComponent = () => {
 *   const { isDesktopSize } = useIsDesktopSize();
 *
 *   return (
 *     <div>
 *       {isDesktopSize ? (
 *         <p>Desktop View</p>
 *       ) : (
 *         <p>Non-Desktop View</p>
 *       )}
 *     </div>
 *   );
 * };
 */
const useIsDesktopSize = () => {
    const checkForDevice = () =>
        typeof window !== 'undefined'
            ? window.innerWidth >= 1024 && window.innerWidth < 1920
            : false;

    const [isDesktopSize, setIsDesktopSize] = useState(checkForDevice());

    useEffect(() => {
        const handlePageResized = () => {
            setIsDesktopSize(checkForDevice());
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
        isDesktopSize,
    };
};

export default useIsDesktopSize;
