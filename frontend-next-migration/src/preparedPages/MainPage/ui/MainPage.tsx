'use client';
import { SectionHeroesBlocks, HeroesBlocksProps } from '@/widgets/SectionHeroesBlocks';
import { Gallery, GalleryProps } from './_components/sections/Gallery';
import { GetToKnowComicsProps } from './_components/sections/GetToKnowComics';
import { PlayWithUs, PlayWithUsProps } from './_components/sections/PlayWithUs';
import { NewsSection, NewsSectionProps } from './_components/sections/NewsSection';
import {
    ProjectDescription,
    ProjectDescriptionProps,
} from './_components/sections/ProjectDescription';
import { VideoAndGalleriesProps } from './_components/sections/VideoAndGalleries';
import cls from './page.module.scss';
import { WallIntroAnimation } from '@/shared/ui/v2/WallIntroAnimation';
import { ContactSection, ContactSectionProps } from './_components/sections/ContactSection';

export type Props = {
    projectDescription: ProjectDescriptionProps;
    playWithUs: PlayWithUsProps;
    getToKnowComics: GetToKnowComicsProps;
    videoAndGalleries: VideoAndGalleriesProps;
    gallery: GalleryProps;
    heroesBlocks: HeroesBlocksProps;
    galleryCopy: GalleryProps;
    contactSection: ContactSectionProps;
    newsSection: NewsSectionProps;
};

function MainPage(props: Props) {
    const {
        projectDescription,
        playWithUs,
        // getToKnowComics,
        heroesBlocks,
        // classifiedHeroesBlocks,
        gallery,
        contactSection,
        newsSection,
    } = props;

    return (
        <div className={cls.MainPage}>
            <WallIntroAnimation renderOnce={true} />
            <ProjectDescription
                className={cls.description}
                {...projectDescription}
            />

            <PlayWithUs {...playWithUs} />

            {/*<HorizontalLines />*/}

            {/*<VideoAndGalleries*/}
            {/*    {...videoAndGalleries}*/}
            {/*/>*/}

            <SectionHeroesBlocks
                {...heroesBlocks}
                maxHeroesPerGroup={2}
                maxGroupsPerPage={3}
            />
            <Gallery {...gallery} />

            <NewsSection {...newsSection} />
            <ContactSection {...contactSection} />

            {/*<Gallery {...galleryCopy} />*/}

            {/*<HorizontalLines />*/}
            {/*<SectionRanking*/}
            {/*    rankingPlayerText={t('ranking-player')}*/}
            {/*    rankingScoreText={t('ranking-score')}*/}
            {/*/>*/}

            {/*<HorizontalLines />*/}
            {/*<PlayWithUs*/}
            {/*    {...playWithUs}*/}
            {/*/>*/}

            {/*<GetToKnowComics*/}
            {/*    backgroundImageSrc={sameBg}*/}
            {/*    {...getToKnowComics}*/}
            {/*/>*/}

            {/*<HorizontalLines />*/}
            {/*<VideoAndGalleries*/}
            {/*    backgroundImageSrc={sameBg}*/}
            {/*    {...videoAndGalleries}*/}
            {/*/>*/}
            {/*<HorizontalLines />*/}
            {/*<SectionNewsPreview/>*/}

            {/*<SectionRanking*/}
            {/*    rankingPlayerText={t('ranking-player')}*/}
            {/*    rankingScoreText={t('ranking-score')}*/}

            {/*/>*/}
            {/*</div>*/}
        </div>
    );
}

export default MainPage;
