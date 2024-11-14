'use client';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { ScrollTop } from '@/features/ScrollTop';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './GameArtPage.module.scss';
import { TableOfContents } from '@/shared/ui/TableOfContents';

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
        <div className={classNames(cls.pageContainer, combinedModCss)}>
            {/*//todo mow to layout*/}
            <TableOfContents sections={sections} />
            <div>
                <FeedbackSideButton />
                <HorizontalLines />
                {isMobileSize && <ScrollTop />}
            </div>
        </div>
    );
};

export default GameArtPackagePage;
