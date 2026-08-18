'use client';
import { useMemo } from 'react';
import { CustomSwitch, CustomSwitchItems } from '@/shared/ui/CustomSwitch';
import { ProgressIndicator } from '@/shared/ui/CustomSwitch/model/types';
import { useClientTranslation } from '@/shared/i18n';

interface NavigateTeachersProps {
    activeStep: number;
    onBack: () => void;
    onNext: () => void;
}

const MIN_STEP = 1;
const MAX_STEP = 4;

const NavigateTeachers = ({ activeStep, onBack, onNext }: NavigateTeachersProps) => {
    const { t } = useClientTranslation('teachers');
    const CustomSwitchElements: ProgressIndicator[] = useMemo(() => {
        return [
            {
                children: <p>{t('1')}</p>,
                isOpen: activeStep === 1,
                type: CustomSwitchItems.ProgressIndicator,
            },
            {
                children: <p>{t('2')}</p>,
                isOpen: activeStep === 2,
                type: CustomSwitchItems.ProgressIndicator,
            },
            {
                children: <p>{t('3')}</p>,
                isOpen: activeStep === 3,
                type: CustomSwitchItems.ProgressIndicator,
            },
            {
                children: <p>{t('4')}</p>,
                isOpen: activeStep === 4,
                type: CustomSwitchItems.ProgressIndicator,
            },
        ];
    }, [activeStep, t]);

    return (
        <div>
            <button
                type="button"
                onClick={onBack}
                disabled={activeStep === MIN_STEP}
                aria-label="Previous step"
            >
                ←
            </button>

            <CustomSwitch elements={CustomSwitchElements} />

            <button
                type="button"
                onClick={onNext}
                disabled={activeStep === MAX_STEP}
                aria-label="Next step"
            >
                →
            </button>
        </div>
    );
};

export default NavigateTeachers;
