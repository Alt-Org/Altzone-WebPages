import { ClickableBorder } from "@/shared/ui/ClickableBorder"
import { useRef, useCallback } from "react"
import { ResizeCallback } from "@/shared/lib/hooks/useResizeObserver"
import useResizeObserver from "@/shared/lib/hooks/useResizeObserver"

export interface BorderProps {
    borderImageSrc: string
    children: React.ReactNode
    className: string
}

export const Border = (props: BorderProps) => {
    const { borderImageSrc, children, className } = props

    const elementRef = useRef<HTMLDivElement>(null);

    const handleImageSizeUpdate: ResizeCallback<HTMLDivElement> = useCallback((refCurrent) => {
        const width = refCurrent.clientWidth;
        const height = refCurrent.clientHeight;
        const aspectRatio = width / height

        let paddingBasedOnAspectRatio;
        if (aspectRatio >= 1.2) {
            paddingBasedOnAspectRatio = 0.7
        } else if (aspectRatio >= 1) {
            paddingBasedOnAspectRatio =  1
        } else if (aspectRatio >= 0.7) {
            paddingBasedOnAspectRatio = 1.2
        } else {
            paddingBasedOnAspectRatio = 1.7
        }

        refCurrent.style.setProperty('--cardWidthLocal', `${width}px`);
        refCurrent.style.setProperty('--cardHeightLocal', `${height}px`);
        refCurrent.style.setProperty('--paddingBasedOnAspectRatio', `${paddingBasedOnAspectRatio}`)
    }, []);

    useResizeObserver({
        elementRef: elementRef,
        callback: handleImageSizeUpdate,
    });

    return (
        <ClickableBorder
            ref={elementRef}
            borderImageSource={borderImageSrc} 
            className={className}
        >
            {children}
        </ClickableBorder>
    )
}