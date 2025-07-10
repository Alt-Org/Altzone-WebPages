'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';
import { cls } from '@/preparedPages/DefenseGalleryPages';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const { t } = useClientTranslation('heroes');

    const NavMenuPlaceholder = () => (
        <div
            style={{
                background: 'var(--base-card-background)',
                paddingLeft: '12px',
                borderRadius: '12px',
                margin: '1em',
                maxHeight: '400px',
                width: '80%',
                height: '100%',
                border: '4px solid var(--black)',
            }}
        >
            nav menu placeholder
        </div>
    );
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <NavMenuPlaceholder />,
                hideOnMobile: true,
            }}
        >
            <h1 className={cls.Title}>{t('defense-gallery')}</h1>
            {isTouchDevice ? <NavMenuPlaceholder /> : null}
            {children}
        </LayoutWithSidebars>
    );
}
