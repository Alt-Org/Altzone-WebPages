'use client';
import cls from './GameArtPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import WikiContent from '@/shared/ui/WikiContent/ui/WikiContent';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
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
                    hideOnMobile: false,
                }}
            >
                <Container className={cls.Title}>
                    <PageTitle
                        titleText={title}
                        alternate={true}
                    />
                </Container>
                <div className={cls.SectionGrid}>
                    {sections.map((section) => {
                        return (
                            <ModularCard
                                key={section.id}
                                theme={ModularCardTheme.SECTIONCARD}
                                className={cls.SectionCard}
                            >
                                <ModularCard.Texts>
                                    <ModularCard.Texts.Title>
                                        {section.label}
                                    </ModularCard.Texts.Title>
                                    <ModularCard.Texts.Body>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: section.description,
                                            }}
                                        />
                                    </ModularCard.Texts.Body>
                                </ModularCard.Texts>

                                {section.image && (
                                    <ModularCard.Image className={cls.SectionCardImage}>
                                        <ModularCard.Image.Triangle />
                                        <ModularCard.Image.Image
                                            src={section.image}
                                            alt={section.imageAlt}
                                            width={600}
                                            height={400}
                                        />
                                    </ModularCard.Image>
                                )}
                            </ModularCard>
                        );
                    })}
                </div>
            </LayoutWithSidebars>
        </main>
    );
};

export default GameArtPackagePage;
