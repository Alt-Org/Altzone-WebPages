    // import {Component, ComponentType, createRef} from 'react';
    // import cls from "./withBackgroundImage.module.scss";
    //
    //
    // function withBackgroundImage<P extends object>(WrappedComponent: ComponentType<P>, imagePath: string): ComponentType<P> {
    //     return class extends Component<P> {
    //
    //
    //
    //         render() {
    //             return (
    //                 <>
    //                     <div className={cls.Background} style={{ backgroundImage: `url(${imagePath})` }} />
    //                     <div className={cls.Content}>
    //                         <WrappedComponent {...this.props} />
    //                     </div>
    //                 </>
    //             );
    //         }
    //     };
    // }
    //
    // export default withBackgroundImage;
    //

    //
    // function withBackgroundImage<P extends object>(WrappedComponent: ComponentType<P>, imagePath: string): ComponentType<P> {
    //     return class extends Component<P> {
    //         private backgroundDiv = createRef<HTMLDivElement>();
    //
    //         componentDidMount() {
    //             if (this.backgroundDiv.current) {
    //                 this.backgroundDiv.current.style.backgroundImage = `url(${imagePath})`;
    //             }
    //
    //         }
    //
    //         render() {
    //             return (
    //                 <>
    //                     <div className={cls.Background} ref={this.backgroundDiv} />
    //                     <div className={cls.Content}>
    //                         <WrappedComponent {...this.props} />
    //                     </div>
    //                 </>
    //             );
    //         }
    //     };
    // }

    import React, { Component, ComponentType, useRef, useEffect, useState } from 'react';
    import cls from "./withBackgroundImage.module.scss";

    function withBackgroundImage<P extends object>(WrappedComponent: ComponentType<P>, imagePath: string): ComponentType<P> {
        return function WithBgImageComponent(props: P) {
            const [isImageLoaded, setImageLoaded] = useState(false);
            const backgroundDiv = useRef<HTMLDivElement>(null);

            useEffect(() => {
                if (!backgroundDiv.current) return;

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !isImageLoaded) {
                            setImageLoaded(true);
                            // На этом этапе можно дополнительно оптимизировать, загружая изображение через new Image() и устанавливая только после его загрузки.
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
                        style={isImageLoaded ? { backgroundImage: `url(${imagePath})` } : {}}
                    />
                    <div className={cls.Content}>
                        <WrappedComponent {...props} />
                    </div>
                </>
            );
        }
    }

    export default withBackgroundImage;

