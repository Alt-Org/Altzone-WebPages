import { Button, ButtonTheme } from '@/shared/ui/v2/Button/ui/Button';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { useState } from 'react';
import cls from './NewLesson.module.scss';
import { useClientTranslation } from '@/shared/i18n';

export interface NewLessonProps {
    onCreate: (title: string, numStudents: number) => void;
    onCancel: () => void;
}

const NewLesson = (props: NewLessonProps) => {
    const { t } = useClientTranslation('teachers');
    const [values, setValues] = useState({
        title: '',
        numStudents: 10,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onCreate(values.title, values.numStudents);
    };
    return (
        <DescriptionCard
            theme={DescriptionCardTheme.LESSON}
            className={cls.newLesson}
        >
            <DescriptionCard.Texts>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder={t('name-lesson')}
                        className={cls.lessonTitleInput}
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                    />
                    <span>
                        {t('number-students')}
                        <select
                            className={cls.numStudentsInput}
                            name="numStudents"
                            value={values.numStudents}
                            onChange={handleChange}
                        >
                            {
                                // TODO: replace with actual desired numbers of students
                                // currently 10...60
                                Array.from({ length: 6 }, (_, i) => (i + 1) * 10).map((num) => (
                                    <option
                                        key={num}
                                        value={num}
                                    >
                                        {num}
                                    </option>
                                ))
                            }
                        </select>
                    </span>
                    <div className={cls.buttons}>
                        <Button type="submit">{t('create')}</Button>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={props.onCancel}
                        >
                            {t('cancel')}
                        </Button>
                    </div>
                </form>
            </DescriptionCard.Texts>
        </DescriptionCard>
    );
};

export default NewLesson;
