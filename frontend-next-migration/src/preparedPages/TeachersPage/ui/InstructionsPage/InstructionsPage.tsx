import { NavigateTeachers } from '@/features/NavigateTeachers';
import cls from './InstructionPage.module.scss';

const InstructionsPage = () => {
    return (
        <div className={cls.Container}>
            <NavigateTeachers />
        </div>
    );
};

export default InstructionsPage;
