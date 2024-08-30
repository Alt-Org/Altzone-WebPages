import cls from "./ComicsGalleriesPage.module.scss";
import {Container} from "@/shared/ui/Container";
import {SectionGallerias} from "@/widgets/SectionGallerias";
import {SectionGalleriasPaths} from "@/shared/const/SectionGalleriasPaths";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";

export interface Props {
    title: string;
}

const ComicsGalleriesPage = async (props: Props) => {

    const {
        title
    } = props;

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <h1>
                    title
                </h1>
                <SectionGallerias parentDirectory={SectionGalleriasPaths.comics}/>
            </Container>
        </div>
    )
}

export default withBackgroundImage<Props>({
    alt: "Comics Galleries Page underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
})(ComicsGalleriesPage);
