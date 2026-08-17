'use client';
import React from 'react';
import { NavigateTeachers } from '@/features/NavigateTeachers';
import { SectionLessonFlow } from '@/widgets/SectionLessonFlow';
import { Container } from '@/shared/ui/Container';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import cls from './InstructionPage.module.scss';

const InstructionsPage = () => {
    //watch and flow are not defined in english version
    const { t } = useClientTranslation('teachers');
    return (
        <Container>
            <div className={cls.container}>
                <PageTitle
                    titleText={t('lesson')}
                    alternate={true}
                    searchVisible={false}
                />
                <DescriptionCard theme={DescriptionCardTheme.INSTRUCTION}>
                    <DescriptionCard.Texts width="100%">
                        <DescriptionCard.Texts.Title>{t('flow')}</DescriptionCard.Texts.Title>

                        <DescriptionCard.Texts.Body>{t('watch')}</DescriptionCard.Texts.Body>
                    </DescriptionCard.Texts>
                    <NavigateTeachers />
                </DescriptionCard>
                <SectionLessonFlow />
            </div>
        </Container>
    );
};

export default InstructionsPage;
