'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { CollectionsNavMenuAsDropdown } from '@/features/NavigateCollections';
import cls from './FurnitureCollectionsPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';

const CollectionLayout = ({ children }: { children: ReactNode }) => {
    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('furniture');
    return (
        <LayoutWithSidebars
            className={cls.LayoutWithSidebars}
            leftTopSidebar={{
                component: (
                    <CollectionsNavMenuAsDropdown
                        isMobileSize={isMobileSize}
                        className={cls.NavMenu}
                    />
                ),
                hideOnMobile: true,
            }}
        >
            {(isTabletSize || isMobileSize) && (
                <>
                    <PageTitle
                        titleText={t('furniture-collections-title')}
                        alternate={true}
                        searchVisible={false}
                    />
                    <CollectionsNavMenuAsDropdown isMobileSize={isMobileSize} />
                </>
            )}
            <main className={cls.Content}>{children}</main>
        </LayoutWithSidebars>
    );
};

export default CollectionLayout;
