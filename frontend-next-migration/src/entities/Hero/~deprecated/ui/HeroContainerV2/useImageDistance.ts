import { useRef, useState, useEffect } from 'react';

// be very careful with refactoring
const useImageDistance = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [distanceToBottom, setDistanceToBottom] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const calculateDistance = () => {
        if (containerRef.current && imageRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const imageRect = imageRef.current.getBoundingClientRect();
            const distance = containerRect.bottom - imageRect.bottom;
            setDistanceToBottom(distance);
        }
    };

    useEffect(() => {
        if (imagesLoaded) {
            // be very careful with refactoring, first time for good internet second time for slow
            calculateDistance();
            setTimeout(() => {
                calculateDistance();
            }, 100);
        }
    }, [imagesLoaded]);

    useEffect(() => {
        const handleResize = () => {
            calculateDistance();
            // it is very important when we switch fullscreen we should make that macrotask
            setTimeout(() => {
                calculateDistance();
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleImageLoad = () => setImagesLoaded(true);

    return {
        containerRef,
        imageRef,
        distanceToBottom,
        handleImageLoad,
        imagesLoaded,
    };
};

export default useImageDistance;
