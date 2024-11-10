'use client';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { ComponentOptionsType as FancyboxOptionsType } from '@fancyapps/ui/types/Fancybox/options';
import React, { useRef, useEffect } from 'react';

/**
 * Fancybox component using @fancyapps/ui library.
 *
 * @param props - Component properties.
 * @param props.children - React children nodes to render inside the component.
 * @param props.delegate - CSS selector for the elements that will trigger the fancybox.
 * @param props.options - Configuration options for the fancybox.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import Fancybox from './Fancybox';
 *
 * const ExampleComponent = () => (
 *   <Fancybox options={{ infinite: false }}>
 *     <div>
 *       <a data-fancybox="gallery" href="image1.jpg">
 *         <img src="thumbnail1.jpg" alt="Thumbnail 1" />
 *       </a>
 *       <a data-fancybox="gallery" href="image2.jpg">
 *         <img src="thumbnail2.jpg" alt="Thumbnail 2" />
 *       </a>
 *     </div>
 *   </Fancybox>
 * );
 *
 * export default ExampleComponent;
 * ```
 */
function Fancybox(props: {
    children?: React.ReactNode;
    delegate?: string;
    options?: Partial<FancyboxOptionsType>;
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const delegate = props.delegate || '[data-fancybox]';
        const options = props.options || {};

        NativeFancybox.bind(container, delegate, options);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    });

    return <div ref={containerRef}>{props.children}</div>;
}

export default Fancybox;
