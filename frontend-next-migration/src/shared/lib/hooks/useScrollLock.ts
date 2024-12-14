import { useEffect } from 'react';

const preventScroll = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

const preventArrowScroll = (event: KeyboardEvent) => {
    const keysToBlock = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
    if (keysToBlock.includes(event.key)) {
        event.preventDefault();
    }
};

const useScrollLock = (isEnabled: boolean) => {
    useEffect(() => {
        if (!isEnabled) return;

        const abortController = new AbortController();
        const signal = abortController.signal;

        window.addEventListener('wheel', preventScroll, { passive: false, signal });
        window.addEventListener('touchmove', preventScroll, { passive: false, signal });
        window.addEventListener('keydown', preventArrowScroll, { signal });

        return () => {
            abortController.abort();
        };
    }, [isEnabled]);
};

export default useScrollLock;
