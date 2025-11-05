'use client';
import { ReactNode } from 'react';
import { CollectionsNavMenuAsDropdown } from '@/features/NavigateCollections';
import cls from './FurnitureCollectionsPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';

const CollectionLayout = ({ children }: { children: ReactNode }) => {
    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('furniture');
    return (
        <>
            {(isTabletSize || isMobileSize) && (
                <>
                    <PageTitle
                        titleText={t('furniture-collections-title')}
                        alternate={true}
                        searchVisible={false}
                    />
                    <CollectionsNavMenuAsDropdown isMobileSize={isMobileSize || isTabletSize} />
                </>
            )}
            <main className={cls.Content}>{children}</main>
        </>
    );
};

export default CollectionLayout;
