import { SectionHeroesBlocks, HeroesBlocksProps } from '@/widgets/SectionHeroesBlocks';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
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
    heroesBlocks: HeroesBlocksProps;
};

function MainPage(props: Props) {
    const { projectDescription, playWithUs, videoAndGalleries, heroesBlocks } = props;

    const sameBg = undefined;

    return (
        <div className={cls.MainPage}>
            <ProjectDescription
                className={cls.description}
                {...projectDescription}
            />

            <HorizontalLines />
            <PlayWithUs {...playWithUs} />

            <HorizontalLines />

            <VideoAndGalleries
                backgroundImageSrc={sameBg}
                {...videoAndGalleries}
            />

            <HorizontalLines />

            <SectionHeroesBlocks
                {...heroesBlocks}
                maxHeroesPerGroup={2}
                maxGroupsPerPage={3}
            />

            {/*<HorizontalLines />*/}

            <HorizontalLines />

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
