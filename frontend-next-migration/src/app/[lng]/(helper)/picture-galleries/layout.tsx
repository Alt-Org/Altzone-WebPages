'use client';
import { useState, ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { GalleryNavMenuAsSidebar, GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';
import { cls } from '@/preparedPages/PictureGalleryPages';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const dropdown = isTouchDevice ? <GalleryNavMenuAsDropdown openByDefault={true} /> : null;
    const { t } = useClientTranslation('picture-galleries');

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                collapsed: !sidebarVisible,
                component: (
                    <GalleryNavMenuAsSidebar
                        sidebarVisible={sidebarVisible}
                        setSidebarVisible={setSidebarVisible}
                    />
                ),
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
