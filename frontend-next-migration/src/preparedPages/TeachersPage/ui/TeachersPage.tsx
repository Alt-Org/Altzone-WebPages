import cls from './TeachersPage.module.scss';
import { ComingSoon } from '@/widgets/ComingSoon';

const TeachersPage = () => {
    return (
        <div className={cls.Wrapper}>
            <ComingSoon />
        </div>
    );
};

export default TeachersPage;
