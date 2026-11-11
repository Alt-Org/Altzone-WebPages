import { ComicGallery } from '@/widgets/ComicGallery';
import { Container } from '@/shared/ui/Container';
import cls from './ComicsGalleriesPage.module.scss';

export interface Props {
    title: string;
}

export const comicsSectionId = 'comics-section';

const ComicsGalleriesPage = (props: Props) => {
    const { title } = props;

    return (
        <div
            className={cls.Wrapper}
            id={comicsSectionId}
        >
            <Container className={cls.Container}>
                <h2>{title}</h2>
                <ComicGallery />
            </Container>
        </div>
    );
};

export default ComicsGalleriesPage;
