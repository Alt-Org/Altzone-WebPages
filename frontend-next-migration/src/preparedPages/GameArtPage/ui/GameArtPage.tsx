'use client';
import cls from './GameArtPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { TableOfContents } from '@/shared/ui/TableOfContents';
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

    return (
        <LayoutWithSidebars
            className={cls.GameArtPackagePage}
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
