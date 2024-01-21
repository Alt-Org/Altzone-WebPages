import { Navbar } from "@/widgets/Navbar";
import { Container } from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import { GalleriasSection } from "@/widgets/GalleriasSection";
import {useServerTranslation} from "@/shared/i18n";


const PictureGalleryPage = async ({lng}: {lng: string}) => {
    const {t} = await useServerTranslation(lng, "picture-galleries");

    return (
        <div className={cls.Wrapper}>
            <Navbar className={cls.Navbar}/>
            <Container className={cls.Container}>
                <h1>{t('picture-galleries')}</h1>
                <GalleriasSection parentDirectory={"artGalleries"} />
            </Container>
        </div>
    );
};

export default PictureGalleryPage;

