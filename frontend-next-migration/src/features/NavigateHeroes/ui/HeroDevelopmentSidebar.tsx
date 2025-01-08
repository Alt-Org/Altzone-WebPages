'use client';
import { HeroDevelopmentNavMenuAsDropdown, HeroNavMenu } from '@/features/NavigateHeroes';
import useSizes from '@/shared/lib/hooks/useSizes';
import React from 'react';

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
