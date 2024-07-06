import { FC, FunctionComponent} from 'react';
// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import cls from "./withBackgroundImage.module.scss";
import Image from "next/image";
import {classNames} from "@/shared/lib/classNames/classNames";


interface BackgroundImageConfig {
    imagePath: string;
    placeHolderPath?: string;
    alt?: string;
    shouldBeLazyLoaded?: boolean;
    className?: string;
}

function withBackgroundImage<P extends object>(
    config: BackgroundImageConfig
): (WrappedComponent: FunctionComponent<P>) => FC<P> {
    const {
        imagePath,
        placeHolderPath = '',
        alt = '',
        shouldBeLazyLoaded = false,
        className= ""
    } = config;

    return (WrappedComponent: FunctionComponent<P>) => {
        const WithBackgroundImage: FC<P> = (props) => {
            return (
                <>
                    <div className={classNames(cls.Background, {}, [className])}>
                    {/*<div className={cls.Background}>*/}
                        {shouldBeLazyLoaded ? (
                            <Image src={imagePath} alt={alt} loading="lazy" className={cls.ImageWrapper} width={1000} height={1000} />
                        ) : (
                            <Image src={imagePath} alt={alt} className={cls.ImageWrapper} width={1000} height={1000} />
                        )}
                    </div>
                    <div className={cls.Content}>
                        <WrappedComponent {...props} />
                    </div>
                </>
            );
        };

        WithBackgroundImage.displayName = `WithBackgroundImage(${WrappedComponent.displayName || WrappedComponent.name})`;

        return WithBackgroundImage;
    };
}

export default withBackgroundImage;


