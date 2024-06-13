import {RefObject, useEffect, useRef} from 'react';

type AttachmentImageReturn = {
    imageBgWrapperRef: RefObject<HTMLDivElement>;
}

export const useAttachmentImageToElement = (imagePath: string): AttachmentImageReturn => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentWrapperRef = wrapperRef.current;
        if (!currentWrapperRef) return;

        const dynamicStyles = `
      .fixed-background-effect {
        position: relative;
        z-index: 1;
      }
      .fixed-background-effect::before {
        background-image: url(${imagePath});
        content: "";
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    `;

        const styleElement = document.createElement('style');
        styleElement.innerHTML = dynamicStyles;
        document.head.appendChild(styleElement);

        currentWrapperRef.classList.add('fixed-background-effect');

        return () => {
            document.head.removeChild(styleElement);
            currentWrapperRef.classList.remove('fixed-background-effect');
        };
    }, [imagePath]);

    return { imageBgWrapperRef: wrapperRef };
};

