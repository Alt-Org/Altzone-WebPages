'use client';
import { useEffect, useState } from 'react';

/**
 * Custom hook to check and monitor window size changes.
 *
 * The hook returns an object with boolean values indicating if the window
 * size falls within certain ranges (e.g., mobile, tablet, desktop, widescreen).
 *
 * @returns - Object containing the following properties:
 *
 * - isMobileSize: boolean - True if window width is <= 768px.
 * - isTabletSize: boolean - True if window width is >= 768px and < 1024px.
 * - isDesktopSize: boolean - True if window width is >= 1024px and < 1440px.
 * - isWidescreenSize: boolean - True if window width is >= 1440px.
 *
 * @example
 * const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
 * if(isMobileSize) {
 *   // Perform actions related to mobile size.
 * }
 */
const useSizes = () => {
    const checkSizes = () => {
        const width = window.innerWidth;
        return {
            isMobileSize: width <= 768,
            isTabletSize: width >= 768 && width < 1024,
            isDesktopSize: width >= 1024 && width < 1440,
            isWidescreenSize: width >= 1440,
        };
    };

    const [sizes, setSizes] = useState(checkSizes());

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const handleResize = () => {
            setSizes(checkSizes());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize, { signal });
            window.addEventListener('orientationchange', handleResize, { signal });
            window.addEventListener('load', handleResize, { signal });
        }

        return () => {
            controller.abort();
        };
    }, []);

    return sizes;
};

export default useSizes;
