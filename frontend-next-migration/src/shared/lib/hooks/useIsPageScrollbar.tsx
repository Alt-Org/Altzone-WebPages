import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the page has a vertical scrollbar.
 *
 * @returns {boolean} - True if the page has a vertical scrollbar, otherwise false.
 *
 * @example
 * const MyComponent = () => {
 *   const hasScrollbar = useIsPageScrollbar();
 *
 *   return (
 *     <div>
 *       {hasScrollbar ? 'Page has a scrollbar' : 'Page does not have a scrollbar'}
 *     </div>
 *   );
 * };
 */
const useIsPageScrollbar = () => {
    const [hasScrollbar, setHasScrollbar] = useState(false);

    useEffect(() => {
        const checkScrollbar = () => {
            setHasScrollbar(window.innerHeight < document.documentElement.scrollHeight);
        };

        checkScrollbar();
        window.addEventListener('resize', checkScrollbar);

        const observer = new MutationObserver(checkScrollbar);
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });

        return () => {
            window.removeEventListener('resize', checkScrollbar);
            observer.disconnect();
        };
    }, []);

    return hasScrollbar;
};

export default useIsPageScrollbar;
