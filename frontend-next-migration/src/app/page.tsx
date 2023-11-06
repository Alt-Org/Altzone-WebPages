'use client'
import "./styles/variables/global.scss";

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
import backgroundImage from '@/shared/assets/images/introBackground.png';

import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import cls from "./page.module.scss"

import {ScrollTop} from "@/features/ScrollTop";
// import {CustomSlider} from "@/shared/ui/CustomSlider/CustomSlider";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import Head from "next/head";




const MainPage = () => {
  const handleClick = () => {
    openLinkInNewTab(AppExternalLinks.webgl);
  }


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
        <Navbar overlayed marginTop={20} />

        <HeroSection className={cls.heroSection}>
          <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL} className={cls.BtnGame} onClick={handleClick}>Pelaa netissä!</Button>
        </HeroSection>

        {/*<Container>*/}
        {/*  <DescriptionWithNav className={cls.description} />*/}
        {/*</Container>*/}

        {/*<Container>*/}

        {/*    /!*<div className={cls.}>*!/*/}

        {/*    /!*</div>*!/*/}
        {/*</Container>*/}

        {/*<CustomSlider>*/}
        {/*    <div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*        loool*/}
        {/*    </div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*    loool*/}
        {/*</div>*/}


        {/*<div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "red"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "blue"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "blue"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*<div style={{minWidth: "400px", backgroundColor: "blue"}}>*/}
        {/*    loool*/}
        {/*</div>*/}

        {/*</CustomSlider>*/}


        <NewsPreviewSection />
        <Footer />
        <ScrollTop/>
      </div>
  );
};

export default withBackgroundImage({
  alt: "Main-Page underground style background",
  imagePath: backgroundImage as unknown as string,
  // placeHolderPath: "/preloads/introBackground.png"
})(MainPage);

