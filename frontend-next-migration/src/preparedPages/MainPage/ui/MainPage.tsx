// import "../app/styles/index.scss";
import {HeroSection} from "@/widgets/HeroSection";
import {DescriptionWithNav} from "@/widgets/DescriptionWithNav";
import {NewsPreviewSection} from "@/widgets/NewsPreviewSection";
import {Navbar} from "@/widgets/Navbar";
import {Footer} from "@/widgets/Footer";
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {openLinkInNewTab} from "@/shared/lib/openLinkInNewTab/openLinkInNewTab";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {Container} from "@/shared/ui/Container";
import backgroundImage from '@/shared/assets/images/introBackground-transformed2.png';

import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import cls from "./page.module.scss"
import {ScrollTop} from "@/features/ScrollTop";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import Head from "next/head";
import {useParams} from "next/navigation";
import {useClientTranslation} from "@/shared/i18n";

const MainPage = () => {
    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.webgl);
    }

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "main");

    return (
        <div className={cls.Wrapper}>
            <Head>
                <title>AltZone</title>
                <meta name="description" content="Altzone tarjoaa pelaajille mahdollisuuden liittyä yhteisöön, pelata pelejä ja tutustua uusiin sarjakuviin." />
                <meta name="keywords" content="altzone, peli, yhteisö, sarjakuvat, galleriat, pelaa, rekisteröidy, kirjaudu sisään" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.MAIN}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="AltZone - Aloita pelisi täältä" />
                <meta property="og:description" content="AltZone tarjoaa pelaajille mahdollisuuden liittyä yhteisöön, pelata pelejä ja tutustua uusiin sarjakuviin." />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.MAIN}`} />
            </Head>

            <FeedbackSideButton />


            <Navbar marginTop={20} />



            <Container>
            <DescriptionWithNav className={cls.description} />
            </Container>

            <HeroSection className={cls.heroSection}>
                <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL} className={cls.BtnGame} onClick={handleClick}>

                    {t('PlayOnline')}
                </Button>
            </HeroSection>



            {/*<NewsPreviewSection  className={cls.NewsPreviewSection}/>*/}

            {/*<div style={{marginTop: "200px"}} ></div>*/}
            <Footer  />


            <ScrollTop/>
        </div>
    );
};

export default withBackgroundImage({
    alt: "Main-Page underground style background",
    imagePath: backgroundImage as unknown as string,
})(MainPage);

