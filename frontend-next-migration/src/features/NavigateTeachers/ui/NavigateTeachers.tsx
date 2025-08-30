'use client';
import { usePathname } from 'next/navigation';
import { CustomSwitch, CustomSwitchItems } from '@/shared/ui/CustomSwitch';
import { useMemo } from 'react';
import { ProgressIndicator } from '@/shared/ui/CustomSwitch/model/types';
import { useClientTranslation } from '@/shared/i18n';

const NavigateTeachers = () => {
    const { t } = useClientTranslation('teachers');
    const path = usePathname().replace(/^\/[^/]+(?=\/teachers(?:\/|$))/, '');
    const CustomSwitchElements: ProgressIndicator[] = useMemo(() => {
        return [
            {
                children: <p>{t('instructions')}</p>,
                isOpen: path === '/teachers/instructions',
                type: CustomSwitchItems.ProgressIndicator,
            },
            {
                children: <p>{t('preparation')}</p>,
                isOpen: path === '/teachers/preparation',
                type: CustomSwitchItems.ProgressIndicator,
            },
            {
                children: <p>{t('gaming')}</p>,
                isOpen: path === '/teachers/gaming',
                type: CustomSwitchItems.ProgressIndicator,
            },
            {
                children: <p>{t('results')}</p>,
                isOpen: path === '/teachers/results',
                type: CustomSwitchItems.ProgressIndicator,
            },
        ];
    }, [path]);

    return <CustomSwitch elements={CustomSwitchElements} />;
};

export default NavigateTeachers;
