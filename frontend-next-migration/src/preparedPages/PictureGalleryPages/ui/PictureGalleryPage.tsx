import Head from "next/head"
import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import {GalleriasSection} from "@/widgets/GalleriasSection";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {useServerTranslation} from "@/shared/i18n";


const PictureGalleryPage = async ({lng}: {lng: string}) => {

    const {t} = await useServerTranslation(lng, "picture-galleries");

    return (
       <div className={cls.Wrapper}>

           <Head>
               <title>Kuvagalleriat</title>
               <meta name="description" content="Selaa kehittäjien, taiteilijoiden ja suunnittelijoiden töitä ja löydä inspiroivia projekteja." />
               <meta name="keywords" content="altzone, kuvagalleriat, taide, projektit, kehittäjät, suunnittelijat" />
               <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.PICTURE_GALLERY}`} />
               <meta property="og:type" content="website" />
               <meta property="og:title" content="Kuvagalleriat" />
               <meta property="og:description" content="Selaa kehittäjien, taiteilijoiden ja suunnittelijoiden töitä ja löydä inspiroivia projekteja." />
               <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.PICTURE_GALLERY}`} />
           </Head>

           <Navbar className={cls.Navbar}/>
           <Container  className={cls.Container}>
               <h1>{t("picture-galleries")}</h1>
               <GalleriasSection parentDirectory={"artGalleries"}/>
           </Container>
       </div>
   )
}

export default PictureGalleryPage;

