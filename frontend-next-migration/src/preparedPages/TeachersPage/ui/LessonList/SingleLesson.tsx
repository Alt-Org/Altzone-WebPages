import { Button, ButtonTheme } from '@/shared/ui/v2/Button';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { useState } from 'react';

export interface SingleLessonProps {
    lessonId: string;
    lessonTitle: string;
    lessonIdentifier: string;
    onDelete: (lessonId: string) => void;
}

const SingleLesson = (props: SingleLessonProps) => {
    const [deleting, setDeleting] = useState(false);
    return (
        <DescriptionCard theme={DescriptionCardTheme.LESSON}>
            <DescriptionCard.Texts>
                <DescriptionCard.Texts.Title>{props.lessonTitle}</DescriptionCard.Texts.Title>
                {props.lessonIdentifier}
                {!deleting && (
                    <div>
                        <Button path={`/lessons/${props.lessonIdentifier}`}>
                            Siirry oppituntiin
                        </Button>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={() => setDeleting(true)}
                        >
                            Poista oppitunti
                        </Button>
                    </div>
                )}
                {deleting && (
                    <div>
                        <p>Oletko varma, että haluat poistaa oppitunnin?</p>
                        <span>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={() => setDeleting(false)}
                            >
                                Ei
                            </Button>
                            <Button onClick={() => props.onDelete(props.lessonId)}>Kyllä</Button>
                        </span>
                    </div>
                )}
            </DescriptionCard.Texts>
        </DescriptionCard>
    );
};

export default SingleLesson;
