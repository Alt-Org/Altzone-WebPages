'use client';
import Image from 'next/image';
import cls from './ComicReader.module.scss';

type RenderImagesProps = {
    images: string[];
    coverName: string;
    pageIndex: number;
    isMobile: boolean;
    isModal?: boolean;
    isModalOpen: boolean;
};

export const RenderImages = ({
    images,
    coverName,
    pageIndex,
    isMobile,
    isModal = false,
    isModalOpen,
}: RenderImagesProps) => {
    const visibleStartIndex = pageIndex === 0 ? 0 : isMobile ? pageIndex : (pageIndex - 1) * 2 + 1;
    const visiblePageCount = pageIndex === 0 || isMobile ? 1 : 2;
    const visibleEndIndex = visibleStartIndex + visiblePageCount - 1;
    const imageProps = isModal
        ? { width: 0, height: 0, sizes: '100vw', className: cls.modalImage }
        : { width: 250, height: 292, className: cls.coverImage };

    return images.map((src, idx) => {
        // Mount just the current view and two upcoming images to warm the browser cache.
        if (idx < visibleStartIndex || idx > visibleEndIndex + 2) return null;

        // Warm modal-sized images before opening.
        const visible =
            idx >= visibleStartIndex && idx <= visibleEndIndex && (!isModal || isModalOpen);

        return (
            <div
                className={cls.pageWrapper}
                key={idx}
                style={{ display: visible ? 'flex' : 'none' }}
            >
                <Image
                    {...imageProps}
                    src={src}
                    priority={idx === 0}
                    loading="eager"
                    fetchPriority={idx === 0 || visible ? 'high' : 'low'}
                    alt={idx === 0 ? coverName : `Page ${idx}`}
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        );
    });
};
