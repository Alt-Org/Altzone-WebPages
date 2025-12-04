import { ReactNode } from 'react';
import { LayoutWithIntro } from '@/preparedPages/Layouts';
import { ScrollTop } from '@/features/ScrollTop';

type Props = {
    children: ReactNode;
    params: {
        lng: string;
    };
};

export default function ComicsLayout({ children }: Props) {
    return (
        <>
            <ScrollTop />
            <LayoutWithIntro
                //  introMinHeight={'800px'}
                // introHeight={'86vh'}
                //title={t('page-title')}
                overlayColor={'rgba(7, 27, 30, 0.5'}
                //bgImage={introBg.src}
                //description={t('page-description')}
                //blurLineClass={cls.blurLine}
                /* bottomAdditional={
                    <ScrollToSectionButton
                        className={cls.diveButton}
                        scrollToId={comicsSectionId}
                    >
                        <b>{t('page-dive')}</b>
                    </ScrollToSectionButton>*/
            >
                {children}
            </LayoutWithIntro>
        </>
    );
}
