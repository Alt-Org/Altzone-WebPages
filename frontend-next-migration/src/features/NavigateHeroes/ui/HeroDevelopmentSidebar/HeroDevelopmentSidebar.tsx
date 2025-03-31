'use client';
import React from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import HeroDevelopmentNavMenuAsDropdownAsync from '../HeroDevelopmentNavMenuAsDropdown/HeroDevelopmentNavMenuAsDropdown.async';
import HeroNavMenuAsync from '../HeroNavMenu/HeroNavMenu.async';

const HeroDevelopmentSidebar: React.FC = () => {
    const { isDesktopSize, isWidescreenSize } = useSizes();

    return isDesktopSize || isWidescreenSize ? (
        <div style={{ width: 'fit-content' }}>
            <HeroNavMenuAsync />
        </div>
    ) : (
        <HeroDevelopmentNavMenuAsDropdownAsync />
    );
};
export default HeroDevelopmentSidebar;
