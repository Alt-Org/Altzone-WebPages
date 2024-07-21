import { Navbar } from "@/widgets/Navbar";
import { Container } from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import { SectionGallerias } from "@/widgets/SectionGallerias";
import {useServerTranslation} from "@/shared/i18n";
import {SectionGalleriasPaths} from "@/shared/const/SectionGalleriasPaths";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";


const PictureGalleryPage = async ({lng}: {lng: string}) => {
    const {t} = await useServerTranslation(lng, "picture-galleries");

    return (
        <div className={cls.Wrapper}>
            <Navbar className={cls.Navbar}/>
            <Container className={cls.Container}>
                <h1>{t('picture-galleries')}</h1>
                <SectionGallerias parentDirectory={SectionGalleriasPaths.artGalleries} />
            </Container>
        </div>
    );
};

export default withBackgroundImage({
    alt: "Picture Gallery Page underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
    // @ts-ignore
})(PictureGalleryPage);

