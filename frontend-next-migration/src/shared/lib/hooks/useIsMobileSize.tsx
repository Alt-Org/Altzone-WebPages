'use client';

import { useEffect, useState } from 'react';

/**
 * Returns a boolean value indicating whether the current screen size is considered mobile size.
 * The mobile size threshold is set to 768 pixels.
 * This function registers event listeners to handle page resizing and orientation changes.
 *
 * @returns {Object} An object with a single property `isMobileSize` representing the current screen size.
 *
 * @example
 * const { isMobileSize } = useIsMobileSize();
 * console.log(isMobileSize); // true or false
 */
const useIsMobileSize = () => {
  // const checkForDevice = () => (typeof window !== 'undefined' ? window.innerWidth <= 1023 : false);
  const checkForDevice = () =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  const [isMobileSize, setIsMobileSize] = useState(checkForDevice());

  useEffect(() => {
    const handlePageResized = () => {
      setIsMobileSize(checkForDevice());
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
    isMobileSize,
  };
};

export default useIsMobileSize;
