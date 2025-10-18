'use client';
import { useEffect, useState } from 'react';

/**
 * Custom hook to check and monitor window size changes.
 *
 * The hook returns an object with boolean values indicating if the window
 * size falls within certain ranges (xs, sm, md, lg, xl, xxl).
 *
 * @returns - Object containing the following properties:
 *
 * xs 0px–575px
 * sm 576px–767px
 * md 768px–991px
 * lg 992px–1199px
 * xl 1200px–1399px
 * xxl 1400px-
 *
 * @example
 * const { xs, sm } = useBreakpoints();
 * if(xs) {
 *   // Perform actions related to mobile size.
 * }
 */
const useSizes = () => {
    const checkSizes = () => {
        const width = window.innerWidth;
        return {
            customXxs: width <= 457,
            xs: width <= 576,
            sm: width >= 577 && width < 768,
            md: width >= 768 && width < 992,
            lg: width >= 992 && width < 1200,
            xl: width >= 1200 && width < 1400,
            xxl: width >= 1400,
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
