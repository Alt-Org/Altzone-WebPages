import { Container } from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import { SectionGallerias } from "@/widgets/SectionGallerias";
import {useServerTranslation} from "@/shared/i18n";
import {SectionGalleriasPaths} from "@/shared/const/SectionGalleriasPaths";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";

export interface Props {
    lng: string
}

const PictureGalleryPage = async (props: Props) => {

    const {lng} = props;

    const {t} = await useServerTranslation(lng, "picture-galleries");

    return (
        <div className={cls.Wrapper}>
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

