'use client';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import Fancybox from '@/shared/ui/Fancybox/Fancybox';
import { useClientTranslation } from '@/shared/i18n';
import cls from './styles.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export type GalleryCategoriesWithModalSliderProps = {
    title?: string;
    followLastImage?: boolean;
    sources: string[];
    cover: { name: string; url: string };
};

export const GalleryCategoriesWithModalSlider = memo(
    ({ title, sources, cover }: GalleryCategoriesWithModalSliderProps) => {
        const { t } = useClientTranslation('picture-galleries');
        const [pageIndex, setPageIndex] = useState(0); // 0 = cover only

        // Filter out cover URL from sources if it exists to avoid duplication
        const filteredSources = sources.filter((src) => src !== cover.url);

        const getSortedSources = useCallback((sources: string[]) => {
            return [...sources].sort((a, b) => {
                const numberA = Number.parseInt(a.match(/\d+/)?.[0] || '', 10);
                const numberB = Number.parseInt(b.match(/\d+/)?.[0] || '', 10);
                return numberA - numberB;
            });
        }, []);

        const sortedSources = getSortedSources(filteredSources);

        // maxPageIndex: 0 = cover, then ceil(length / 2) for pairs
        const maxPageIndex = Math.ceil(sortedSources.length / 2);

        const handlePreviousPage = () => {
            setPageIndex((prev) => Math.max(0, prev - 1));
        };

        const handleNextPage = () => {
            setPageIndex((prev) => Math.min(maxPageIndex, prev + 1));
        };

        const renderImages = () => {
            if (pageIndex === 0) {
                // Show cover alone
                return (
                    <AppLink
                        data-fancybox={cover.name}
                        to={cover.url}
                        className={cls.link}
                    >
                        <Image
                            src={cover.url}
                            width={250}
                            height={292}
                            className={cls.coverImage}
                            alt={cover.name}
                        />
                        {title && <h3 className={cls.title}>{t(`${title}`)}</h3>}
                    </AppLink>
                );
            } else {
                // Show two pages: sources[2*(pageIndex-1)] and sources[2*(pageIndex-1)+1]
                const startIndex = (pageIndex - 1) * 2;
                const left = sortedSources[startIndex];
                const right = sortedSources[startIndex + 1];

                return (
                    <>
                        {left && (
                            <AppLink
                                data-fancybox={cover.name}
                                to={left}
                                className={cls.link}
                            >
                                <Image
                                    src={left}
                                    width={250}
                                    height={292}
                                    className={cls.coverImage}
                                    alt={`Page ${startIndex + 1}`}
                                />
                            </AppLink>
                        )}
                        {right && (
                            <AppLink
                                data-fancybox={cover.name}
                                to={right}
                                className={cls.link}
                            >
                                <Image
                                    src={right}
                                    width={250}
                                    height={292}
                                    className={cls.coverImage}
                                    alt={`Page ${startIndex + 2}`}
                                />
                            </AppLink>
                        )}
                    </>
                );
            }
        };

        return (
            <div style={{ cursor: 'pointer' }}>
                <Fancybox>
                    <div className={cls.galleryContainer}>
                        <div className={cls.zoomButtonWrapper}>
                            <button
                                className={cls.zoomButton}
                                onClick={() => {
                                    const imageIndex =
                                        pageIndex === 0 ? 0 : (pageIndex - 1) * 2 + 1;
                                    const fancyboxElements = document.querySelectorAll(
                                        `[data-fancybox="${cover.name}"]`,
                                    );
                                    if (fancyboxElements[imageIndex]) {
                                        (fancyboxElements[imageIndex] as HTMLElement).click();
                                    }
                                }}
                            >
                                <Image
                                    src="/images/ZoomPlus.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                            </button>

                            <button
                                className={cls.zoomButton}
                                onClick={() => {
                                    const imageIndex =
                                        pageIndex === 0 ? 0 : (pageIndex - 1) * 2 + 1;
                                    const fancyboxElements = document.querySelectorAll(
                                        `[data-fancybox="${cover.name}"]`,
                                    );
                                    if (fancyboxElements[imageIndex]) {
                                        // Open in fullscreen with Fancybox
                                        (fancyboxElements[imageIndex] as HTMLElement).click();
                                    }
                                }}
                            >
                                <Image
                                    src="/images/Fullscreen.png"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                            </button>
                        </div>

                        <div className={cls.cover}>
                            {/* Left Arrow */}
                            <span
                                onClick={pageIndex > 0 ? handlePreviousPage : undefined}
                                className={`${cls.navSymbol} ${
                                    pageIndex === 0 ? cls.disabled : ''
                                }`}
                                role="button"
                                tabIndex={pageIndex > 0 ? 0 : -1}
                                aria-label="Previous"
                            >
                                {'<'}
                            </span>

                            {/* Render images */}
                            {renderImages()}

                            {/* Right Arrow */}
                            <span
                                onClick={pageIndex < maxPageIndex ? handleNextPage : undefined}
                                className={`${cls.navSymbol} ${
                                    pageIndex === maxPageIndex ? cls.disabled : ''
                                }`}
                                role="button"
                                tabIndex={pageIndex < maxPageIndex ? 0 : -1}
                                aria-label="Next"
                            >
                                {'>'}
                            </span>
                        </div>
                    </div>

                    {/* Hidden preload for fancybox */}
                    <div style={{ display: 'none' }}>
                        {[cover.url, ...sortedSources].map((src, idx) => (
                            <AppLink
                                key={idx}
                                data-fancybox={cover.name}
                                to={src}
                            >
                                ''
                            </AppLink>
                        ))}
                    </div>
                </Fancybox>
            </div>
        );
    },
);

GalleryCategoriesWithModalSlider.displayName = 'GalleryCategoriesWithModalSlider';
