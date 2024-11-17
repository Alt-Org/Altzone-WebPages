'use client';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { ScrollTop } from '@/features/ScrollTop';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { WikiContentWithSidebar } from '@/shared/ui/WikiContentWithSidebar';
import cls from './GameArtPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { TableOfContents } from '@/shared/ui/TableOfContents';
import React from 'react';
import { GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';

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
        <>
            <LayoutWithSidebars
                leftTopSidebar={{
                    component: <GalleryNavMenuAsDropdown />,
                }}
                rightBottomSidebar={{
                    component: <TableOfContents sections={sections} />,
                    hideOnMobile: true,
                }}
            >
                <WikiContentWithSidebar sections={sections} />
            </LayoutWithSidebars>

            {/*<div className={classNames(cls.pageContainer, combinedModCss)}>*/}
            {/*    <WikiContentWithSidebar sections={sections} />*/}
            {/*    <div>*/}
            {/*        <FeedbackSideButton />*/}
            {/*        <HorizontalLines />*/}
            {/*        {isMobileSize && <ScrollTop />}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default GameArtPackagePage;
