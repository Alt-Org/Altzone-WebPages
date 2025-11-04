import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';

export interface NewLessonProps {
    lessonTitle: string;
    lessonIdentifier: string;
    onAdd: () => void;
    onCancel: () => void;
}

const NewLesson = (props: NewLessonProps) => {
    return (
        <DescriptionCard theme={DescriptionCardTheme.LESSON}>
            <DescriptionCard.Texts>
                <DescriptionCard.Texts.Title>{props.lessonTitle}</DescriptionCard.Texts.Title>
                <DescriptionCard.Texts.Body>{props.lessonIdentifier}</DescriptionCard.Texts.Body>
            </DescriptionCard.Texts>
        </DescriptionCard>
    );
};

export default NewLesson;
