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
    const dropdown = isTouchDevice ? <GalleryNavMenuAsDropdown openByDefault={false} /> : null;
    const { t } = useClientTranslation('picture-galleries');

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <GalleryNavMenuAsDropdown openByDefault={true} />,
                hideOnMobile: true,
            }}
        >
            <h1 className={cls.Title}>{t('picture-galleries')}</h1>
            <p className={cls.InfoText}>{t('info-text')}</p>
            {dropdown}
            {children}
        </LayoutWithSidebars>
    );
}
