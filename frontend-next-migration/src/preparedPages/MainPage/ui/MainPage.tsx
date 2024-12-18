'use client';
import { SectionHeroesBlocks, HeroesBlocksProps } from '@/widgets/SectionHeroesBlocks';
import { HorizontalLines } from '@/shared/ui/PageDividers';
import { Gallery, GalleryProps } from './_components/sections/Gallery';
import { GetToKnowComicsProps } from './_components/sections/GetToKnowComics';
import { PlayWithUs, PlayWithUsProps } from './_components/sections/PlayWithUs';
import {
    ProjectDescription,
    ProjectDescriptionProps,
} from './_components/sections/ProjectDescription';
import {
    VideoAndGalleries,
    VideoAndGalleriesProps,
} from './_components/sections/VideoAndGalleries';
import cls from './page.module.scss';

export type Props = {
    projectDescription: ProjectDescriptionProps;
    playWithUs: PlayWithUsProps;
    getToKnowComics: GetToKnowComicsProps;
    videoAndGalleries: VideoAndGalleriesProps;
    gallery: GalleryProps;
    heroesBlocks: HeroesBlocksProps;
};

function MainPage(props: Props) {
    const {
        projectDescription,
        playWithUs,
        // getToKnowComics,
        heroesBlocks,
        videoAndGalleries,
        // classifiedHeroesBlocks,
        gallery,
    } = props;

    return (
        <div className={cls.MainPage}>
            <ProjectDescription
                className={cls.description}
                {...projectDescription}
            />
            <HorizontalLines />

            <PlayWithUs {...playWithUs} />

            {/*<HorizontalLines />*/}

            {/*<VideoAndGalleries*/}
            {/*    {...videoAndGalleries}*/}
            {/*/>*/}

            <HorizontalLines />

            <SectionHeroesBlocks
                {...heroesBlocks}
                maxHeroesPerGroup={2}
                maxGroupsPerPage={3}
            />

            <HorizontalLines />

            <Gallery {...gallery} />

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
