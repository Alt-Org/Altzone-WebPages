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
import { SectionHeroesBlocks } from "@/widgets/SectionHeroesBlocks";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";

type Props = {
    lng: string
}

const MainPage = async ({ lng }: Props) => {

    const { t } = await useServerTranslation(lng, 'main');

    return (
        <>
            {/* Abadi */}
            {/*<div className={cls.Wrapper}>*/}
            <FeedbackSideButton disableMobile={true} />

            <Navbar overlaid />

           

            <SectionPlayWithUs
                webGlButtonText={t('PlayOnline')}
            />

            <HorizontalLines />

            <DescriptionWithNav className={cls.description} />
            <HorizontalLines />
            
             {/*<SectionHeroes />*/}
            <SectionHeroesBlocks />
            <HorizontalLines />
            
            <SectionGetToKnowComics buttonParams={{ innerText: t("getToKnowComics"), href: RoutePaths.COMICS_GALLERY }} />
            <HorizontalLines />
            <SectionVideoAndGalleries />
            <HorizontalLines />
            {/*<SectionNewsPreview/>*/}

            <SectionRanking
                rankingPlayerText={t('ranking-player')}
                rankingScoreText={t('ranking-score')}

            />
           
            <Footer />


            <ScrollTop />
            {/*</div>*/}
        </>
    );
};


// export default withBackgroundImage({
//     alt: "Main-Page underground style background",
//     imagePath: bgPicture as unknown as string,
//     // @ts-ignore
// })(MainPage);

export default MainPage;
