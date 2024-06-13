import { useState, useEffect } from 'react';

export function useCurrentYPosition() {
    const [currentYPosition, setCurrentYPosition] = useState(0);

    useEffect(() => {
        function handleScroll() {
            setCurrentYPosition(window.scrollY);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return currentYPosition;
}
