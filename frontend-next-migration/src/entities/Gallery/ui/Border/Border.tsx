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

        refCurrent.style.setProperty('--cardWidthLocal', `${width}px`);
        refCurrent.style.setProperty('--cardHeightLocal', `${height}px`);
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