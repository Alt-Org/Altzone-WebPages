'use client';
import { memo, useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { classNames } from '@/shared/lib/classNames/classNames';
import LeftArrowSVG from '@/shared/assets/icons/ChevronLeft.svg';
import RightArrowSVG from '@/shared/assets/icons/ChevronRight.svg';
import cls from './NewsCarousel.module.scss';

export interface NewsCarouselItem {
    id: number | string;
    title: string;
    text: string;
    image?: string | StaticImageData;
    date?: string;
    href?: string;
}

interface NewsCarouselProps {
    items: NewsCarouselItem[];
    className?: string;
    ariaLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
}

const SWIPE_THRESHOLD = 50;

const NewsCarousel = (props: NewsCarouselProps) => {
    const {
        items,
        className = '',
        ariaLabel,
        previousLabel = 'Previous slide',
        nextLabel = 'Next slide',
    } = props;

    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const total = items.length;

    useEffect(() => {
        setActiveIndex((current) => (current > total - 1 ? 0 : current));
    }, [total]);

    const showPrev = () => {
        setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
    };

    const showNext = () => {
        setActiveIndex((current) => (current === total - 1 ? 0 : current + 1));
    };

    const handleTouchStart = (event: React.TouchEvent) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event: React.TouchEvent) => {
        const startX = touchStartX.current;
        touchStartX.current = null;
        if (startX === null) return;
        const diffX = startX - (event.changedTouches[0]?.clientX ?? startX);
        if (diffX > SWIPE_THRESHOLD) {
            showNext();
        } else if (diffX < -SWIPE_THRESHOLD) {
            showPrev();
        }
    };

    if (total === 0) return null;

    const renderSlideContent = (item: NewsCarouselItem) => (
        <div className={classNames(cls.card, { [cls.cardWithImage]: Boolean(item.image) })}>
            <div className={cls.content}>
                {item.date && <span className={cls.date}>{item.date}</span>}
                <h2 className={cls.title}>{item.title}</h2>
                <p className={cls.text}>{item.text}</p>
            </div>
            {item.image && (
                <div className={cls.imageContainer}>
                    <Image
                        src={item.image}
                        alt={item.title}
                        className={cls.image}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                    />
                </div>
            )}
        </div>
    );

    return (
        <section
            className={classNames(cls.NewsCarousel, {}, [className])}
            aria-roledescription="carousel"
            aria-label={ariaLabel}
        >
            <div
                className={cls.viewport}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <ul
                    className={cls.track}
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {items.map((item, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <li
                                key={item.id}
                                className={cls.slide}
                                aria-hidden={!isActive}
                            >
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className={cls.slideLink}
                                        tabIndex={isActive ? 0 : -1}
                                    >
                                        {renderSlideContent(item)}
                                    </Link>
                                ) : (
                                    renderSlideContent(item)
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className={cls.controls}>
                <button
                    type="button"
                    className={cls.arrowButton}
                    onClick={showPrev}
                    aria-label={previousLabel}
                >
                    <Image
                        src={LeftArrowSVG}
                        alt=""
                        aria-hidden="true"
                    />
                </button>

                <div className={cls.dots}>
                    {items.map((item, index) => (
                        <button
                            type="button"
                            key={item.id}
                            className={classNames(cls.dot, {
                                [cls.dotActive]: index === activeIndex,
                            })}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === activeIndex}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    className={cls.arrowButton}
                    onClick={showNext}
                    aria-label={nextLabel}
                >
                    <Image
                        src={RightArrowSVG}
                        alt=""
                        aria-hidden="true"
                    />
                </button>
            </div>
        </section>
    );
};

NewsCarousel.displayName = 'NewsCarousel';

export default memo(NewsCarousel);
