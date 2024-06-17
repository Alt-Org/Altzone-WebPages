'use client';
import { useEffect, useState } from 'react';

import useIsDesktopSize from './useIsDesktopSize';
import useIsMobileSize from './useIsMobileSize';
import useIsTabletSize from './useIsTabletSize';
import useIsWidescreenSize from './useIsWidescreenSize';

const useSizes = () => {
  const { isDesktopSize } = useIsDesktopSize();
  const { isMobileSize } = useIsMobileSize();
  const { isTabletSize } = useIsTabletSize();
  const { isWidescreenSize } = useIsWidescreenSize();

  useEffect(() => {
    console.log('isMobileSize', isMobileSize);
    console.log('isTabletSize', isTabletSize);
    console.log('isDesktopSize', isDesktopSize);
    console.log('isWidescreenSize', isWidescreenSize);
  });

  return {
    isDesktopSize,
    isMobileSize,
    isTabletSize,
    isWidescreenSize,
  };
};

export default useSizes;
