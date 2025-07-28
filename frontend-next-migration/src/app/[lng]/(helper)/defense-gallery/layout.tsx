'use client';
import { ReactNode, useMemo } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import { HeroGroupNavMenu, HeroGroupNavMenuAsDropdown } from '@/features/NavigateHeroGroups';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('heroes');

    const titleText = useMemo(() => {
        if (isTabletSize) return t('defense-gallery');
        if (isMobileSize) return t('section-title');
        return '';
    }, [isMobileSize, isTabletSize]);

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <HeroGroupNavMenu />,
                hideOnMobile: true,
                width: '300px',
            }}
        >
            {(isTabletSize || isMobileSize) && (
                <>
                    <PageTitle
                        titleText={titleText}
                        alternate={true}
                        searchVisible={false}
                    />
                    <HeroGroupNavMenuAsDropdown />
                </>
            )}
            {children}
        </LayoutWithSidebars>
    );
}
