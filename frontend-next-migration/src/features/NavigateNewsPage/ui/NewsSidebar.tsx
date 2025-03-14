'use client';
import { NewsPageNavMenuAsDropdown, NewsNavMenu } from '@/features/NavigateNewsPage';
import useSizes from '@/shared/lib/hooks/useSizes';
import React from 'react';

const NewsSidebar: React.FC = () => {
    const { isDesktopSize, isWidescreenSize } = useSizes();

    return isDesktopSize || isWidescreenSize ? (
        <div style={{ width: 'fit-content' }}>
            <NewsNavMenu />
        </div>
    ) : (
        <NewsPageNavMenuAsDropdown />
    );
};
export default NewsSidebar;
