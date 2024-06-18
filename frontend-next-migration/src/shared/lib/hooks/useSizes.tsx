'use client';
import { useEffect, useState } from 'react';

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
    const handleResize = () => {
      setSizes(checkSizes());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    console.log('isMobileSize', sizes.isMobileSize);
    console.log('isTabletSize', sizes.isTabletSize);
    console.log('isDesktopSize', sizes.isDesktopSize);
    console.log('isWidescreenSize', sizes.isWidescreenSize);
  }, [sizes]);

  return sizes;
};

export default useSizes;
