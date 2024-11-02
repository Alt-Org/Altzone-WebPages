'use client';
/* This code snippet is defining a React functional component called `NavbarMain`. It imports necessary
dependencies such as `memo` from React, and components like `NavbarDesktopV2` and `NavbarMobileV2`.
It also imports some types and functions related to the navbar. */
import { memo, useMemo, useState } from 'react';
import NavbarDesktopV3 from '../NavbarDesktopV3/NavbarDesktopV3';
import NavbarMobileV3 from '../NavbarMobileV3/NavbarMobileV3';
import { NavBarType } from '../../model/types';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSizeV3';
import useSizes from '@/shared/lib/hooks/useSizes';
import { LS_KEYS } from '@/shared/const/LS_KEYS';
import { FixedProvider } from '../../model/FixedProvider';
import { CollapsedProvider } from '../../model/CollapsedProvider';

interface NavbarMainProps {
    marginTop?: number;
    className?: string;
    navBarType?: NavBarType;
}

export type FixedAndCollapsedType = {
    isFixed: boolean;
    toggleFixed: () => void;
    isCollapsed: boolean;
    toggleCollapsed: () => void;
};
const getInitialFixedState = (): boolean => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(LS_KEYS.IsNavBarFixed);
        return storedValue === 'true';
    }
    return false;
};
const getInitialCollapsedState = (): boolean => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(LS_KEYS.IsNavBarCollapsed);
        return storedValue === 'true';
    }
    return false;
};
/**
 * Version 2 uses new versions of the navbar components.
 * The `Provider` component has been updated to manage the collapse state.
 */

export const NavbarMainV3 = memo((props: NavbarMainProps) => {
    const { marginTop, className, navBarType = 'Default' } = props;

    const [isFixed, setIsFixed] = useState<boolean>(getInitialFixedState);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(getInitialCollapsedState);

    const toggleFixed = () => {
        const newValue = !isFixed;
        setIsFixed(newValue);
        localStorage.setItem(LS_KEYS.IsNavBarFixed, newValue.toString());
    };

    const toggleCollapsed = () => {
        const newValue = !isCollapsed;
        setIsCollapsed(newValue);
        localStorage.setItem(LS_KEYS.IsNavBarCollapsed, newValue.toString());
    };

    const { isMobileSize, isTabletSize } = useSizes();
    const size = useMemo(
        () => (isMobileSize || isTabletSize ? 'mobile' : 'desktop'),
        [isMobileSize, isTabletSize],
    );
    const navbarBuild = useMemo(
        () => getNavbarBuildByTypeAndSize(navBarType, size),
        [navBarType, size],
    );
    if (!navBarType) return null;

    return (
        <FixedProvider>
            <CollapsedProvider>
                {isMobileSize || isTabletSize ? (
                    <NavbarMobileV3
                        marginTop={marginTop}
                        className={className}
                        navbarBuild={navbarBuild}
                        navBarType={navBarType}
                        fixedAndCollapsed={{ isFixed, toggleFixed, isCollapsed, toggleCollapsed }}
                    />
                ) : (
                    <NavbarDesktopV3
                        marginTop={marginTop}
                        className={className}
                        navbarBuild={navbarBuild}
                        navBarType={navBarType}
                        fixedAndCollapsed={{ isFixed, toggleFixed, isCollapsed, toggleCollapsed }}
                    />
                )}
            </CollapsedProvider>
        </FixedProvider>
    );
});

NavbarMainV3.displayName = 'NavbarMainV3';
