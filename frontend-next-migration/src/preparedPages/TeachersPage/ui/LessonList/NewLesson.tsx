import { Button, ButtonTheme } from '@/shared/ui/v2/Button/ui/Button';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { useState } from 'react';
import cls from './NewLesson.module.scss';

export interface NewLessonProps {
    onCreate: (title: string, numStudents: number) => void;
    onCancel: () => void;
}

const NewLesson = (props: NewLessonProps) => {
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
        <DescriptionCard theme={DescriptionCardTheme.LESSON}>
            <DescriptionCard.Texts>
                <form onSubmit={handleCreate}>
                    <input
                        type="text"
                        placeholder="Nimeä oppitunti"
                        className={cls.lessonTitleInput}
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                    />
                    <span>
                        Oppilaiden määrä
                        <select
                            className={cls.numStudentsInput}
                            name="numStudents"
                            value={values.numStudents}
                            onChange={handleChange}
                        >
                            {
                                //10...60
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
                    <div>
                        <Button type="submit">Luo</Button>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={props.onCancel}
                        >
                            Peruuta
                        </Button>
                    </div>
                </form>
            </DescriptionCard.Texts>
        </DescriptionCard>
    );
};

export default NewLesson;
