import cls from "./ComicsGalleriesPage.module.scss";
import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import {GalleriasSection} from "@/widgets/GalleriasSection";
import Head from "next/head";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {useServerTranslation} from "@/shared/i18n";

const ComicsGalleriesPage = async ({lng}: {lng: string}) => {
    const {t} = await useServerTranslation(lng, "comics");


    return (
        <div className={cls.Wrapper}>
            <Head>
                <title>{t('head-title')}</title>
                <meta name="description"
                      content={t('head-description')}/>
                <meta name="keywords" content={t('head-keywords')}/>
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.COMICS_GALLERY}`}/>
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={t('head-title')}/>
                <meta property="og:description"
                      content={t('head-description')}/>
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.COMICS_GALLERY}`}/>
            </Head>
            <Navbar key={"navbarPictureGallery"} className={cls.Navbar}/>
            <Container className={cls.Container}>
                <h1>{t('Comics')}</h1>
                <GalleriasSection parentDirectory={"comics"}/>
            </Container>
        </div>
    )
}

export default ComicsGalleriesPage;
