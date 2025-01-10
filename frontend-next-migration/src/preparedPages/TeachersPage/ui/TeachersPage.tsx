import cls from './TeachersPage.module.scss';
import { ComingSoon } from '@/widgets/ComingSoon';

export interface Props {
    title: string;
}

const TeachersPage = (props: Props) => {
    const { title } = props;

    return (
        <div className={cls.Wrapper}>
            <ComingSoon />
        </div>
    );
};

export default TeachersPage;
