import cls from "./page.module.scss"
import { ProjectDescription } from "./_components/sections/ProjectDescription";
import { RoutePaths } from "@/shared/appLinks/RoutePaths";
import { SectionVideoAndGalleries } from "@/widgets/SectionVideoAndGalleries";
import { SectionGetToKnowComics } from "@/widgets/SectionGetToKnowComics";
import { SectionPlayWithUs } from "@/widgets/SectionPlayWithUs";
import { SectionClassifiedHeroesBlocks } from "@/widgets/SectionClassifiedHeroesBlocks";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";
import { withBackgroundImage } from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";


export type Props = {
    t: (key: string) => string;
}

function MainPage ({ t }: Props)  {



    const sameBg = undefined;

    return (
        <>

            <ProjectDescription
                className={cls.description}
                backgroundImageSrc={sameBg}
            />

            <HorizontalLines />

            <SectionPlayWithUs
                webGlButtonText={t('PlayOnline')}
                backgroundImageSrc={sameBg}
            />

            <HorizontalLines />

            <SectionClassifiedHeroesBlocks/>


            <HorizontalLines />

            <SectionGetToKnowComics
                buttonParams={{ innerText: t("getToKnowComics"), href: RoutePaths.COMICS_GALLERY }}
                backgroundImageSrc={sameBg}

            />
            <HorizontalLines />
            <SectionVideoAndGalleries
                backgroundImageSrc={sameBg}
            />
            <HorizontalLines />
            {/*<SectionNewsPreview/>*/}

            {/*<SectionRanking*/}
            {/*    rankingPlayerText={t('ranking-player')}*/}
            {/*    rankingScoreText={t('ranking-score')}*/}

            {/*/>*/}
            {/*</div>*/}
        </>
    );
};


export default withBackgroundImage<Props>({
    alt: "Main-Page underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
})(MainPage);

