// "use client"

import { Component, ComponentType } from 'react';
// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import cls from "./withBackgroundImage.module.scss";

// Define an interface for the configuration object
interface BackgroundImageConfig<P> {
    WrappedComponent: ComponentType<P>;
    imagePath: string;
    placeHolderPath?: string;
    alt?: string;
    shouldBeLazyLoaded?: boolean
}

function withBackgroundImage<P extends object>(config: BackgroundImageConfig<P>): ComponentType<P> {
    const { WrappedComponent, imagePath, placeHolderPath = '', alt = '', shouldBeLazyLoaded= false } = config;

    return class extends Component<P> {


        render() {
            return (
                <>
                    <div className={cls.Background}>


                        {
                            shouldBeLazyLoaded
                                ?
                                <LazyLoadImage
                                    src={imagePath}
                                    alt={alt}
                                    effect="blur"
                                    placeholderSrc={placeHolderPath}
                                    wrapperClassName={cls.ImageWrapper}
                                />
                                :
                                <img
                                    src={imagePath}
                                    alt={alt}
                                >

                                </img>
                        }
                    </div>
                    <div className={cls.Content}>
                        <WrappedComponent {...this.props} />
                    </div>

                </>
            );
        }

    };
}

export default withBackgroundImage;

