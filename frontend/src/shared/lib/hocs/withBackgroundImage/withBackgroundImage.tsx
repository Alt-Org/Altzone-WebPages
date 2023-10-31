import { Component, ComponentType } from 'react';
    // @ts-ignore
    import { LazyLoadImage } from 'react-lazy-load-image-component';
    // import 'react-lazy-load-image-component/src/effects/blur.css';
    import cls from "./withBackgroundImage.module.scss";

    function withBackgroundImage<P extends object>(WrappedComponent: ComponentType<P>, imagePath: string,placeHolderPath: string = ''): ComponentType<P> {
        return class extends Component<P> {
            render() {
                return (
                    <>
                        <div className={cls.Background}>
                            <LazyLoadImage
                                src={imagePath}
                                // effect="blur"
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



