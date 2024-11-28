import { ReactNode } from 'react';
import { LayoutWithIntro } from '@/preparedPages/Layouts';
import { useServerTranslation } from '@/shared/i18n';
import { BlurLine } from '@/shared/ui/PageDividers';
import cls from './Layout.module.scss';
import introBg from '@/shared/assets/images/comics/comics5.webp';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';

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
        <LayoutWithIntro
            introHeight={'86vh'}
            title={t('page-title')}
            overlayColor={'rgba(7, 27, 30, 0.5'}
            bgImage={introBg.src}
            description={t('page-description')}
            blurLineClass={cls.blurLine}
            bottomAdditional={
                <Button
                    className={cls.diveButton}
                    withScalableLink={true}
                    size={ButtonSize.L}
                    theme={ButtonTheme.BACKGROUND}
                >
                    <b>{t('page-dive')}</b>
                </Button>
            }
        >
            {/*<BlurLine className={cls.blurLine} />*/}
            {children}
        </LayoutWithIntro>
    );
}
