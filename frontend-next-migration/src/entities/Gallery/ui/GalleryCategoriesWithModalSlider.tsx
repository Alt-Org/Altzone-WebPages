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
    ({ title, sources, cover }: GalleryCategoriesWithModalSliderProps) => {
        const { t } = useClientTranslation('picture-galleries');
        const [pageIndex, setPageIndex] = useState(0);

        // Filter and sort images, ensure cover is first
        const filteredSources = sources.filter((src) => src !== cover.url);
        const sortedSources = [...filteredSources].sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || '', 10);
            const numB = parseInt(b.match(/\d+/)?.[0] || '', 10);
            return numA - numB;
        });

        // CHANGE: build full array that includes cover + every page so Fancybox can see all images
        const allImages = [cover.url, ...sortedSources]; // CHANGE

        const maxPageIndex = Math.ceil(sortedSources.length / 2);

        const changePage = (direction: 'next' | 'prev') => {
            setPageIndex((prev) =>
                direction === 'next' ? Math.min(maxPageIndex, prev + 1) : Math.max(0, prev - 1),
            );
        };

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'ArrowLeft' && pageIndex > 0) changePage('prev');
                else if (e.key === 'ArrowRight' && pageIndex < maxPageIndex) changePage('next');
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

        // CHANGE: accept `visible` param and set style on the anchor so non-active items remain in DOM but hidden
        const renderSingleImage = (src: string, alt: string, idx: number, visible = true) => (
            <div
                className={cls.pageWrapper}
                key={idx}
            >
                <a
                    id={`fancybox-image-${idx}`}
                    href={src}
                    data-fancybox={cover.name}
                    data-index={idx}
                    style={{ display: visible ? 'block' : 'none' }} // CHANGE: keep anchors in DOM for Fancybox
                >
                    <Image
                        src={src}
                        width={250}
                        height={292}
                        className={cls.coverImage}
                        alt={alt}
                    />
                </a>
            </div>
        );

        // CHANGE: render ALL images (so Fancybox gets the full gallery),
        // and compute visibility per-image instead of mounting only visible ones.
        const renderImages = () => {
            return allImages.map((src, idx) => {
                let visible = false;

                // cover is index 0 in allImages
                if (pageIndex === 0) {
                    visible = idx === 0; // show only the cover
                } else {
                    const start = (pageIndex - 1) * 2;
                    const leftIdx = 1 + start;
                    const rightIdx = 2 + start;
                    visible = idx === leftIdx || idx === rightIdx; // show the current spread
                }

                const alt = idx === 0 ? cover.name : `Page ${idx}`;
                return renderSingleImage(src, alt, idx, visible);
            });
        };

        return (
            <div style={{ cursor: 'pointer' }}>
                <Fancybox>
                    <div className={cls.galleryContainer}>
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

                        {/* Viewer with arrows */}
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

                            {/* CHANGE: renderImages now outputs all anchors; hidden ones remain in DOM */}
                            {renderImages()}

                            <span
                                onClick={
                                    pageIndex < maxPageIndex ? () => changePage('next') : undefined
                                }
                                className={`${cls.navSymbol} ${pageIndex === maxPageIndex ? cls.disabled : ''}`}
                                role="button"
                                tabIndex={pageIndex < maxPageIndex ? 0 : -1}
                                aria-label="Next"
                            >
                                {'>'}
                            </span>
                        </div>
                    </div>

                    {/* No hidden preload block anymore to avoid duplication */}

                    {/* Page slider */}
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
                            onChange={(e) => setPageIndex(parseInt(e.target.value))}
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
                </Fancybox>
            </div>
        );
    },
);

GalleryCategoriesWithModalSlider.displayName = 'GalleryCategoriesWithModalSlider';
