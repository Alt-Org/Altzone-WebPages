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
}

function withBackgroundImage<P extends object>(config: BackgroundImageConfig<P>): ComponentType<P> {
    const { WrappedComponent, imagePath, placeHolderPath = '', alt = '' } = config;

    return class extends Component<P> {
        render() {
            return (
                <>
                    <div className={cls.Background}>
                        <LazyLoadImage
                            src={imagePath}
                            alt={alt}
                            placeholderSrc={placeHolderPath}
                            wrapperClassName={cls.ImageWrapper}
                        />
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
