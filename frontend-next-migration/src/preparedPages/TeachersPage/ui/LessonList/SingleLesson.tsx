import { Button, ButtonTheme } from '@/shared/ui/v2/Button';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { useState } from 'react';
import { useClientTranslation } from '@/shared/i18n';

export interface SingleLessonProps {
    lessonId: string;
    lessonTitle: string;
    lessonIdentifier: string;
    onDelete: (lessonId: string) => void;
}

const SingleLesson = (props: SingleLessonProps) => {
    const { t } = useClientTranslation('teachers');
    const [deleting, setDeleting] = useState(false);
    return (
        <DescriptionCard theme={DescriptionCardTheme.LESSON}>
            <DescriptionCard.Texts>
                <DescriptionCard.Texts.Title>{props.lessonTitle}</DescriptionCard.Texts.Title>
                {props.lessonIdentifier}
                {!deleting && (
                    <div>
                        <Button path={`/lessons/${props.lessonIdentifier}`}>
                            {t('goto-lesson')}
                        </Button>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={() => setDeleting(true)}
                        >
                            {t('delete-lesson')}
                        </Button>
                    </div>
                )}
                {deleting && (
                    <div>
                        <p>{t('confirm-delete')}</p>
                        <span>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={() => setDeleting(false)}
                            >
                                {t('no')}
                            </Button>
                            <Button onClick={() => props.onDelete(props.lessonId)}>
                                {t('yes')}
                            </Button>
                        </span>
                    </div>
                )}
            </DescriptionCard.Texts>
        </DescriptionCard>
    );
};

export default SingleLesson;
