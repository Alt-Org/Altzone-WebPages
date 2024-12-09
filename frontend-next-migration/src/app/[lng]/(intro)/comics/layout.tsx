import { ReactNode } from 'react';
import { LayoutWithIntro } from '@/preparedPages/Layouts';
import { useServerTranslation } from '@/shared/i18n';
import cls from './Layout.module.scss';
import introBg from '@/shared/assets/images/comics/comics5.webp';
import { ScrollToSectionButton } from './_components/ScrollToSectionButton';
import { comicsSectionId } from '@/preparedPages/ComicsGalleriesPages';
import { ScrollTop } from '@/features/ScrollTop';

type Props = {
    children: ReactNode;
    params: {
        lng: string;
    };
};

export default async function ComicsLayout({ children, params }: Props) {
    const { lng } = params;

    const { t } = await useServerTranslation(lng, 'comics');

    return (
        <>
            <ScrollTop />
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
                        scrollToId={comicsSectionId}
                    >
                        <b>{t('page-dive')}</b>
                    </ScrollToSectionButton>
                }
            >
                {children}
            </LayoutWithIntro>
        </>
    );
}
