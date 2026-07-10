'use client';
import React from 'react';
import { NavigateTeachers } from '@/features/NavigateTeachers';
import { SectionLessonFlow } from '@/widgets/SectionLessonFlow';
import { Container } from '@/shared/ui/Container';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import cls from './InstructionPage.module.scss';

export interface Props {
    title: string;
}

const InstructionsPage = () => {
    const { t } = useClientTranslation('teachers');
    return (
        <div>
            <PageTitle
                titleText={t('lesson')}
                alternate={true}
                searchVisible={false}
            />
            <div className={cls.Container}>
                <NavigateTeachers />
                <SectionLessonFlow />
            </div>
        </div>
    );
};

export default InstructionsPage;
