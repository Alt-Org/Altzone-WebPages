"use client"

import { useEffect, useState } from 'react';

const useIsMobileSize = () => {
  // const checkForDevice = () => (typeof window !== 'undefined' ? window.innerWidth <= 1023 : false);
  const checkForDevice = () => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

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
