'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { CollectionsNavMenuAsDropdown } from '@/features/NavigateCollections';
import useSizes from '@/shared/lib/hooks/useSizes';
import cls from './CollectionsPage.module.scss';

const CollectionsLayout = ({ children }: { children: ReactNode }) => {
    const { isMobileSize } = useSizes();
    return (
        <LayoutWithSidebars
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
            <main>{children}</main>
        </LayoutWithSidebars>
    );
};

export default CollectionsLayout;
