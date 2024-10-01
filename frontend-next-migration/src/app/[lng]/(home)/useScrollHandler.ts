import { useEffect, useRef, useState } from 'react';

export const useScrollHandler = (introRef: React.RefObject<HTMLDivElement>) => {
    const [isScrollbarHidden, setIsScrollbarHidden] = useState(true);

    const updateScrollbarVisibility = () => {
        const isBelowIntro = window.scrollY > (introRef.current?.clientHeight || window.innerHeight);
        setIsScrollbarHidden(!isBelowIntro);
    };

    const scrollToIntro = (lastScrollY: { value: number }) => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY.value ? 'down' : 'up';
        lastScrollY.value = currentScrollY;
        if (introRef.current) {
            const introBottom = introRef.current.clientHeight;
            if (scrollDirection === 'up' && window.scrollY <= introBottom) {
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }, 100);
            }
        }
    };

    useEffect(() => {
        let lastScrollY = { value: 0 };
        const handleScroll = () => {
            updateScrollbarVisibility();
            scrollToIntro(lastScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const scrollToContent = () => {
        if (introRef.current) {
            window.scrollTo({
                top: introRef.current.clientHeight + 1,
                behavior: 'smooth',
            });
        }
    };

    return {isScrollbarHidden, scrollToContent};
};
