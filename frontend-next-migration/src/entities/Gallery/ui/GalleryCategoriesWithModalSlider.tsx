/* eslint-disable complexity */
'use client';
import Image from 'next/image';
import { memo, useEffect, useState, useRef } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { ReaderModal } from '@/entities/Gallery/ui/ReaderModal';
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

        const [isModalOpen, setIsModalOpen] = useState(false);
        const [pageIndex, setPageIndex] = useState(0);
        const [isMobile, setIsMobile] = useState(false);

        const touchStartX = useRef(0);
        const touchEndX = useRef(0);

        useEffect(() => {
            const checkMobile = () => {
                setIsMobile(window.innerWidth <= 768);
            };

            checkMobile();
            window.addEventListener('resize', checkMobile);

            return () => window.removeEventListener('resize', checkMobile);
        }, []);

        const filteredSources = sources.filter((src) => src !== cover.url);

        const sortedSources = [...filteredSources].sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || '', 10);
            const numB = parseInt(b.match(/\d+/)?.[0] || '', 10);
            return numA - numB;
        });

        const allImages = [cover.url, ...sortedSources];

        const maxPageIndex = isMobile ? sortedSources.length : Math.ceil(sortedSources.length / 2);

        const changePage = (direction: 'next' | 'prev') => {
            setPageIndex((prev) =>
                direction === 'next' ? Math.min(maxPageIndex, prev + 1) : Math.max(0, prev - 1),
            );
        };

        useEffect(() => {
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

        useEffect(() => {
            if (isModalOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }, [isModalOpen]);

        const openModal = () => {
            setIsModalOpen(true);
        };

        // SWIPE
        const handleTouchStart = (e: React.TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchMove = (e: React.TouchEvent) => {
            touchEndX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            if (!isMobile) return;

            const delta = touchStartX.current - touchEndX.current;

            if (Math.abs(delta) < 50) return;

            if (delta > 0 && pageIndex < maxPageIndex) {
                changePage('next');
            }

            if (delta < 0 && pageIndex > 0) {
                changePage('prev');
            }
        };

        const renderImages = (isModal = false) => {
            return allImages.map((src, idx) => {
                let visible = false;

                if (pageIndex === 0) {
                    visible = idx === 0;
                } else if (isMobile) {
                    visible = idx === pageIndex;
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
                        <Image
                            src={src}
                            width={isModal ? 600 : 250}
                            height={isModal ? 800 : 292}
                            className={isModal ? cls.modalImage : cls.coverImage}
                            priority
                            alt={idx === 0 ? cover.name : `Page ${idx}`}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                );
            });
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
                        {renderImages(false)}
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (pageIndex > 0) changePage('prev');
                                }}
                                className={`${cls.navSymbol} ${
                                    pageIndex === 0 ? cls.disabled : ''
                                }`}
                            >
                                {'<'}
                            </span>

                            {renderImages(true)}

                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
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
                                    : isMobile
                                      ? pageIndex + 1
                                      : (pageIndex - 1) * 2 + 2}
                            </span>

                            <input
                                type="range"
                                min={0}
                                max={maxPageIndex}
                                value={pageIndex}
                                onChange={(e) => setPageIndex(parseInt(e.target.value))}
                                className={cls.pageSlider}
                            />

                            <span className={cls.pageNumber}>
                                {pageIndex === 0
                                    ? 1
                                    : isMobile
                                      ? pageIndex + 1
                                      : Math.min(sortedSources.length, (pageIndex - 1) * 2 + 3)}
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
    },
);

GalleryCategoriesWithModalSlider.displayName = 'GalleryCategoriesWithModalSlider';
