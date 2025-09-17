import { useRef, useCallback, ReactNode } from 'react';
import { ClickableBorder } from '@/shared/ui/ClickableBorder';
import useResizeObserver, { ResizeCallback } from '@/shared/lib/hooks/useResizeObserver';
import heroBorder from '@/shared/assets/images/heros/hero-border/hero-border3.png';
import cls from './Border.module.scss';
import { StaticImageData } from 'next/image';

export interface BorderProps {
    borderImageSrc?: string | StaticImageData;
    children: ReactNode;
}

export const Border = (props: BorderProps) => {
    const { borderImageSrc = heroBorder, children } = props;

    const borderImageUrl = typeof borderImageSrc === 'string' ? borderImageSrc : borderImageSrc.src;

    const elementRef = useRef<HTMLDivElement>(null);

    const handleImageSizeUpdate: ResizeCallback<HTMLDivElement> = useCallback((refCurrent) => {
        const width = refCurrent.clientWidth;
        const height = refCurrent.clientHeight;
        const aspectRatio = width / height;

        let paddingBasedOnAspectRatio;
        if (aspectRatio >= 1.2) {
            paddingBasedOnAspectRatio = 0.7;
        } else if (aspectRatio >= 1) {
            paddingBasedOnAspectRatio = 1;
        } else if (aspectRatio >= 0.7) {
            paddingBasedOnAspectRatio = 1.2;
        } else {
            paddingBasedOnAspectRatio = 1.7;
        }

        refCurrent.style.setProperty('--cardWidthLocal', `${width}px`);
        refCurrent.style.setProperty('--cardHeightLocal', `${height}px`);
        refCurrent.style.setProperty('--paddingBasedOnAspectRatio', `${paddingBasedOnAspectRatio}`);
    }, []);

    useResizeObserver({
        elementRef: elementRef,
        callback: handleImageSizeUpdate,
    });

    return (
        <ClickableBorder
            ref={elementRef}
            borderImageSource={borderImageUrl}
            className={cls.ClickableBorder}
        >
            {children}
        </ClickableBorder>
    );
};
