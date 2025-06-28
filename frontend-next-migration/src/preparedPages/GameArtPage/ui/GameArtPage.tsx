'use client';
import cls from './GameArtPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import WikiContent from '@/shared/ui/WikiContent/ui/WikiContent';
import GameArtNavMenu from '@/features/NavigateGameArt';
import { PageTitle } from '@/shared/ui/PageTitle';
import { Container } from '@/shared/ui/Container';

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
    title: string;
};

const GameArtPackagePage = (props: Props) => {
    const { sections = [], title } = props;

    return (
        <main>
            <LayoutWithSidebars
                leftTopSidebar={{
                    component: <GameArtNavMenu sections={sections} />,
                    hideOnMobile: true,
                }}
            >
                <Container className={cls.Title}>
                    <PageTitle
                        titleText={title}
                        alternate={true}
                    />
                </Container>
                <WikiContent sections={sections} />
            </LayoutWithSidebars>
        </main>
    );
};

export default GameArtPackagePage;
