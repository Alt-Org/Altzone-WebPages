import { useRef, useState, useEffect } from 'react';

const useImageDistance = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const otherElementRef = useRef<HTMLDivElement>(null);
  const [distanceToBottom, setDistanceToBottom] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const calculateDistance = () => {
    if (containerRef.current && imageRef.current && otherElementRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();
      const otherElementRect = otherElementRef.current.getBoundingClientRect();
      const distance =
        containerRect.bottom -
        Math.max(imageRect.bottom, otherElementRect.bottom);
      setDistanceToBottom(distance);
    }
  };

  useEffect(() => {
    if (imagesLoaded) {
      calculateDistance();
      setTimeout(() => {
        calculateDistance();
      }, 100);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const handleResize = () => {
      calculateDistance();
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
    otherElementRef,
    distanceToBottom,
    handleImageLoad,
    imagesLoaded,
  };
};

export default useImageDistance;
