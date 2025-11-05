'use client';
import { PageTitle } from '@/shared/ui/PageTitle';
import cls from './TeachersPage.module.scss';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import LessonList from './LessonList/LessonList';
import { Button } from '@/shared/ui/v2/Button';
import { useClientTranslation } from '@/shared/i18n';

const TeachersPage = () => {
    const { t } = useClientTranslation('teachers');
    return (
        <div className={cls.container}>
            <PageTitle
                titleText={t('head-title')}
                alternate={true}
                searchVisible={false}
            />
            <DescriptionCard theme={DescriptionCardTheme.TEACHERS}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>{t('welcome')}!</DescriptionCard.Texts.Title>
                    <h3>{t('instruction-title')}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t('instruction-text') }} />
                </DescriptionCard.Texts>
            </DescriptionCard>
            <DescriptionCard theme={DescriptionCardTheme.TEACHERS}>
                <LessonList />
            </DescriptionCard>
            <DescriptionCard theme={DescriptionCardTheme.TEACHERS}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>
                        {t('preparation-title')}
                    </DescriptionCard.Texts.Title>
                    <h3>{t('managing-title')}</h3>
                    <p>{t('managing-text')}</p>
                    <h3>{t('implementation-title')}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t('implementation-text') }} />
                    <h3>{t('preparatory-materials-title')}</h3>
                    <p>{t('preparatory-materials-text')}</p>
                    <h3>{t('game-literacy-tasks-title')}</h3>
                    <p>{t('game-literacy-tasks-text')}</p>
                    <Button
                        path="/teachers/tasks"
                        className={cls.taskButton}
                    >
                        {t('game-literacy-tasks-button')}
                    </Button>
                </DescriptionCard.Texts>
            </DescriptionCard>
        </div>
    );
};

export default TeachersPage;
