import { useEffect } from 'react';

const useFontSizeAdjuster = (
    elementRefs: React.RefObject<HTMLElement | null>[],
    containerRef: React.RefObject<HTMLElement | null>,
    adjustFontSize: (element: HTMLElement, container: HTMLElement) => void,
) => {
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const handleResize = () => {
                elementRefs.forEach((ref) => {
                    const element = ref.current;
                    if (element) {
                        adjustFontSize(element, container);
                    }
                });
            };
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [elementRefs, containerRef, adjustFontSize]);

    return {
        elementRefs,
    };
};

export default useFontSizeAdjuster;
