import cls from "./page.module.scss"
import { DescriptionWithNav } from "@/widgets/DescriptionWithNav";
import { Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";
import { FeedbackSideButton } from "@/features/FeedbackByExternalSource";
import { ScrollTop } from "@/features/ScrollTop";
import { useServerTranslation } from "@/shared/i18n";
import { RoutePaths } from "@/shared/appLinks/RoutePaths";
import { SectionVideoAndGalleries } from "@/widgets/SectionVideoAndGalleries";
import { SectionGetToKnowComics } from "@/widgets/SectionGetToKnowComics";
import { SectionPlayWithUs } from "@/widgets/SectionPlayWithUs";
import { SectionRanking } from "@/widgets/SectionRanking";
import { SectionClassifiedHeroesBlocks } from "@/widgets/SectionClassifiedHeroesBlocks";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";
import { withBackgroundImage } from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";

import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import green from "@/shared/assets/images/heros/textBgColors/green.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import lightBlue from "@/shared/assets/images/heros/textBgColors/light-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import purple from "@/shared/assets/images/heros/textBgColors/purple.webp";

type Props = {
    lng: string
}

const MainPage = async ({ lng }: Props) => {

    const { t } = await useServerTranslation(lng, 'main');

    const sameBg = undefined;
    // const sameBg = bgPicture.src;

    return (
        <>
            {/* Abadi */}
            {/*<div className={cls.Wrapper}>*/}
            <FeedbackSideButton disableMobile={true} />

            <Navbar overlaid />



            <SectionPlayWithUs
                webGlButtonText={t('PlayOnline')}
                backgroundImageSrc={sameBg}
            />

            <HorizontalLines />

            <DescriptionWithNav
                className={cls.description}
                backgroundImageSrc={sameBg}
            />

            <HorizontalLines />

            {/*<SectionHeroes />*/}
            <SectionClassifiedHeroesBlocks
                backgroundImageSrc={sameBg}
                group="TORJUJAT // RETROFLEKTIO"
                textBgColor={red}
            />

            <SectionClassifiedHeroesBlocks
                backgroundImageSrc={sameBg}
                group="SULAUTUJAT // KONFLUENSSI"
                textBgColor={pink}
            />

            <SectionClassifiedHeroesBlocks
                backgroundImageSrc={sameBg}
                group="ÄLYLLISTÄJÄT // EGOTISMI"
                textBgColor={darkBlue}
            />

            <SectionClassifiedHeroesBlocks
                backgroundImageSrc={sameBg}
                group="PEILAAJAT // PROJEKTIO"
                textBgColor={orange}
            />




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

            <Footer />


            <ScrollTop />
            {/*</div>*/}
        </>
    );
};


export default withBackgroundImage({
    alt: "Main-Page underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
    // @ts-ignore
})(MainPage);

// export default MainPage;
