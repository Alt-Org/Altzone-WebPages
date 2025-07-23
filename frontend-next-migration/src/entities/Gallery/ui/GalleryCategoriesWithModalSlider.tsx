'use client';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';
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
        const { t } = useClientTranslation('picture-galleries');
        const [pageIndex, setPageIndex] = useState(0);
        const anchorRefs = useRef<(HTMLAnchorElement | null)[]>([]);

        // Remove cover from sources, sort pages
        const filteredSources = sources.filter((src) => src !== cover.url);
        const sortedSources = [...filteredSources].sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || '', 10);
            const numB = parseInt(b.match(/\d+/)?.[0] || '', 10);
            return numA - numB;
        });

        const allImages = [cover.url, ...sortedSources];
        const maxPageIndex = Math.ceil(sortedSources.length / 2);

        const changePage = (dir: 'next' | 'prev') => {
            setPageIndex((prev) =>
                dir === 'next' ? Math.min(maxPageIndex, prev + 1) : Math.max(0, prev - 1),
            );
        };

        useEffect(() => {
            const handle = (e: KeyboardEvent) => {
                if (e.key === 'ArrowLeft' && pageIndex > 0) changePage('prev');
                else if (e.key === 'ArrowRight' && pageIndex < maxPageIndex) changePage('next');
            };
            window.addEventListener('keydown', handle);
            return () => window.removeEventListener('keydown', handle);
        }, [pageIndex, maxPageIndex]);

        const handleZoomClick = () => {
            const targetIndex = pageIndex === 0 ? 0 : 1 + (pageIndex - 1) * 2;

            anchorRefs.current[targetIndex]?.click();
        };

        const renderSingleImage = (src: string, alt: string, idx: number) => (
            <div
                className={cls.pageWrapper}
                key={src}
            >
                <a
                    href={src}
                    data-fancybox={cover.name}
                    ref={(el) => (anchorRefs.current[idx] = el)}
                    className={cls.link}
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

        const renderImages = () => {
            if (pageIndex === 0) return renderSingleImage(cover.url, cover.name, 0);

            const start = (pageIndex - 1) * 2;
            const left = sortedSources[start];
            const right = sortedSources[start + 1];

            return (
                <>
                    {left && renderSingleImage(left, `Page ${start + 1}`, start + 1)}
                    {right && renderSingleImage(right, `Page ${start + 2}`, start + 2)}
                </>
            );
        };

        return (
            <div style={{ cursor: 'pointer' }}>
                <Fancybox>
                    {/* Zoom Button */}
                    <div className={cls.galleryContainer}>
                        <div
                            className={`${cls.zoomButtonWrapper} ${
                                pageIndex === 0 ? cls.coverZoomPosition : ''
                            }`}
                        >
                            <button
                                className={cls.zoomButton}
                                onClick={handleZoomClick}
                            >
                                <Image
                                    src="/images/ZoomPlus.png"
                                    width={20}
                                    height={20}
                                    alt="Zoom"
                                />
                            </button>
                        </div>

                        {/* Image + Arrows */}
                        <div className={cls.cover}>
                            <span
                                onClick={pageIndex > 0 ? () => changePage('prev') : undefined}
                                className={`${cls.navSymbol} ${pageIndex === 0 ? cls.disabled : ''}`}
                                role="button"
                            >
                                {'<'}
                            </span>

                            {renderImages()}

                            <span
                                onClick={
                                    pageIndex < maxPageIndex ? () => changePage('next') : undefined
                                }
                                className={`${cls.navSymbol} ${pageIndex === maxPageIndex ? cls.disabled : ''}`}
                                role="button"
                            >
                                {'>'}
                            </span>
                        </div>
                    </div>

                    {/* Hidden preload links (used by Fancybox only) */}
                    <div style={{ display: 'none' }}>
                        {allImages.map((src, i) => (
                            <a
                                key={i}
                                href={src}
                                data-fancybox={cover.name}
                                ref={(el) => (anchorRefs.current[i] = el)}
                            />
                        ))}
                    </div>

                    {/* Slider */}
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
                            onChange={(e) => setPageIndex(Number(e.target.value))}
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
