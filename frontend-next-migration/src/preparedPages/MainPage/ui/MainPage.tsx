'use client';
import cls from './page.module.scss';
import { SectionHeroesBlocks, HeroesBlocksProps } from '@/widgets/SectionHeroesBlocks';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import {
    ProjectDescription,
    ProjectDescriptionProps,
} from './_components/sections/ProjectDescription';
import { GetToKnowComicsProps } from './_components/sections/GetToKnowComics';
import {
    // VideoAndGalleries,
    VideoAndGalleriesProps,
} from './_components/sections/VideoAndGalleries';
import { PlayWithUs, PlayWithUsProps } from './_components/sections/PlayWithUs';
import { Gallery, GalleryProps } from './_components/sections/Gallery';

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
        // videoAndGalleries,
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

            <HorizontalLines />

            <Gallery {...gallery} />

            <HorizontalLines />

            <SectionHeroesBlocks
                {...heroesBlocks}
                maxHeroesPerGroup={2}
                maxGroupsPerPage={3}
            />

            <HorizontalLines />

            {/*<VideoAndGalleries*/}
            {/*    backgroundImageSrc={sameBg}*/}
            {/*    {...videoAndGalleries}*/}
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
