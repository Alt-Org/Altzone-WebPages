import { FC, FunctionComponent } from 'react';
// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import cls from './withBackgroundImage.module.scss';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';

interface BackgroundImageConfig {
  imagePath: string;
  placeHolderPath?: string;
  alt?: string;
  shouldBeLazyLoaded?: boolean;
  className?: string;
}

/**
 * Enhances a function component with a background image.
 *
 * @param config - The configuration for the background image.
 * @param config.imagePath - The path of the background image.
 * @param config.placeHolderPath - The path of the placeholder image to display while the background image is loading.
 * @param config.alt - The alternative text for the background image.
 * @param config.shouldBeLazyLoaded - Indicates whether the background image should be lazy loaded.
 * @param config.className - The additional class name to be applied to the background div element.
 * @returns A higher-order component that wraps the given function component with a background image.
 *
 * @example
 * const config = {
 *    imagePath: "path/to/image.jpg",
 *    placeHolderPath: "path/to/placeholder.jpg",
 *    alt: "An example image",
 *    shouldBeLazyLoaded: true,
 *    className: "customClass"
 * };
 *
 * interface MyComponentProps {
 *   title: string;
 * }
 *
 * const MyComponent: FC<MyComponentProps> = ({ title }) => <h1>{title}</h1>;
 * const EnhancedComponent = withBackgroundImage<MyComponentProps>(config)(MyComponent);
 */
function withBackgroundImage<P extends object>(
  config: BackgroundImageConfig,
): (WrappedComponent: FunctionComponent<P>) => FC<P> {
  const {
    imagePath,
    placeHolderPath = '',
    alt = '',
    shouldBeLazyLoaded = false,
    className = '',
  } = config;

  return (WrappedComponent: FunctionComponent<P>) => {
    const WithBackgroundImage: FC<P> = (props) => {
      return (
        <>
          {/* Wrapper added here to prevent auto-scroll interference */}
          <div className='bg-wrapper'></div>
          <div className={classNames(cls.Background, {}, [className])}>
            {/*<div className={cls.Background}>*/}
            {shouldBeLazyLoaded ? (
              <Image
                src={imagePath}
                alt={alt}
                loading='lazy'
                className={cls.ImageWrapper}
                width={1000}
                height={1000}
              />
            ) : (
              <Image
                src={imagePath}
                alt={alt}
                className={cls.ImageWrapper}
                width={1000}
                height={1000}
              />
            )}
          </div>
          <div className={cls.Content}>
            <WrappedComponent {...props} />
          </div>
        </>
      );
    };

    WithBackgroundImage.displayName = `WithBackgroundImage(${
      WrappedComponent.displayName || WrappedComponent.name
    })`;

    return WithBackgroundImage;
  };
}

export default withBackgroundImage;
