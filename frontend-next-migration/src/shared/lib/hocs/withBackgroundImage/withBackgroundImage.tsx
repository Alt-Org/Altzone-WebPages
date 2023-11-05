import { Component, ComponentType } from 'react';
// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import cls from "./withBackgroundImage.module.scss";
import Image from "next/image";


// Define an interface for the configuration object
interface BackgroundImageConfig<P> {
    WrappedComponent: ComponentType<P>;
    imagePath: string;
    placeHolderPath?: string;
    alt?: string;
    shouldBeLazyLoaded?: boolean
}


// const imageLoader = ({ src, width, quality }: { src: any; width: any; quality?: any }) => {
//     return `https://example.com/${src}?w=${width}&q=${quality || 75}`
// }

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
                                <Image
                                        src={imagePath}
                                        alt={alt}
                                        loading={"lazy"}
                                    className={cls.ImageWrapper}

                                />

                                :

                                <Image
                                    src={imagePath}
                                    alt={alt}
                                    className={cls.ImageWrapper}
                                />
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

