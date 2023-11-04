import cls from "./ComicsGalleriesPage.module.scss";
import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import {GalleriasSection} from "@/widgets/GalleriasSection";
import {Helmet} from "react-helmet-async";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

const ComicsGalleriesPage = () => {
    return (
        <div className={cls.Wrapper}>
            <Helmet>
                <title>Sarjakuvagalleriat</title>
                <meta name="description" content="Selaa laajaa valikoimaa sarjakuvagallerioita ja löydä uusia suosikkejasi." />
                <meta name="keywords" content="altzone, sarjakuvat, sarjakuvagalleriat, comics, galleriat, sarjakuva, taide" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.COMICS_GALLERY}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sarjakuvagalleriat" />
                <meta property="og:description" content="Selaa laajaa valikoimaa sarjakuvagallerioita ja löydä uusia suosikkejasi." />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.COMICS_GALLERY}`} />
            </Helmet>
            <Navbar key={"navbarPictureGallery"} className={cls.Navbar}/>
            <Container className={cls.Container}>
                <h1>Sarjakuvat</h1>
                <GalleriasSection parentDirectory={"comics"}/>
            </Container>
        </div>
    )
}

export default ComicsGalleriesPage;
