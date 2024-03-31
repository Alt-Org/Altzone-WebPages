import { SectionHero } from "@/widgets/SectionHero";
import { DescriptionWithNav } from "@/widgets/DescriptionWithNav";
import { Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";
import { FeedbackSideButton } from "@/features/FeedbackByExternalSource";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { AppExternalLinks } from "@/shared/appLinks/appExternalLinks";
import { Container } from "@/shared/ui/Container";
import backgroundImage from '@/shared/assets/images/introBackground-transformed2.png';
import { withBackgroundImage } from "@/shared/lib/hocs/withBackgroundImage";
import cls from "./page.module.scss"
import { ScrollTop } from "@/features/ScrollTop";
import { useServerTranslation } from "@/shared/i18n";
import Link from "next/link";
import { classNames } from "@/shared/lib/classNames/classNames";
import Image from "next/image";
import bookImg from "@/shared/assets/images/mainpage/book.webp";
import { RoutePaths } from "@/shared/appLinks/RoutePaths";
import VideoContentYoutube from "@/shared/ui/VideoContent/ui/VideoContentYoutube";
import { SectionVideoAndGalleries } from "@/widgets/SectionVideoAndGalleries";
import { SectionNewsPreview } from "@/widgets/SectionNewsPreview";
import { SectionGetToKnowComics } from "@/widgets/SectionGetToKnowComics";
import { SectionHeroes } from "@/widgets/SectionHeroes";
import { SectionPlayWithUs } from "@/widgets/SectionPlayWithUs";
import { SectionRanking } from "@/widgets/SectionRanking";
import { SectionHeroes2 } from "@/widgets/SectionHeroes2";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";

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
            <SectionHeroes2 />
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
            <HorizontalLines />
            <Footer />


            <ScrollTop />
            {/*</div>*/}
        </>
    );
};


// export default withBackgroundImage({
//     alt: "Main-Page underground style background",
//     imagePath: backgroundImage as unknown as string,
//     // @ts-ignore
// })(MainPage);

export default MainPage;
