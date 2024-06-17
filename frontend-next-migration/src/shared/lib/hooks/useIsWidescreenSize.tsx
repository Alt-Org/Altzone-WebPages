'use client';

import { useEffect, useState } from 'react';

const useIsWidescreenSize = () => {
  const checkForDevice = () =>
    typeof window !== 'undefined' ? window.innerWidth >= 1440 : false;

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
