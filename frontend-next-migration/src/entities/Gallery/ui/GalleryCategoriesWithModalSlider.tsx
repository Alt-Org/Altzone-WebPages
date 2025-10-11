/* eslint-disable complexity */
'use client';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import Fancybox from '@/shared/ui/Fancybox/Fancybox';
import { useClientTranslation } from '@/shared/i18n';
import cls from './styles.module.scss';

export type GalleryCategoriesWithModalSliderProps = {
    title?: string;
    followLastImage?: boolean;
    sources: string[];
    cover: {
        name: string;
        url: string;
    };
};

export const GalleryCategoriesWithModalSlider = memo(
    ({ sources, cover }: GalleryCategoriesWithModalSliderProps) => {
        useClientTranslation('picture-galleries');
        const [pageIndex, setPageIndex] = useState(0);

        const filteredSources = sources.filter((src) => src !== cover.url);
        const sortedSources = [...filteredSources].sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || '', 10);
            const numB = parseInt(b.match(/\d+/)?.[0] || '', 10);
            return numA - numB;
        });

        const allImages = [cover.url, ...sortedSources];
        const maxPageIndex = Math.ceil(sortedSources.length / 2);

        const changePage = (direction: 'next' | 'prev') => {
            setPageIndex((prev) =>
                direction === 'next' ? Math.min(maxPageIndex, prev + 1) : Math.max(0, prev - 1),
            );
        };

        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'ArrowLeft' && pageIndex > 0) changePage('prev');
                else if (event.key === 'ArrowRight' && pageIndex < maxPageIndex) changePage('next');
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }, [pageIndex, maxPageIndex]);

        const openCurrentInFancybox = () => {
            const indexToOpen = pageIndex === 0 ? 0 : 1 + (pageIndex - 1) * 2;
            const el = document.getElementById(
                `fancybox-image-${indexToOpen}`,
            ) as HTMLAnchorElement;
            if (el) el.click();
        };

        const renderImages = () => {
            return allImages.map((src, idx) => {
                let visible = false;
                if (pageIndex === 0) {
                    visible = idx === 0;
                } else {
                    const start = (pageIndex - 1) * 2;
                    const leftIdx = 1 + start;
                    const rightIdx = 2 + start;
                    visible = idx === leftIdx || idx === rightIdx;
                }

                return (
                    <div
                        className={cls.pageWrapper}
                        key={idx}
                        style={{ display: visible ? 'flex' : 'none' }}
                    >
                        <a
                            id={`fancybox-image-${idx}`}
                            href={src}
                            data-fancybox={cover.name}
                            data-index={idx}
                        >
                            <Image
                                src={src}
                                width={250}
                                height={292}
                                className={cls.coverImage}
                                alt={idx === 0 ? cover.name : `Page ${idx}`}
                            />
                        </a>
                    </div>
                );
            });
        };
        return (
            <div style={{ cursor: 'pointer' }}>
                <Fancybox>
                    <div
                        className={cls.galleryContainer}
                        style={{ minHeight: '80vh' }}
                    >
                        {/* Zoom Button */}
                        <div
                            className={`${cls.zoomButtonWrapper} ${
                                pageIndex === 0 ? cls.coverZoomPosition : ''
                            }`}
                        >
                            <button
                                className={cls.zoomButton}
                                onClick={openCurrentInFancybox}
                            >
                                <Image
                                    src="/images/ZoomPlus.png"
                                    width={20}
                                    height={20}
                                    alt="Zoom"
                                />
                            </button>
                        </div>

                        {/* Viewer */}
                        <div className={cls.cover}>
                            <span
                                onClick={pageIndex > 0 ? () => changePage('prev') : undefined}
                                className={`${cls.navSymbol} ${pageIndex === 0 ? cls.disabled : ''}`}
                                role="button"
                                tabIndex={pageIndex > 0 ? 0 : -1}
                                aria-label="Previous"
                            >
                                {'<'}
                            </span>

                            {renderImages()}

                            <span
                                onClick={
                                    pageIndex < maxPageIndex ? () => changePage('next') : undefined
                                }
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

                        {/* Page slider (✅ stays close to cover) */}
                        <div className={cls.sliderContainer}>
                            <button
                                className={cls.arrowButton}
                                onClick={() => changePage('prev')}
                                disabled={pageIndex === 0}
                            >
                                {'<'}
                            </button>

                            <span className={cls.pageNumber}>{pageIndex * 2 || 1}</span>

                            <input
                                type="range"
                                min={0}
                                max={maxPageIndex}
                                value={pageIndex}
                                onChange={(event) => setPageIndex(parseInt(event.target.value))}
                                className={cls.pageSlider}
                                style={
                                    {
                                        '--percent':
                                            maxPageIndex === 0
                                                ? '0%'
                                                : `${(pageIndex / maxPageIndex) * 100}%`,
                                    } as React.CSSProperties
                                }
                            />

                            <span className={cls.pageNumber}>
                                {Math.min(sortedSources.length, (pageIndex || 0) * 2 + 1)}
                            </span>

                            <button
                                className={cls.arrowButton}
                                onClick={() => changePage('next')}
                                disabled={pageIndex === maxPageIndex}
                            >
                                {'>'}
                            </button>
                        </div>
                    </div>
                </Fancybox>
            </div>
        );
    },
);

GalleryCategoriesWithModalSlider.displayName = 'GalleryCategoriesWithModalSlider';
