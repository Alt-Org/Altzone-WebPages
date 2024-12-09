import React, { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import { LayoutWithIntro } from '@/preparedPages/Layouts';
import introBg from '@/shared/assets/images/comics/comics5.webp';
import cls from './Layout.module.scss';
import { useServerTranslation } from '@/shared/i18n';
import { ScrollToSectionButton } from './_components/ScrollToSectionButton';

type Props = {
    children: ReactNode;
    params: {
        lng: string;
    };
};

export default async function TeamLayout({ children, params }: Props) {
    const { lng } = params;

    const { t } = await useServerTranslation(lng, 'members');

    return (
        <>
            <LayoutWithIntro
                introHeight={'86vh'}
                title={t('page-title')}
                overlayColor={'rgba(7, 27, 30, 0.5'}
                bgImage={introBg.src}
                description={t('page-description')}
                blurLineClass={cls.blurLine}
                bottomAdditional={
                    <ScrollToSectionButton
                        className={cls.diveButton}
                        scrollToId={'members'}
                    >
                        <b>{t('meet-button')}</b>
                    </ScrollToSectionButton>
                }
            >
                {children}
            </LayoutWithIntro>
            <ScrollTop />
        </>
    );
}
