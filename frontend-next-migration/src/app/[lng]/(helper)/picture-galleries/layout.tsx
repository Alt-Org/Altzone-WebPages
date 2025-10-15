'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import { cls } from '@/preparedPages/PictureGalleryPages';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const { t } = useClientTranslation('picture-galleries');

    return (
        <LayoutWithSidebars
            className="test"
            leftTopSidebar={{
                component: <GalleryNavMenuAsDropdown openByDefault={true} />,
                hideOnMobile: true,
                className: cls.LeftSidebar,
            }}
        >
            {isTouchDevice && (
                <>
                    <PageTitle
                        titleText={t('picture-galleries-title')}
                        alternate={true}
                        searchVisible={false}
                    />
                    <GalleryNavMenuAsDropdown openByDefault={false} />
                </>
            )}
            {children}
        </LayoutWithSidebars>
    );
}
