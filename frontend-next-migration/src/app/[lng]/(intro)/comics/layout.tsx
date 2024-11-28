import { ReactNode } from 'react';
import { LayoutWithIntro } from '@/preparedPages/Layouts';
import { useServerTranslation } from '@/shared/i18n';
import { BlurLine } from '@/shared/ui/PageDividers';
import cls from './Layout.module.scss';
import introBg from '@/shared/assets/images/comics/comics-bg-intro.webp';

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
            introHeight={'85vh'}
            title={t('page-title')}
            overlayOpacity={0.5}
            bgImage={introBg.src}
            description={t('page-description')}
        >
            <BlurLine className={cls.blurLine} />
            {children}
        </LayoutWithIntro>
    );
}
