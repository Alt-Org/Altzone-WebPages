import SingleLesson from './SingleLesson';
import cls from './LessonList.module.scss';
import { Button } from '@/shared/ui/v2/Button';
import plusIcon from '@/shared/assets/icons/plusIcon.svg';
import Image from 'next/image';
const LessonList = () => {
    // TODO: replace with real data fetched from backend
    // This is just a placeholder based on data present in the figma
    // real data may look different and would require refactoring the component
    const mockLessons = [
        { id: 'abc123', identifier: 'aabbcc', title: 'Ryhmä 7A' },
        { id: 'def456', identifier: 'ddeeff', title: '7B' },
        { id: 'ghi789', identifier: 'gghhii', title: '8A' },
        { id: 'jkl012', identifier: 'Tunniste', title: '' },
        { id: 'mno345', identifier: 'Tunniste', title: 'Oppitunti 5' },
        { id: 'pqr678', identifier: 'Tunniste', title: '' },
    ];
    const MAXLESSONS = 10;
    // add functions for creating and deleting lessons
    const creatingLesson = false;
    return (
        <div>
            <div className={cls.lessonListHeader}>
                <h2>Omat oppitunnit</h2>
                <span>
                    ({mockLessons.length}/{MAXLESSONS})
                </span>
                <Button disabled={creatingLesson || mockLessons.length >= MAXLESSONS}>
                    Luo uusi oppitunti
                    <Image
                        src={plusIcon}
                        alt="+"
                    />
                </Button>
            </div>
            <div className={cls.lessonList}>
                {mockLessons.map((lesson, num) => (
                    <SingleLesson
                        key={lesson.id}
                        lessonId={lesson.id}
                        lessonTitle={lesson.title ? lesson.title : `Lesson ${num + 1}`}
                        lessonIdentifier={lesson.identifier}
                    />
                ))}
            </div>
        </div>
    );
};

export default LessonList;
