import React, { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import { LayoutWithIntro } from '@/preparedPages/Layouts';
import introBg from '@/shared/assets/images/comics/comics5.webp';
import cls from './Layout.module.scss';
// import { ScrollToSectionButton } from "@/app/[lng]/(intro)/comics/_components/ScrollToSectionButton";
import { useServerTranslation } from '@/shared/i18n';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { classNames } from '@/shared/lib/classNames/classNames';

type Props = {
    children: ReactNode;
    params: {
        lng: string;
    };
};

export default async function TeamLayout({ children, params }: Props) {
    const { lng } = params;

    const { t } = await useServerTranslation(lng, 'comics');

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
                    // <ScrollToSectionButton
                    //     className={cls.diveButton}
                    //     scrollToId={comicsSectionId}
                    // >
                    //     <b>{t('page-dive')}</b>
                    // </ScrollToSectionButton>
                    <ScrollBottomButton
                        // isDisabled={isError || isLoading}
                        className={classNames(cls.scrollBottomButton)}
                        text={t('playButton')}
                    />
                }
            >
                {children}
            </LayoutWithIntro>
            <ScrollTop />
        </>
    );
}
