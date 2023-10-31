// import {ComponentType, useRef, useEffect, useState } from 'react';
//     import cls from "./withBackgroundImage.module.scss";
//
//     function withBackgroundImage<P extends object>(WrappedComponent: ComponentType<P>, imagePath: string): ComponentType<P> {
//         return function WithBgImageComponent(props: P) {
//             const [isImageLoaded, setImageLoaded] = useState(false);
//             const backgroundDiv = useRef<HTMLDivElement>(null);
//
//             useEffect(() => {
//                 if (!backgroundDiv.current) return;
//
//                 const observer = new IntersectionObserver((entries) => {
//                     entries.forEach(entry => {
//                         if (entry.isIntersecting && !isImageLoaded) {
//                             setImageLoaded(true);
//                         }
//                     });
//                 });
//
//                 observer.observe(backgroundDiv.current);
//
//                 return () => {
//                     observer.disconnect();
//                 };
//             }, [isImageLoaded]);
//
//             return (
//                 <>
//                     <div
//                         className={cls.Background}
//                         ref={backgroundDiv}
//                         style={isImageLoaded ? { backgroundImage: `url(${imagePath})` } : {}}
//                     />
//                     <div className={cls.Content}>
//                         <WrappedComponent {...props} />
//                     </div>
//                 </>
//             );
//         }
//     }
//
//     export default withBackgroundImage;

import React, { ComponentType, useRef, useEffect, useState } from 'react';
import cls from "./withBackgroundImage.module.scss";

function withBackgroundImage<P extends object>(
    WrappedComponent: ComponentType<P>,
    imagePath: string,
    placeholderPath?: string
): ComponentType<P> {
    return function WithBgImageComponent(props: P) {
        const [isImageLoaded, setImageLoaded] = useState(false);
        const backgroundDiv = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (!backgroundDiv.current) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isImageLoaded) {
                        const img = new Image();
                        img.src = imagePath;
                        img.onload = () => setImageLoaded(true);
                    }
                });
            });

            observer.observe(backgroundDiv.current);

            return () => {
                observer.disconnect();
            };
        }, [isImageLoaded]);

        return (
            <>
                <div
                    className={cls.Background}
                    ref={backgroundDiv}
                    style={{
                        backgroundImage: `url(${isImageLoaded || !placeholderPath ? imagePath : placeholderPath})`
                    }}
                />
                <div className={cls.Content}>
                    <WrappedComponent {...props} />
                </div>
            </>
        );
    }
}

export default withBackgroundImage;


