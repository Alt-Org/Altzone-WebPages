import {useEffect, useRef, MutableRefObject, RefObject} from 'react';

// Type definition for the callback function used in the hook
export type ResizeCallback<T> = (refCurrent: MutableRefObject<T>['current']) => void;

/**
 * Custom hook that allows observing the resize of an element.
 *
 * @template T - The type of the HTML element.
 * @param {Object} params - Parameters object.
 * @param {RefObject<T>} params.elementRef - Reference to the HTML element to observe.
 * @param {ResizeCallback<T>} params.callback - Callback to execute when the element resizes.
 *
 * @example
 * export const HeroCard = (props: Props) => {
 *   const elementRef = useRef(null);
 *
 *   const handleCardSizeUpdate: ResizeCallback<HTMLDivElement> = useCallback(
 *     (refCurrent) => {
 *       const width = refCurrent.clientWidth;
 *       refCurrent.style.setProperty('--cardWidthLocal', `${width}px`);
 *     },
 *     [],
 *   );
 *
 *   useResizeObserver({ elementRef, callback: handleCardSizeUpdate });
 *
 *   return <div ref={elementRef}>Resizable Content</div>;
 * };
 */
const useResizeObserver = <T>({elementRef, callback}: { elementRef: RefObject<T>; callback: ResizeCallback<T> }) => {
    useEffect(() => {
        const updateElementSize = () => {
            if (elementRef.current) {
                callback(elementRef.current);
            }
        };

        updateElementSize();
        window.addEventListener('resize', updateElementSize);
        return () => {
            window.removeEventListener('resize', updateElementSize);
        };
    }, [callback, elementRef]);
};

export default useResizeObserver;
