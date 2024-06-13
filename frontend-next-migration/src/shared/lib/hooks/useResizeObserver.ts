import { useEffect, useRef, MutableRefObject, RefObject } from 'react';

export type ResizeCallback<T> = (refCurrent: MutableRefObject<T>['current']) => void;

const useResizeObserver = <T>({ elementRef, callback}: { elementRef: RefObject<T>; callback: ResizeCallback<T> }) => {
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
