import { SectionGallerias } from '@/widgets/SectionGallerias';
import { Container } from '@/shared/ui/Container';
import { SectionGalleriasPaths } from '@/shared/const/SectionGalleriasPaths';
import cls from './TeachersPage.module.scss';

export interface Props {
    title: string;
}

const TeachersPage = (props: Props) => {
    const { title } = props;

    return (
        <div className={cls.Wrapper}>
            <h1>Testi</h1>
        </div>
    );
};

export default TeachersPage;
