'use client';
import Image from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';
import Fancybox from '@/shared/ui/Fancybox/Fancybox';
import { useClientTranslation } from '@/shared/i18n';
import cls from './styles.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

/**
 * Props for the GalleryCategoriesWithModalSlider component.
 *
 * @typedef {Object} GalleryCategoriesWithModalSliderProps
 * @property {string} [title] - Optional title of the gallery.
 * @property {boolean} [followLastImage] - Unused for now, reserved for future use.
 * @property {string[]} sources - Array of image URLs including the cover.
 * @property {{ name: string; url: string }} cover - The cover image metadata.
 */
export type GalleryCategoriesWithModalSliderProps = {
    title?: string;
    followLastImage?: boolean;
    sources: string[];
    cover: { name: string; url: string };
};

/**
 * GalleryCategoriesWithModalSlider displays a paginated and zoomable comic-style image viewer.
 * It supports a single cover image and multiple image pairs with Fancybox integration.
 *
 * @component
 * @param {GalleryCategoriesWithModalSliderProps} props - Props passed to the component.
 * @returns {JSX.Element}
 */
export const GalleryCategoriesWithModalSlider = memo(
    ({ title, sources, cover }: GalleryCategoriesWithModalSliderProps): JSX.Element => {
        const { t } = useClientTranslation('picture-galleries');
        const [pageIndex, setPageIndex] = useState(0);
        const [zoomMode, setZoomMode] = useState(false);

        /** Filters out the cover from the full image list */
        const filteredSources = sources.filter((src) => src !== cover.url);

        /**
         * Sorts the image URLs numerically based on digits in the filenames.
         *
         * @param {string[]} sources - List of image URLs.
         * @returns {string[]} Sorted list.
         */
        const getSortedSources = useCallback((sources: string[]): string[] => {
            return [...sources].sort((a, b) => {
                const numberA = Number.parseInt(a.match(/\d+/)?.[0] || '', 10);
                const numberB = Number.parseInt(b.match(/\d+/)?.[0] || '', 10);
                return numberA - numberB;
            });
        }, []);

        const sortedSources = getSortedSources(filteredSources);
        const maxPageIndex = Math.ceil(sortedSources.length / 2);

        /**
         * Increments or decrements page index.
         *
         * @param {'next' | 'prev'} direction - Which direction to move.
         */
        const changePage = (direction: 'next' | 'prev') => {
            setPageIndex((prev) =>
                direction === 'next' ? Math.min(maxPageIndex, prev + 1) : Math.max(0, prev - 1),
            );
        };

        /**
         * Adds keydown listeners for left/right arrow keys to navigate.
         */
        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'ArrowLeft' && pageIndex > 0) {
                    changePage('prev');
                } else if (e.key === 'ArrowRight' && pageIndex < maxPageIndex) {
                    changePage('next');
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }, [pageIndex, maxPageIndex]);

        /**
         * Handles zoom in/out on image when in zoom mode.
         *
         * @param {React.MouseEvent<HTMLDivElement>} e - Click event
         * @param {HTMLImageElement | null} imgEl - Target image element
         */
        const handleImageClick = (
            e: React.MouseEvent<HTMLDivElement>,
            imgEl: HTMLImageElement | null,
        ) => {
            if (!imgEl || !zoomMode) return;
            e.preventDefault();

            const isZoomed = imgEl.classList.contains(cls.zoomed);
            if (isZoomed) {
                imgEl.classList.remove(cls.zoomed);
                imgEl.style.transform = '';
                imgEl.style.transformOrigin = '';
            } else {
                const rect = imgEl.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;
                const percentX = (offsetX / rect.width) * 100;
                const percentY = (offsetY / rect.height) * 100;
                imgEl.classList.add(cls.zoomed);
                imgEl.style.transform = 'scale(2)';
                imgEl.style.transformOrigin = `${percentX}% ${percentY}%`;
            }
        };

        /**
         * Renders a single image (cover or one page).
         *
         * @param {string} src - Image source
         * @param {string} alt - Alt text
         * @returns {JSX.Element}
         */
        const renderSingleImage = (src: string, alt: string): JSX.Element => (
            <div
                className={cls.pageWrapper}
                onClick={(e) => handleImageClick(e, e.currentTarget.querySelector('img'))}
            >
                {zoomMode ? (
                    <div className={cls.link}>
                        <Image
                            src={src}
                            width={250}
                            height={292}
                            className={cls.coverImage}
                            alt={alt}
                        />
                    </div>
                ) : (
                    <AppLink
                        data-fancybox={cover.name}
                        to={src}
                        className={cls.link}
                    >
                        <Image
                            src={src}
                            width={250}
                            height={292}
                            className={cls.coverImage}
                            alt={alt}
                        />
                    </AppLink>
                )}
            </div>
        );

        /**
         * Renders either the cover page or a pair of pages.
         *
         * @returns {JSX.Element}
         */
        const renderImages = (): JSX.Element => {
            if (pageIndex === 0) {
                return renderSingleImage(cover.url, cover.name);
            } else {
                const startIndex = (pageIndex - 1) * 2;
                const left = sortedSources[startIndex];
                const right = sortedSources[startIndex + 1];

                return (
                    <>
                        {left && renderSingleImage(left, `Page ${startIndex + 1}`)}
                        {right && renderSingleImage(right, `Page ${startIndex + 2}`)}
                    </>
                );
            }
        };

        return (
            <div style={{ cursor: 'pointer' }}>
                <Fancybox>
                    {/* Top Zoom Button */}
                    <div className={`${cls.galleryContainer}`}>
                        <div
                            className={`${cls.zoomButtonWrapper} ${pageIndex === 0 ? cls.coverZoomPosition : ''}`}
                        >
                            <button
                                className={`${cls.zoomButton} ${zoomMode ? cls.active : ''}`}
                                onClick={() => setZoomMode((prev) => !prev)}
                            >
                                <Image
                                    src="/images/ZoomPlus.png"
                                    width={20}
                                    height={20}
                                    alt="Zoom"
                                />
                            </button>
                        </div>

                        {/* Image Pair Viewer */}
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
                                className={`${cls.navSymbol} ${pageIndex === maxPageIndex ? cls.disabled : ''}`}
                                role="button"
                                tabIndex={pageIndex < maxPageIndex ? 0 : -1}
                                aria-label="Next"
                            >
                                {'>'}
                            </span>
                        </div>
                    </div>

                    {/* Hidden Fancybox preload links */}
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

                    {/* Slider and navigation buttons below */}
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
