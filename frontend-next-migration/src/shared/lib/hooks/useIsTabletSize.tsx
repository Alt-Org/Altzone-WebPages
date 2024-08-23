import {useEffect, useState} from 'react';

/**
 * Custom hook to detect if the viewport is within tablet size range.
 *
 * @returns - An object containing a boolean indicating if the viewport is tablet size.
 *
 * @example
 * import useIsTabletSize from './useIsTabletSize';
 *
 * const MyComponent = () => {
 *   const { isTabletSize } = useIsTabletSize();
 *
 *   return (
 *     <div>
 *       {isTabletSize ? 'Tablet View' : 'Not Tablet View'}
 *     </div>
 *   );
 * };
 */
const useIsTabletSize = () => {
  const checkForDevice = () =>
      window.innerWidth >= 768 && window.innerWidth < 1024;

  const [isTabletSize, setIsTabletSize] = useState(false);

  useEffect(() => {
    const handlePageResized = () => {
      setIsTabletSize(checkForDevice());
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
    isTabletSize,
  };
};

export default useIsTabletSize;
