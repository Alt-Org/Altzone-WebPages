'use client';
import { ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { classNames } from '@/shared/lib/classNames/classNames';
import './CustomCarousel.scss';

type Props = {
    settings?: Settings;
    children: ReactNode;
    className?: string;
};

const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

/**
 * CustomCarousel component renders a carousel/slider with configurable settings.
 *
 * @example
 * const settings = {
 *   autoplay: true,
 *   speed: 2000
 * };
 *
 * <CustomCarousel className="my-carousel" settings={settings}>
 *    <div>Slide 1</div>
 *    <div>Slide 2</div>
 *    <div>Slide 3</div>
 * </CustomCarousel>
 */
const CustomCarousel = (props: Props) => {
    const { settings, children, className = '' } = props;
    const mergedSettings = { ...defaultSettings, ...settings };

    return (
        <div className={classNames('myCustomCarousel-wrapper', {}, [className])}>
            <Slider {...mergedSettings}>{children}</Slider>
        </div>
    );
};

export default CustomCarousel;
