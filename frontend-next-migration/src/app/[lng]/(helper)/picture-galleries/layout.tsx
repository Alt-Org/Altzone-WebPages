'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';
import { cls } from '@/preparedPages/PictureGalleryPages';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const { t } = useClientTranslation('picture-galleries');

    return (
        <>
            <div >
                <h1 className={cls.mainTitle}>{t('picture-galleries-title')}</h1>
            </div>
            <LayoutWithSidebars className='test'
                leftTopSidebar={{
                    component: <GalleryNavMenuAsDropdown openByDefault={true} />,
                    hideOnMobile: true,
                    className: cls.LeftSidebar,
                }}
            >
                <div className={cls.Header}>
                <h1 className={cls.Title}>{t('picture-galleries')}</h1>
                <p className={cls.InfoText}>{t('info-text')}</p>
                </div>
                {isTouchDevice ? <GalleryNavMenuAsDropdown openByDefault={false} /> : null}
                {children}
            </LayoutWithSidebars>
        </>
    );
}
