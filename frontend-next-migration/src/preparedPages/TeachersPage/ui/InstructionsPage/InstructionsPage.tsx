import { NavigateTeachers } from '@/features/NavigateTeachers';
import { SectionLessonFlow } from '@/widgets/SectionLessonFlow';
import cls from './InstructionPage.module.scss';

const InstructionsPage = () => {
    return (
        <div className={cls.Container}>
            <NavigateTeachers />
            <SectionLessonFlow />
        </div>
    );
};

export default InstructionsPage;
