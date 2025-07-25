'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import { HeroGroupNavMenu, HeroGroupNavMenuAsDropdown } from '@/features/NavigateHeroGroups';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';

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
            {isMobileSize && (
                <PageTitle
                    titleText={t('section-title')}
                    alternate={true}
                    searchVisible={false}
                />
            )}
            {isTabletSize && (
                <PageTitle
                    titleText={t('defense-gallery')}
                    alternate={true}
                    searchVisible={false}
                />
            )}
            {(isTabletSize || isMobileSize) && <HeroGroupNavMenuAsDropdown />}
            {children}
        </LayoutWithSidebars>
    );
}
