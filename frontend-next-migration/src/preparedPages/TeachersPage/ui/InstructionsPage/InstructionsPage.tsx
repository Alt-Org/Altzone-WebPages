'use client';
import React, { useState } from 'react';
import { NavigateTeachers } from '@/features/NavigateTeachers';
import { SectionLessonFlow } from '@/widgets/SectionLessonFlow';
import { Container } from '@/shared/ui/Container';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import cls from './InstructionPage.module.scss';

const MIN_STEP = 1;
const MAX_STEP = 4;

const InstructionsPage = () => {
    //watch and flow are not defined in english version
    const { t } = useClientTranslation('teachers');
    const [activeStep, setActiveStep] = useState(MIN_STEP);

    const handleBack = () => {
        setActiveStep((step) => Math.max(step - 1, MIN_STEP));
    };

    const handleNext = () => {
        setActiveStep((step) => Math.min(step + 1, MAX_STEP));
    };
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
                    <NavigateTeachers
                        activeStep={activeStep}
                        onBack={handleBack}
                        onNext={handleNext}
                        backDisabled={activeStep === MIN_STEP}
                        nextDisabled={activeStep === MAX_STEP}
                    />
                </DescriptionCard>

                <SectionLessonFlow activeStep={activeStep} />
            </div>
        </Container>
    );
};

export default InstructionsPage;
