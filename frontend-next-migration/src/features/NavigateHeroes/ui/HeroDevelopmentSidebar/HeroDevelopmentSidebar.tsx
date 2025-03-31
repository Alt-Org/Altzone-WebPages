'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import useSizes from '@/shared/lib/hooks/useSizes';

const HeroDevelopmentNavMenuAsDropdown = dynamic(
    () => import('../HeroNavMenuAsDropdown/HeroNavMenuAsDropdown'),
    {
        ssr: false,
    },
);
const HeroNavMenu = dynamic(() => import('../HeroNavMenu/HeroNavMenu'), {
    ssr: false,
});

const HeroDevelopmentSidebar: React.FC = () => {
    const { isDesktopSize, isWidescreenSize } = useSizes();

    return isDesktopSize || isWidescreenSize ? (
        <div style={{ width: 'fit-content' }}>
            <HeroNavMenu />
        </div>
    ) : (
        <HeroDevelopmentNavMenuAsDropdown />
    );
};
export default HeroDevelopmentSidebar;
