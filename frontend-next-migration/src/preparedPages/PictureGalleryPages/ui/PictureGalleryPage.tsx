import { SectionGallerias } from '@/widgets/SectionGallerias';
import { Container } from '@/shared/ui/Container';
import { SectionGalleriasPaths } from '@/shared/const/SectionGalleriasPaths';
import cls from './PictureGalleryPage.module.scss';

export interface Props {
    title: string;
}

const PictureGalleryPage = (props: Props) => {
    const { title } = props;

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <h1>{title}</h1>
                <SectionGallerias parentDirectory={SectionGalleriasPaths.galleries} />
            </Container>
        </div>
    );
};

export default PictureGalleryPage;
