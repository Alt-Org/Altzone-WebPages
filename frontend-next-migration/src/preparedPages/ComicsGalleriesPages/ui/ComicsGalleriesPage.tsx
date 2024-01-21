import cls from "./ComicsGalleriesPage.module.scss";
import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import {GalleriasSection} from "@/widgets/GalleriasSection";
import {useServerTranslation} from "@/shared/i18n";

const ComicsGalleriesPage = async ({lng}: {lng: string}) => {
    const {t} = await useServerTranslation(lng, "comics");


    return (
        <div className={cls.Wrapper}>
            <Navbar key={"navbarPictureGallery"} className={cls.Navbar}/>
            <Container className={cls.Container}>
                <h1>{t('Comics')}</h1>
                <GalleriasSection parentDirectory={"comics"}/>
            </Container>
        </div>
    )
}

export default ComicsGalleriesPage;
