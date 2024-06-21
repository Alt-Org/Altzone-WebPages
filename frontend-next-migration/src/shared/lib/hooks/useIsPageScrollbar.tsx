import { useState, useEffect } from 'react';

const useIsPageScrollbar = () => {
    const [hasScrollbar, setHasScrollbar] = useState(false);

    useEffect(() => {
        const checkScrollbar = () => {
            setHasScrollbar(window.innerHeight < document.documentElement.scrollHeight);
        };

        checkScrollbar();
        window.addEventListener('resize', checkScrollbar);
        return () => window.removeEventListener('resize', checkScrollbar);
    }, []);

    return hasScrollbar;
};

export default useIsPageScrollbar;
