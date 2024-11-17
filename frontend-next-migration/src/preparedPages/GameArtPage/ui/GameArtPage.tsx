'use client';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Mods } from '@/shared/lib/classNames/classNames';
import cls from './GameArtPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { TableOfContents } from '@/shared/ui/TableOfContents';
import React from 'react';
import { GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';
import WikiContent from '@/shared/ui/WikiContent/ui/WikiContent';

interface Section {
    id: string;
    label: string;
    description: string;
    image: string;
    imageAlt: string;
    sidebarLogo: string;
    sidebarLogoAlt: string;
}

export type Props = {
    sections: Section[];
};

const GameArtPackagePage = (props: Props) => {
    const { sections = [] } = props;
    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();

    const combinedModCss: Mods = {
        [cls.isMobile]: isMobileSize,
        [cls.isTablet]: isTabletSize,
        [cls.isDesktop]: isDesktopSize,
        [cls.isWidescreen]: isWidescreenSize,
    };

    return (
        <LayoutWithSidebars
            // leftTopSidebar={{
            //     component: <GalleryNavMenuAsDropdown />,
            // }}
            rightBottomSidebar={{
                component: <TableOfContents sections={sections} />,
                hideOnMobile: true,
            }}
        >
            <WikiContent sections={sections} />
        </LayoutWithSidebars>
    );
};

export default GameArtPackagePage;
