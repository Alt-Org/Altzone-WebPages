'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { PageTitle } from '@/shared/ui/PageTitle';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';
import cls from '@/preparedPages/MusicCollectionsPages/ui/MusicCollectionsPage.module.scss';
import MusicCollectionNavMenuAsDropdown from '@/features/NavigateMusicCollection/ui/MusicCollectionNavMenuAsDropdown';

const MusicCollectionsLayout = ({ children }: { children: ReactNode }) => {
    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('music');
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <MusicCollectionNavMenuAsDropdown className={cls.NavMenu} />,
                hideOnMobile: true,
            }}
        >
            {(isTabletSize || isMobileSize) && (
                <>
                    <PageTitle
                        titleText={t('music-collections-title')}
                        alternate={true}
                        searchVisible={false}
                    />
                    <MusicCollectionNavMenuAsDropdown />
                </>
            )}
            {children}
        </LayoutWithSidebars>
    );
};

export default MusicCollectionsLayout;
