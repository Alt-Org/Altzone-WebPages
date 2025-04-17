'use client';
import React from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import HeroDevelopmentNavMenuAsDropdownAsync from '../HeroDevelopmentNavMenuAsDropdown/HeroDevelopmentNavMenuAsDropdown.async';
import HeroNavMenuAsync from '../HeroNavMenu/HeroNavMenu.async';
import cls from './HeroDevelopmentSidebar.module.scss';

const HeroDevelopmentSidebar: React.FC = () => {
    const { isDesktopSize, isWidescreenSize } = useSizes();

    return isDesktopSize || isWidescreenSize ? (
        <div className={cls.HeroNavMenu}>
            <HeroNavMenuAsync />
        </div>
    ) : (
        <HeroDevelopmentNavMenuAsDropdownAsync />
    );
};
export default HeroDevelopmentSidebar;
