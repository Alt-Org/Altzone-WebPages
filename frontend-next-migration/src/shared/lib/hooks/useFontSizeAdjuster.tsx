import { useRef, useEffect } from 'react';

const useFontSizeAdjuster = (
  elementRef: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>,
  adjustFontSize: (element: HTMLElement, container: HTMLElement) => void,
) => {
  useEffect(() => {
    const element = elementRef.current;
    const container = containerRef.current;
    if (element && container) {
      const handleResize = () => {
        console.log('Adjusting font size');
        adjustFontSize(element, container);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [elementRef, containerRef, adjustFontSize]);

  return {
    elementRef,
  };
};

export default useFontSizeAdjuster;
