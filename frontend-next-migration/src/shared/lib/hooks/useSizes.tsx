import useIsDesktopSize from './useIsDesktopSize';
import useIsMobileSize from './useIsMobileSize';
import useIsTabletSize from './useIsTabletSize';

const useSizes = () => {
  const { isDesktopSize } = useIsDesktopSize();
  const { isMobileSize } = useIsMobileSize();
  const { isTabletSize } = useIsTabletSize();

  return {
    isDesktopSize,
    isMobileSize,
    isTabletSize,
  };
};

export default useSizes;
