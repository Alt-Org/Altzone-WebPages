import SingleLesson from './SingleLesson';
import cls from './LessonList.module.scss';
import { Button } from '@/shared/ui/v2/Button';
import plusIcon from '@/shared/assets/icons/plusIcon.svg';
import Image from 'next/image';
import { useState } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import NewLesson from './NewLesson';
const LessonList = () => {
    const { t } = useClientTranslation('teachers');
    // TODO: replace with real data fetched from backend
    // This is just a placeholder based on data present in the figma
    // real data may look different and would require refactoring the component
    const [mockLessons, setMockLessons] = useState([
        { id: 'abc123', identifier: 'aabbcc', title: 'Ryhmä 7A', numStudents: 20 },
        { id: 'def456', identifier: 'ddeeff', title: '7B', numStudents: 40 },
        { id: 'ghi789', identifier: 'gghhii', title: '8A', numStudents: 60 },
        { id: 'jkl012', identifier: 'jjkkll', title: '', numStudents: 10 },
        { id: 'mno345', identifier: 'mmnnoo', title: 'Oppitunti 5', numStudents: 30 },
        { id: 'pqr678', identifier: 'ppqqrr', title: '', numStudents: 10 },
    ]);
    const MAXLESSONS = 10;
    // add functions for creating and deleting lessons
    const [creatingLesson, setCreatingLesson] = useState(false);
    const createLesson = (title: string, numStudents: number) => {
        // logic for creating a lesson
        // mock function for now, in NewLesson user defined title and number of students
        // server would then create a random identifier and id for the lesson
        const newLesson = {
            id: Math.random().toString(36).slice(2, 11),
            identifier: Math.random().toString(36).slice(2, 11),
            title,
            numStudents,
        };
        setMockLessons((prevLessons) => [...prevLessons, newLesson]);
        setCreatingLesson(false);
    };
    const deleteLesson = (lessonId: string) => {
        // logic for deleting a lesson
        setMockLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== lessonId));
    };
    return (
        <div>
            <div className={cls.lessonListHeader}>
                <h2>{t('my-lessons')}</h2>
                <span>
                    ({mockLessons.length}/{MAXLESSONS})
                </span>
                <Button
                    disabled={creatingLesson || mockLessons.length >= MAXLESSONS}
                    onClick={() => {
                        setCreatingLesson(true);
                    }}
                >
                    {t('create-lesson')}
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
                        lessonTitle={lesson.title ? lesson.title : `${t('lesson')} ${num + 1}`}
                        lessonIdentifier={lesson.identifier}
                        onDelete={deleteLesson}
                    />
                ))}
                {creatingLesson && (
                    <NewLesson
                        onCreate={createLesson}
                        onCancel={() => setCreatingLesson(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default LessonList;
