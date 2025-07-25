'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import { HeroGroupNavMenu, HeroGroupNavMenuAsDropdown } from '@/features/NavigateHeroGroups';
import { useClientTranslation } from '@/shared/i18n';
import { cls } from '@/preparedPages/DefenseGalleryPages';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('heroes');

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <HeroGroupNavMenu />,
                hideOnMobile: true,
                width: '200px',
            }}
        >
            {isMobileSize && <h1 className={cls.Title}>{t('section-title')}</h1>}
            {isTabletSize && <h1 className={cls.Title}>{t('defense-gallery')}</h1>}
            {(isTabletSize || isMobileSize) && <HeroGroupNavMenuAsDropdown />}
            {children}
        </LayoutWithSidebars>
    );
}
