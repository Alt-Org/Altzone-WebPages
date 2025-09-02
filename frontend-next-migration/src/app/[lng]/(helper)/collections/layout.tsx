'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { CollectionsNavMenuAsDropdown } from '@/features/NavigateCollections';
import { PageTitle } from '@/shared/ui/PageTitle';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';

const CollectionsLayout = ({ children }: { children: ReactNode }) => {
    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('collections');
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <CollectionsNavMenuAsDropdown isMobileSize={isMobileSize} />,
                hideOnMobile: true,
            }}
        >
            {(isTabletSize || isMobileSize) && (
                <>
                    <PageTitle
                        titleText={t('collections-title')}
                        alternate={true}
                        searchVisible={false}
                    />
                    <CollectionsNavMenuAsDropdown isMobileSize={isMobileSize} />
                </>
            )}
            <main>{children}</main>
        </LayoutWithSidebars>
    );
};

export default CollectionsLayout;
