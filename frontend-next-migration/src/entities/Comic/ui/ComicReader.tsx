'use client';
import Image from 'next/image';
import { memo, useEffect, useState, useRef } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { ReaderModal } from './ReaderModal';
import { RenderImages } from './RenderImages';
import cls from './ComicReader.module.scss';
import type { ComicReaderProps } from '../types/types';
import useSizes from '@/shared/lib/hooks/useSizes';

export const ComicReader = memo(({ sources, cover }: ComicReaderProps) => {
    useClientTranslation('picture-galleries');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const { isMobileSize } = useSizes();

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const sortedSources = sources.filter((src) => src !== cover.url);

    const allImages = [cover.url, ...sortedSources];

    const maxPageIndex = isMobileSize ? sortedSources.length : Math.ceil(sortedSources.length / 2);

    const changePage = (direction: 'next' | 'prev') => {
        setPageIndex((prev) =>
            direction === 'next' ? Math.min(maxPageIndex, prev + 1) : Math.max(0, prev - 1),
        );
    };

    useEffect(() => {
        if (!isModalOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft' && pageIndex > 0) {
                changePage('prev');
            }

            if (event.key === 'ArrowRight' && pageIndex < maxPageIndex) {
                changePage('next');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [pageIndex, maxPageIndex]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    // SWIPE
    const handleTouchStart = (event: React.TouchEvent) => {
        touchStartX.current = event.touches[0].clientX;
        touchEndX.current = touchStartX.current;
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        touchEndX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const delta = touchStartX.current - touchEndX.current;

        if (Math.abs(delta) < 50) return;

        if (delta > 0 && pageIndex < maxPageIndex) {
            changePage('next');
        }

        if (delta < 0 && pageIndex > 0) {
            changePage('prev');
        }
    };

    const imageProps = {
        images: allImages,
        coverName: cover.name,
        pageIndex,
        isMobile: isMobileSize,
        isModalOpen,
    };

    return (
        <div style={{ cursor: 'pointer' }}>
            {/* GALLERY */}
            <div
                className={cls.galleryContainer}
                style={{ minHeight: '80vh' }}
            >
                <div
                    className={`${cls.zoomButtonWrapper} ${
                        pageIndex === 0 ? cls.coverZoomPosition : ''
                    }`}
                >
                    <button
                        className={cls.zoomButton}
                        onClick={openModal}
                    >
                        <Image
                            src="/images/ZoomPlus.png"
                            width={20}
                            height={20}
                            alt="Zoom"
                        />
                    </button>
                </div>

                <div
                    className={cls.cover}
                    onClick={openModal}
                >
                    <RenderImages {...imageProps} />
                </div>
            </div>

            {/* MODAL */}
            <ReaderModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className={cls.modalViewer}>
                    <div
                        className={cls.cover}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <span
                            onClick={(event) => {
                                event.stopPropagation();
                                if (pageIndex > 0) changePage('prev');
                            }}
                            className={`${cls.navSymbol} ${pageIndex === 0 ? cls.disabled : ''}`}
                        >
                            {'<'}
                        </span>

                        <RenderImages
                            {...imageProps}
                            isModal
                        />

                        <span
                            onClick={(event) => {
                                event.stopPropagation();
                                if (pageIndex < maxPageIndex) changePage('next');
                            }}
                            className={`${cls.navSymbol} ${
                                pageIndex === maxPageIndex ? cls.disabled : ''
                            }`}
                        >
                            {'>'}
                        </span>
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

                        <span className={cls.pageNumber}>
                            {pageIndex === 0
                                ? 1
                                : isMobileSize
                                  ? pageIndex + 1
                                  : (pageIndex - 1) * 2 + 2}
                        </span>

                        <input
                            type="range"
                            min={0}
                            max={maxPageIndex}
                            value={pageIndex}
                            onChange={(event) => setPageIndex(parseInt(event.target.value))}
                            className={cls.pageSlider}
                        />

                        <span className={cls.pageNumber}>
                            {pageIndex === 0
                                ? 1
                                : isMobileSize
                                  ? pageIndex + 1
                                  : Math.min(allImages.length, (pageIndex - 1) * 2 + 3)}
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
            </ReaderModal>
        </div>
    );
});

ComicReader.displayName = 'ComicReader';
