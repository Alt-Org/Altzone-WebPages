import { SectionGallerias } from "@/widgets/SectionGallerias";
import { SectionEmbedLink } from "@/widgets/SectionEmbedLink";
import { Container } from "@/shared/ui/Container";
import {SectionGalleriasPaths} from "@/shared/const/SectionGalleriasPaths";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";

import cls from "./PictureGalleryPage.module.scss";

export interface Props {
    title: string;
    info: string;
    socials: string,
}

const PictureGalleryPage = async (props: Props) => {

    const {
        title,
        info,
        socials,
    } = props;

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <h1>
                    {title}
                </h1>
                <div className={cls.InfoText}>{info}</div>
                <div className={cls.SocialsText}>{socials}</div>
                <SectionEmbedLink />
                <SectionGallerias parentDirectory={SectionGalleriasPaths.artGalleries} />
            </Container>
        </div>
    );
};

export default withBackgroundImage<Props>({
    alt: "Picture Gallery Page underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
})(PictureGalleryPage);

