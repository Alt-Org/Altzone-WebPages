import { Button, ButtonTheme } from '@/shared/ui/v2/Button';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';

export interface SingleLessonProps {
    lessonId: string;
    lessonTitle: string;
    lessonIdentifier: string;
}

const SingleLesson = (props: SingleLessonProps) => {
    return (
        <DescriptionCard theme={DescriptionCardTheme.LESSON}>
            <DescriptionCard.Texts>
                <DescriptionCard.Texts.Title>{props.lessonTitle}</DescriptionCard.Texts.Title>
                <DescriptionCard.Texts.Body>
                    {props.lessonIdentifier}
                    <div>
                        <Button path={`/lessons/${props.lessonIdentifier}`}>
                            Siirry oppituntiin
                        </Button>
                        <Button theme={ButtonTheme.OUTLINE}>Poista oppitunti</Button>
                    </div>
                </DescriptionCard.Texts.Body>
            </DescriptionCard.Texts>
        </DescriptionCard>
    );
};

export default SingleLesson;
