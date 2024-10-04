import { useEffect, useState } from 'react';

export const _useScrollHandler = (introRef: React.RefObject<HTMLDivElement>) => {
    const [isScrollbarHidden, setIsScrollbarHidden] = useState(true);

    const updateScrollbarVisibility = () => {
        const isBelowIntro = window.scrollY > (introRef.current?.clientHeight || window.innerHeight);
        setIsScrollbarHidden(!isBelowIntro);
    };

    const disableUserInteraction = () => {
        document.body.style.pointerEvents = 'none';
        document.body.style.userSelect = 'none';
        document.body.style.overflow = 'hidden';
    };

    const enableUserInteraction = () => {
        document.body.style.pointerEvents = '';
        document.body.style.userSelect = '';
        document.body.style.overflow = '';
    };

    const scrollToIntroOrContent = (lastScrollY: { value: number }) => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY.value ? 'down' : 'up';
        lastScrollY.value = currentScrollY;

        if (introRef.current) {
            const introBottom = introRef.current.clientHeight;

            if (scrollDirection === 'up' && window.scrollY <= introBottom) {
                disableUserInteraction();
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                    setTimeout(() => {
                        enableUserInteraction();
                    }, 500);
                }, 100);
            }

            if (scrollDirection === 'down' && window.scrollY < introBottom) {
                disableUserInteraction();
                setTimeout(() => {
                    window.scrollTo({
                        top: introBottom + 1,
                        behavior: 'smooth',
                    });
                    setTimeout(() => {
                        enableUserInteraction();
                    }, 500);
                }, 100);
            }
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        let lastScrollY = { value: 0 };
        const handleScroll = () => {
            updateScrollbarVisibility();
            scrollToIntroOrContent(lastScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToContent = () => {
        if (introRef.current) {
            disableUserInteraction();
            window.scrollTo({
                top: introRef.current.clientHeight + 1,
                behavior: 'smooth',
            });
            setTimeout(() => {
                enableUserInteraction();
            }, 500);
        }
    };

    return { isScrollbarHidden, scrollToContent };
};
